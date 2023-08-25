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
          href="https://www.mixtream.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>27/08 Mixtream Festival</b>
          <span className={$.title}>Rosarium Park, HHW</span>
        </a>
        <a
          href="https://www.facebook.com/BergenLiveEvent/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>02/09 Bergen Live</b>
          <span className={$.title}>Centrum Bergen</span>
        </a>
        <a
          href="https://volta-amsterdam.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>07/09 Volta</b>
          <span className={$.title}>Houtmankade 336, Amsterdam</span>
        </a>
        <a
          href="https://kompleks.nl/event/popmania/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>23/09 Popmania</b>
          <span className={$.title}>Kompleks, HHW</span>
        </a>
        <a
          href="https://www.facebook.com/radiothebasement/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>30/09 Radio optreden The Basement</b>
          <span className={$.title}>RTV80</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
