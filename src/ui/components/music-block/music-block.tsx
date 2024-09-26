import type * as React from "react";
import { Spotify } from "react-spotify-embed";
import $ from "./music-block.module.scss";

const MusicBlock: React.FC = () => {
  return (
    <div className={$.background}>
      <div className={$.block}>
        <h1 className={$.header}>
          RELEASES&nbsp;
          <span className={$.music}>♫</span>
        </h1>
        <div className={$.card}>
          <Spotify
            style={{ maxWidth: "80vw", width: "100%" }}
            link="https://open.spotify.com/album/4TJbuY2lcUP6QcLlevigPa?si=X6OIHVocRmOjVffw1f2-AA"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicBlock;
