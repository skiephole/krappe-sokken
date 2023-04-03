import type * as React from "react";
import $ from "./base-page.module.scss";
import IntroBlock from "../components/intro-block/intro-block";

const BasePageView: React.FC = () => {
  return (
    <div className={$.container}>
      <IntroBlock />
      <header className={$.header}>
        <h1>Hier binnenkort de Krappe Sokken website</h1>
        <a
          className={$.link}
          href="https://www.instagram.com/krappesokkenband/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Onze insta
        </a>
      </header>
    </div>
  );
};

export default BasePageView;
