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
            href="https://museumnacht-alkmaar.nl/krappe-sokken/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>28/09 Museumnacht</b>
            <span className={$.title}>Stedelijk Museum, Alkmaar</span>
          </a>
          <a
            href="https://www.facebook.com/events/835425294860169?locale=nl_NL"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>04/10 Optreden met Diversion</b>
            <span className={$.title}>Bierhuis, Alkmaar</span>
          </a>
          <a
            href="https://adev.nu/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>19/10 Optreden ADEV</b>
            <span className={$.title}>Binnenstad, Amsterdam</span>
          </a>
          <a
            href="https://www.regionaalarchiefalkmaar.nl/over-ons/agenda"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>30/11 Optreden Open Dag</b>
            <span className={$.title}>Regionaal Archief, Alkmaar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
