import type * as React from "react";
import $ from "./calendar-block.module.scss";

const CalendarBlock: React.FC = () => {
  return (
    <div className={$.background}>
      <div className={$.block}>
        <h2 className={$.header}>
          SHOWS
          <span className={$.dot}>:</span>
        </h2>
        <div className={$.card}>
          <div className={$.desktopHeader}>
            <h2>Data:</h2>
            <h2>Locatie:</h2>
          </div>
          <h2 className={$.mobileHeader}>Opkomende gigs:</h2>
          <a
            href="https://em2groningen.nl/event/freesonic-vrijdag/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>16/01 Freesonic</b>
            <span className={$.title}>EM2, Groningen</span>
          </a>
          <a
            href="https://alkmaarseigenste.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>24/01 Alkmaars Eigenste</b>
            <span className={$.title}>Podium Victorie, Alkmaar</span>
          </a>
          <a
            href="https://slachthuishaarlem.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>15/02 Mars Attacks</b>
            <span className={$.title}>Slachthuis, Haarlem</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
