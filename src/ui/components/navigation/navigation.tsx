import type * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import $ from "./navigation.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navigation: React.FC = () => {
  return (
    <nav className={$.navigation}>
      <div className={$.logoWrapper}>
        <a href="https://krappesokken.nl" className={$.logoText}>
          Krappe Sokken
        </a>
      </div>
      <div className={$.contactWrapper}>
        <a href="mailto: krappesokken.nl" className={$.contactIcon}>
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
        <a
          href="https://www.youtube.com/@KrappeSokken/"
          className={$.contactIcon}
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/krappesokkenband/"
          className={$.contactIcon}
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
