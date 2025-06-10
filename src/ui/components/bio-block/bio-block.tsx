import type * as React from "react";
import $ from "./bio-block.module.scss";

const BioBlock: React.FC = () => {
  return (
    <div className={$.background}>
      <div className={$.block}>
        <h1 className={$.header}>
          BIO
          <span className={$.exclamation}>!</span>
        </h1>
        <div className={$.card}>
          <h2 className={$.bio}>
            Krappe Sokken, een energieke indie band uit de omgeving Alkmaar. Na
            ons ontstaan in het najaar van 2022 zijn wij uitgekiemd tot een
            vreugdebom die er alles aan doet om je te laten dansen en
            glimlachen. Met onze mix van sfeervolle nummers en aanstekelijke
            feel-good vibes proberen we jullie voetjes van de vloer te krijgen.
            Onze muziek heeft ons zelfs de Mixtream Contest publieksprijs en
            Popmania eerste prijs opgeleverd! Krappe Sokken staat garant voor
            een explosie van muzikale blijheid die je niet wilt missen!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BioBlock;
