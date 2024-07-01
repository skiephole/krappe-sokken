import type * as React from "react";
import { Spotify } from "react-spotify-embed";
import $ from "./soundcloud-block.module.scss";

const SoundCloudBlock: React.FC = () => {
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
            link="https://open.spotify.com/album/0WYGJGzcAeKwaOjfHEZ2I0?si=zVrKe4r_TxiRBQ47pSjwMg"
          />
        </div>
      </div>
    </div>
  );
};

export default SoundCloudBlock;
