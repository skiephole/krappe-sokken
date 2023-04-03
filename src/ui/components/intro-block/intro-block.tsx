import type * as React from "react";
import $ from "./intro-block.module.scss";
import socks from "/logo512.png";
import Navigation from "../navigation/navigation";

const IntroBlock: React.FC = () => {
  return (
    <div className={$.block}>
      <Navigation />
      <div className={$.welcome}>
        <div className={$.socksWrap}>
          <img className={$.socks} src={socks} alt="socks" />
        </div>
        <div className={$.textWrap}>
          <div className={$.textBubble}>
            <h1>
              Welkom soklovers! Kijk wat rond, gooi je kont, ik vind het knap
              dat jij deze site vond 🤔
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
