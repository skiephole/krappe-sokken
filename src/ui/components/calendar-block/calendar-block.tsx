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
            href="https://www.eventbrite.nl/e/krappe-sokken-ep-release-tickets-920641753267?aff=oddtdtcreator"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>05/07 EP Release Party</b>
            <span className={$.title}>Stadsfabriek Alkmaar</span>
          </a>
          <a
            href="https://www.facebook.com/kermiswh/?locale=nl_NL"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>19/08 Kermis optreden</b>
            <span className={$.title}>Bolletjescafé de Klok, Warmenhuizen</span>
          </a>
          <a
            href="https://taverneopenair.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>31/08 Taverne Open Air</b>
            <span className={$.title}>HV Berdos, Bergen NH</span>
          </a>
          <a
            href="https://bergenlive.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>07/09 Bergen Live</b>
            <span className={$.title}>Centrum Bergen NH</span>
          </a>
          <a
            href="https://www.facebook.com/events/1583553569112279?locale=nl_NL"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>14/09 Peperpop Festival</b>
            <span className={$.title}>JC Cayen, Enkhuizen</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
