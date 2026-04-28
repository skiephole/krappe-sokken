import type * as React from "react";
import { shows } from "../../../data/shows";
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
          {shows.map((show) => (
            <a
              key={show.startDate}
              href={show.url}
              target="_blank"
              rel="noreferrer"
              className={$.show}
            >
              <b
                className={$.date}
              >{`${show.displayDate} ${show.title}`}</b>
              <span className={$.title}>{show.locationLine}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarBlock;
