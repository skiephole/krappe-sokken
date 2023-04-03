import type * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import $ from "./navigation.module.scss";

const Navigation: React.FC = () => {
  return (
    <nav className={$.navigation}>
      <div className={$.logoWrapper}>
        <h1 className={$.logoText}> Krappe Sokken</h1>
      </div>
      <a
        href="https://www.instagram.com/krappesokkenband/"
        className={$.instagram}
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </nav>
  );
};

export default Navigation;
