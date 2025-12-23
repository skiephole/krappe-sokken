import type * as React from "react";
import Navigation from "app/components/navigation/navigation";
import GalleryBlock from "app/components/gallery-block/gallery-block";
import BioBlock from "app/components/bio-block/bio-block";
import MusicBlock from "app/components/music-block/music-block";
import IntroBlock from "app/components/intro-block/intro-block";
import CalendarBlock from "app/components/calendar-block/calendar-block";
import GameBlock from "app/components/game-block/game-block";
import $ from "./base-page.module.scss";

const BasePageView: React.FC = () => {
  return (
    <div className={$.container}>
      <Navigation />
      <IntroBlock />
      <CalendarBlock />
      <BioBlock />
      <MusicBlock />
      <GameBlock />
      <GalleryBlock />
    </div>
  );
};

export default BasePageView;
