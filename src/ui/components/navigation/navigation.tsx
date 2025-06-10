import type * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faSpotify,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import $ from "./navigation.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoints } from "app/hooks/use-window-width";

const Navigation: React.FC = () => {
  const { isMedium } = useBreakpoints();

  return (
    <nav className={$.navigation}>
      <div className={$.inner}>
        <div className={$.logoWrapper}>
          <a href="https://krappesokken.nl" className={$.logoText}>
            Krappe Sokken
          </a>
        </div>
        <div className={$.contactWrapper}>
          <a
            href="mailto: krappesokkenband@gmail.com"
            className={$.contactIcon}
          >
            <FontAwesomeIcon icon={faEnvelope} size={isMedium ? "lg" : "2x"} />
          </a>
          <a
            href="https://open.spotify.com/artist/2iqC2qUkuVcpj8eOfGeZCt?si=PIIiO85gRqG4cj1vcSuFvQ"
            className={$.contactIcon}
          >
            <FontAwesomeIcon icon={faSpotify} size={isMedium ? "lg" : "2x"} />
          </a>
          <a
            href="https://www.facebook.com/krappesokkenband/"
            className={$.contactIcon}
          >
            <FontAwesomeIcon
              icon={faFacebookSquare}
              size={isMedium ? "lg" : "2x"}
            />
          </a>
          <a
            href="https://www.instagram.com/krappesokkenband/"
            className={$.contactIcon}
          >
            <FontAwesomeIcon icon={faInstagram} size={isMedium ? "lg" : "2x"} />
          </a>
          <a
            href="https://www.tiktok.com/@krappe.sokken"
            className={$.contactIcon}
          >
            <FontAwesomeIcon icon={faTiktok} size={isMedium ? "lg" : "2x"} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
