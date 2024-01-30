import type * as React from "react";
import $ from "./calendar-block.module.scss";

const CalendarBlock: React.FC = () => {
  return (
    <div className={$.block}>
      <div className={$.card}>
        <div className={$.desktopHeader}>
          <h2>Data:</h2>
          <h2>Locatie:</h2>
        </div>
        <h2 className={$.mobileHeader}>Opkomende gigs:</h2>
        <a
          href="http://www.cafedepilaren.nl/index.html"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>08/02 Live show</b>
          <span className={$.title}>Café de Pilaren Alkmaar</span>
        </a>
        <a
          href="https://www.facebook.com/liveenpuur/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>22/02 Radio optreden Live en Puur </b>
          <span className={$.title}>Poprockradio</span>
        </a>
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
