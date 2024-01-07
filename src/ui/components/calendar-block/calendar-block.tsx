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
          href="https://www.coolkunstencultuur.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>13/01 Bandavond Cool</b>
          <span className={$.title}>Cool kunst en cultuur</span>
        </a>
        <a
          href="https://www.hotelmarktstad.nl/agenda/den-drommel-en-krappe-sokken"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>21/01 Optreden met Den Drommel</b>
          <span className={$.title}>Hotel Marktstad</span>
        </a>
        <a
          href="https://www.podiumvictorie.nl/programma/alkmaars-eigenste-festival-2024"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>27/01 Alkmaars Eigenste</b>
          <span className={$.title}>Podium Victorie Alkmaar</span>
        </a>
        <a
          href="http://www.cafedepilaren.nl/index.html"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>08/02 Live optreden</b>
          <span className={$.title}>Café de Pilaren Alkmaar</span>
        </a>
        <a
          href="https://www.facebook.com/liveenpuur/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>22/02 Radio optreden Live en Puur </b>
          <span className={$.title}>Poprockradio</span>
        </a>
      </div>
    </div>
  );
};

export default CalendarBlock;
