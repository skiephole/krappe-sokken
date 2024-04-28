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
        <a href="/" target="_blank" rel="noreferrer" className={$.show}>
          <b className={$.date}>18/05 15:00 Opening KunstKlub</b>
          <span className={$.title}>Kunstuitleen Alkmaar</span>
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
        <a
          href="https://poppodiumb3.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>29/06 Optreden</b>
          <span className={$.title}>Poppodium B3 Sint-Pancras</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
