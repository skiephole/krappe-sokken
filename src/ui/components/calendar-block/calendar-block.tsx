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
          href="https://www.facebook.com/radiothebasement/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>30/09 16:00 Radio optreden The Basement</b>
          <span className={$.title}>RTV80</span>
        </a>
        <a
          href="https://www.facebook.com/radiothebasement/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>10/11 Optreden met Allus</b>
          <span className={$.title}>Bolletjescafé De Klok</span>
        </a>
        <a
          href="https://www.facebook.com/radiothebasement/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>15/12 Bandavond Kompleks</b>
          <span className={$.title}>Heerhugowaard</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
