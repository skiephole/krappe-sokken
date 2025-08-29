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
            href="https://remindthegap.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>13/09 ReMind The Gap Festival</b>
            <span className={$.title}>De Goorn</span>
          </a>
          <a
            href="https://www.cpunt.nl/agenda/frisse-duyck-lux-the-kruuk-krappe-sokken"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>25/09 Frisse Duyck</b>
            <span className={$.title}>Cpunt, Hoofddorp</span>
          </a>
          <a
            href="https://manifesto-hoorn.nl/productie/doemaar/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>26/09 Voorprogramma Doe Maar Tribute</b>
            <span className={$.title}>Manifesto, Hoorn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
