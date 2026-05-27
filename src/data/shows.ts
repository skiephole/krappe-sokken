/**
 * Single source of truth for upcoming shows.
 *
 * - Rendered by `src/ui/components/calendar-block/calendar-block.tsx`.
 * - Injected as schema.org `MusicEvent` JSON-LD into `index.html` by the
 *   `inject-events-jsonld` plugin in `vite.config.ts`.
 *
 * To add or remove a show, edit this array and rebuild — both the page and
 * the SEO metadata stay in sync automatically.
 */

export type Show = {
  /** ISO date YYYY-MM-DD. Used as `startDate`/`endDate` in JSON-LD. */
  startDate: string;
  /** Short label shown on the site, e.g. `"02/05"`. */
  displayDate: string;
  /** Festival/event name, e.g. `"Mijkever"`. */
  title: string;
  /** Combined "venue, city" line shown on the site. */
  locationLine: string;
  /** Schema.org `Place` name. */
  venueName: string;
  /** Schema.org `addressLocality`. */
  city: string;
  /** Public ticket/info URL. Used for the link, the Offer URL and (by default)
   *  the Organizer URL. */
  url: string;
  /** Plain Dutch description for JSON-LD `description`. */
  description: string;
  /** Organizer name for JSON-LD. */
  organizerName: string;
  /** Optional override for the organizer URL. Defaults to `url`. */
  organizerUrl?: string;
};

export const shows: Show[] = [
  {
    startDate: "2026-05-30",
    displayDate: "30/05",
    title: "Karavaan Festival",
    locationLine: "Victoriepark, Alkmaar",
    venueName: "Victoriepark",
    city: "Alkmaar",
    url: "https://www.karavaan.nl/voorstellingen/krappe-sokken-festivalhart/",
    description:
      "Krappe Sokken speelt op het Karavaan Festival in het Victoriepark, Alkmaar.",
    organizerName: "Karavaan",
    organizerUrl: "https://www.karavaan.nl/",
  },
];
