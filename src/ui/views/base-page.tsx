import type * as React from "react";
import $ from "./base-page.module.scss";
import IntroBlock from "../components/intro-block/intro-block";
import Navigation from "app/components/navigation/navigation";
import GalleryBlock from "app/components/gallery-block/gallery-block";
import CalendarBlock from "app/components/calendar-block/calendar-block";

const BasePageView: React.FC = () => {
  return (
    <div className={$.container}>
      <Navigation />
      <IntroBlock />
      <CalendarBlock />
      <GalleryBlock />
    </div>
  );
};

export default BasePageView;
