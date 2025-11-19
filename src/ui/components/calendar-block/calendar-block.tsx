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
            href="https://www.cafesoundgarden.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>11/12 Optreden</b>
            <span className={$.title}>Soundgarden, Amsterdam</span>
          </a>
          <a
            href="https://krappe-sokken.weticket.io/krappe-kerst"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>21/12 Krappe Kerst</b>
            <span className={$.title}>Ten Westen, Alkmaar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
