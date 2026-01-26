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
            href="https://slachthuishaarlem.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>15/02 Mars Attacks</b>
            <span className={$.title}>Slachthuis, Haarlem</span>
          </a>
          <a
            href="https://uniekezaken.nl/speellijst/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>21/02 Kunst voor Gaza</b>
            <span className={$.title}>Fabrique Unique, Alkmaar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
