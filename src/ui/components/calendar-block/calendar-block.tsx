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
          href="https://www.podiumvictorie.nl/programma/alkmaar-plugged-live"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>29/02 Alkmaar Plugged Live </b>
          <span className={$.title}>Podium Victorie Alkmaar</span>
        </a>
        <a
          href="https://www.facebook.com/cafedebuurenburgerbrug/?locale=nl_NL"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>10/03 Optreden Café de Buuren</b>
          <span className={$.title}>Burgerbrug</span>
        </a>
        <a
          href="https://www.skekamsterdam.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>30/03 Optreden Eetcafé Skek</b>
          <span className={$.title}>Zeedijk, Amsterdam</span>
        </a>
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
