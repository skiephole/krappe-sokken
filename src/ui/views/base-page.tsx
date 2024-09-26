import type * as React from "react";
import $ from "./base-page.module.scss";
import Navigation from "app/components/navigation/navigation";
import GalleryBlock from "app/components/gallery-block/gallery-block";
import CalendarBlock from "app/components/calendar-block/calendar-block";
import BioBlock from "app/components/bio-block/bio-block";
import ReleaseBlock from "app/components/release-block/release-block";
import MusicBlock from "app/components/music-block/music-block";

const BasePageView: React.FC = () => {
  return (
    <div className={$.container}>
      <Navigation />
      <ReleaseBlock />
      <CalendarBlock />
      <MusicBlock />
      <BioBlock />
      <GalleryBlock />
    </div>
  );
};

export default BasePageView;
