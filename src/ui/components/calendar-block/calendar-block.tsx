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
          href="https://www.facebook.com/events/344389368050417"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>10/11 Optreden met Allus</b>
          <span className={$.title}>Bolletjescafé De Klok</span>
        </a>
        <a
          href="https://www.facebook.com/cafedebuurenburgerbrug"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>26/11 Optreden met Den Drommel</b>
          <span className={$.title}>Café de Buuren</span>
        </a>
        <a
          href="https://www.facebook.com/events/1607130549813362"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>15/12 Bandavond Kompleks</b>
          <span className={$.title}>Heerhugowaard</span>
        </a>
        <a
          href="https://www.facebook.com/events/1092082198441401"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>23/12 Bijna Kerst Festival</b>
          <span className={$.title}>J.C. de Dukdalf</span>
        </a>
        <a
          href="https://www.twitch.tv/44nextdoor"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>14/01 Livestream concert</b>
          <span className={$.title}>44NextDoor</span>
        </a>
        <a
          href="https://www.hotelmarktstad.nl/"
          target="_blank"
          rel="noreferrer"
          className={$.show}
        >
          <b className={$.date}>21/01 Optreden met Den Drommel</b>
          <span className={$.title}>Hotel Marktstad</span>
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
