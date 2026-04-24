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
            href="https://www.facebook.com/events/1259855362977058/?ref_source=NEWS_FEED"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>26/04 Koningsnacht</b>
            <span className={$.title}>Taverne, Bergen</span>
          </a>
          <a
            href="https://www.instagram.com/mijkeverfest/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>02/05 Mijkever</b>
            <span className={$.title}>Ten Westen, Alkmaar</span>
          </a>
          <a
            href="https://hal25.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>05/05 BevrijdingsHal25</b>
            <span className={$.title}>Hal25, Alkmaar</span>
          </a>
          <a
            href="https://www.facebook.com/groups/492366877515547/user/100052455497436/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>16/05 Kunst Cultuur Weekend</b>
            <span className={$.title}>De Oever, Oudorp</span>
          </a>
          <a
            href="https://huisweidfestival.nl/"
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>24/05 Huisweid</b>
            <span className={$.title}>Tuitjenhorn</span>
          </a>
          <a
            href="https://www.karavaan.nl/festivals/karavaan-festival/?category=&date=&q="
            target="_blank"
            rel="noreferrer"
            className={$.show}
          >
            <b className={$.date}>30/05 Karavaan Festival</b>
            <span className={$.title}>Victoriepark, Alkmaar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
