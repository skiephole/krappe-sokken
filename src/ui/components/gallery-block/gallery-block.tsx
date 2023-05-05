import type * as React from "react";
import $ from "./gallery-block.module.scss";

const GalleryBlock: React.FC = () => {
  return (
    <div className={$.block}>
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

export default GalleryBlock;
