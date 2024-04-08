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
          <b className={$.date}>26/04 21:00 Koningsnacht </b>
          <span className={$.title}>Café Taverne Bergen</span>
        </a>
        <a
          href="https://hal25.nl/events/hofleverancier-25/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>27/04 Koningsdag </b>
          <span className={$.title}>HAL25 Alkmaar</span>
        </a>
        <a
          href="https://www.facebook.com/cafedebuurenburgerbrug?locale=nl_NL"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>11/05 Optreden </b>
          <span className={$.title}>Café de Buuren Burgerbrug</span>
        </a>
        <a
          href="https://kunstcultuurweekend.wixsite.com/kcwoudorp/festivals"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>12/05 13:00 Kunst en Cultuurweekend </b>
          <span className={$.title}>Koel 310 Alkmaar</span>
        </a>
        <a
          href="https://huisweidfestival.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>19/05 20:45 Huisweid Festival</b>
          <span className={$.title}>Tuitjenhorn</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
