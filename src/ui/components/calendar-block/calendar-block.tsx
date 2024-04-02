import type * as React from "react";
import $ from "./calendar-block.module.scss";

const CalendarBlock: React.FC = () => {
  return (
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
          href="https://www.facebook.com/alkmaarsbierhuis/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>05/04 Optreden Bierhuis</b>
          <span className={$.title}>Alkmaar</span>
        </a>
        <a
          href="https://tenwesten.nl/agenda/gas-erop-ska-punk-rock-disco-house/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>12/04 GAS! EROP</b>
          <span className={$.title}>Gasfabriek Alkmaar</span>
        </a>
        <a
          href="https://www.facebook.com/events/382536104186726"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>26/04 Koningsnacht </b>
          <span className={$.title}>Café Taverne Bergen</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
