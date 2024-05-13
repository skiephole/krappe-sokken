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
          href="https://www.instagram.com/kunstklub2024/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
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
          <b className={$.date}>29/06 Optreden Poppodium</b>
          <span className={$.title}>Poppodium B3 Sint-Pancras</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
