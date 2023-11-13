import type * as React from "react";
import $ from "./bio-block.module.scss";

const BioBlock: React.FC = () => {
  return (
    <div className={$.block}>
      <h1 className={$.header}>
        BIO
        <span className={$.exclamation}>!</span>
      </h1>
      <div className={$.card}>
        <h2 className={$.bio}>
          Krappe Sokken, een energieke indie pop/punk band uit de omgeving
          Alkmaar. Na ons ontstaan in het najaar van 2022 zijn wij uitgekiemd
          tot een zeskoppige vreugdebom die er alles aan doet om je te laten
          dansen en glimlachen. Met onze mix van catchy melodieën en
          aanstekelijke punkvibes proberen we jullie voetjes van de vloer te
          krijgen. Onze herrie van de bovenste plank heeft ons zelfs de Mixtream
          Contest publieksprijs en Popmania eerste prijs opgeleverd! Krappe
          Sokken staat garant voor een explosie van muzikale blijheid die je
          niet wilt missen!
        </h2>
      </div>
    </div>
  );
};

export default BioBlock;
