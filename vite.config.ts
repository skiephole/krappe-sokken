import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { shows } from "./src/data/shows";

const SITE_URL = "https://krappesokken.nl";
const BAND_ID = `${SITE_URL}/#band`;
const BAND_LOGO = `${SITE_URL}/logo512.png`;
const EVENTS_PLACEHOLDER = "<!--EVENTS_JSON_LD-->";

const buildEventsJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": shows.map((show) => ({
    "@type": "MusicEvent",
    name: `${show.title} — ${show.venueName}, ${show.city}`,
    description: show.description,
    image: BAND_LOGO,
    startDate: show.startDate,
    endDate: show.startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: show.url,
    location: {
      "@type": "Place",
      name: show.venueName,
      address: {
        "@type": "PostalAddress",
        addressLocality: show.city,
        addressCountry: "NL",
      },
    },
    performer: { "@id": BAND_ID },
    organizer: {
      "@type": "Organization",
      name: show.organizerName,
      url: show.organizerUrl ?? show.url,
    },
    offers: {
      "@type": "Offer",
      url: show.url,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
  })),
});

const injectEventsJsonLd = (): Plugin => ({
  name: "inject-events-jsonld",
  transformIndexHtml(html) {
    const json = JSON.stringify(buildEventsJsonLd(), null, 2);
    const script = `<script type="application/ld+json">\n${json}\n    </script>`;
    return html.replace(EVENTS_PLACEHOLDER, script);
  },
});

// Emit sitemap.xml with a fresh `lastmod` on every build. Keeps search engines
// honest about freshness without manual edits to a static file.
const generateSitemap = (): Plugin => ({
  name: "generate-sitemap",
  apply: "build",
  generateBundle() {
    const lastmod = new Date().toISOString().slice(0, 10);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
  },
});

// Build dist/404.html from dist/index.html and inject a static `noindex` meta,
// so unknown URLs never get indexed even if the SPA's runtime tag is missed.
const generate404Html = (): Plugin => ({
  name: "generate-404-html",
  apply: "build",
  closeBundle() {
    const indexPath = resolve("dist/index.html");
    const fourOhFourPath = resolve("dist/404.html");
    const noindex = '<meta name="robots" content="noindex, nofollow" />';
    const html = readFileSync(indexPath, "utf8").replace(
      "<head>",
      `<head>\n    ${noindex}`
    );
    writeFileSync(fourOhFourPath, html);
  },
});

export default defineConfig({
  plugins: [
    injectEventsJsonLd(),
    generateSitemap(),
    generate404Html(),
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  build: {
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@fortawesome/react-fontawesome",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/free-brands-svg-icons",
          ],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    esbuildOptions: {
      mainFields: ["browser", "module", "main"],
    },
  },
});
