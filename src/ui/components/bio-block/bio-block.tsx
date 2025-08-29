import type * as React from "react";
import $ from "./bio-block.module.scss";
import { useBreakpoints } from "app/hooks/use-window-width";

const BioBlock: React.FC = () => {
  const { isSmall } = useBreakpoints();

  const mobileBio = (
    <>
      Krappe Sokken; in het West-Fries gezegd als iets net goed gaat, nét op
      tijd of spannend maar gelukkig goed. Voor de band betekent het risico
      nemen, spelen op de grens en niet bang zijn voor verandering. Indie-rock
      in de breedste zin: nieuwsgierig, ontdekkend en een beetje rauw.
      <br />
      <br />
      Na regio Alkmaar te hebben opgeschud met scheurende punk over
      parkeergarage Het Karperton, bracht Krappe Sokken in zomer 2024 hun eerste
      EP uit: Saturday spice. Zomerse indie over kleine dingen en menselijkheid.
      Op het podium verandert die rust in een energiebom: scheurende gitaren,
      springende chaos en schoenen die je om de oren vliegen.
    </>
  );

  const desktopBio = (
    <>
      Krappe Sokken; word in het west-Fries gezegd als iets net aan goed gaat,
      iemand die net optijd komt, iets wat eventjes spannend was maar gelukkig
      goed komt. Krappe Sokken (de band) ziet het als risico durven nemen,
      spelen op de grens en niet bang zijn voor verandering. Indie-rock in de
      breedste zin, nieuwsgierig, ontdekkend en een beetje rauw.
      <br />
      <br /> Na regio Alkmaar op z’n kop te hebben gezet met scheurende punk
      over de haat/liefde relatie met parkeergarage Het Karperton, bracht Krappe
      sokken als tegenhanger in hun muzikale zoektocht in zomer 2024 een eerste
      EP uit genaamd ‘Saturday spice’ zomerse indie vanuit de waardering voor
      kleine dingen in het leven en menselijkheid. Op het podium word die rust
      al gauw verstoord door een springende energiebommetjes, scheurende gitaren
      en schoenen die je om je oren zullen vliegen.
    </>
  );
  return (
    <div className={$.background}>
      <div className={$.block}>
        <h1 className={$.header}>
          BIO
          <span className={$.exclamation}>!</span>
        </h1>
        <div className={$.card}>
          <h2 className={$.bio}>{isSmall ? mobileBio : desktopBio}</h2>
        </div>
      </div>
    </div>
  );
};

export default BioBlock;
