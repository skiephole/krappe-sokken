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

export default defineConfig({
  plugins: [
    injectEventsJsonLd(),
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
