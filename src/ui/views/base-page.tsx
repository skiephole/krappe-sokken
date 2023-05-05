import type * as React from "react";
import $ from "./base-page.module.scss";
import IntroBlock from "../components/intro-block/intro-block";
import Navigation from "app/components/navigation/navigation";
import GalleryBlock from "app/components/gallery-block/gallery-block";

const BasePageView: React.FC = () => {
  return (
    <div className={$.container}>
      <Navigation />
      <IntroBlock />
      <GalleryBlock />
    </div>
  );
};

export default BasePageView;
