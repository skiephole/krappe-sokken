import type * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import $ from "./navigation.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoints } from "app/hooks/use-window-width";

const Navigation: React.FC = () => {
  const { isSmall } = useBreakpoints();

  return (
    <nav className={$.navigation}>
      <div className={$.logoWrapper}>
        <a href="https://krappesokken.nl" className={$.logoText}>
          Krappe Sokken
        </a>
      </div>
      <div className={$.contactWrapper}>
        <a href="mailto: krappesokkenband@gmail.com" className={$.contactIcon}>
          <FontAwesomeIcon icon={faEnvelope} size={isSmall ? "1x" : "2x"} />
        </a>
        <a
          href="https://www.youtube.com/@KrappeSokken/"
          className={$.contactIcon}
        >
          <FontAwesomeIcon icon={faYoutube} size={isSmall ? "1x" : "2x"} />
        </a>
        <a
          href="https://www.instagram.com/krappesokkenband/"
          className={$.contactIcon}
        >
          <FontAwesomeIcon icon={faInstagram} size={isSmall ? "1x" : "2x"} />
        </a>
        <a
          href="https://www.tiktok.com/@krappe.sokken"
          className={$.contactIcon}
        >
          <FontAwesomeIcon icon={faTiktok} size={isSmall ? "1x" : "2x"} />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
