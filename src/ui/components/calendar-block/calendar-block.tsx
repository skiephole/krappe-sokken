import type * as React from "react";
import $ from "./calendar-block.module.scss";

const CalendarBlock: React.FC = () => {
  return (
    <div className={$.background}>
      <div className={$.block}>
        <h1 className={$.header}>
          SHOWS
          <span className={$.dot}>:</span>
        </h1>
        <div className={$.card}>
          <div className={$.desktopHeader}>
            <h2>Data:</h2>
            <h2>Locatie:</h2>
          </div>
          <h2 className={$.mobileHeader}>Opkomende gigs:</h2>
          <a
            href="https://www.instagram.com/notyourmuse.event/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>20/06 I'm Not Your Muse</b>
            <span className={$.title}>Kapitaal, Utrecht</span>
          </a>
          <a
            href="https://www.instagram.com/rock_in_colour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>21/06 Rock in Colour</b>
            <span className={$.title}>De Letterbak, Alkmaar</span>
          </a>
          <a
            href="https://www.facebook.com/BolletjescafeDeKlokWH/events?locale=nl_NL"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>18/08 Kermis optreden</b>
            <span className={$.title}>De Klok, Warmenhuizen</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
