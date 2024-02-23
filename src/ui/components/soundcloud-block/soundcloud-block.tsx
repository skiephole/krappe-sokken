import type * as React from "react";
import ReactPlayer from "react-player";
import $ from "./soundcloud-block.module.scss";
import { useBreakpoints } from "app/hooks/use-window-width";

const SoundCloudBlock: React.FC = () => {
  const { isSmall } = useBreakpoints();

  return (
    <div className={$.block}>
      <h1 className={$.header}>
        DEUNTJES&nbsp;
        <span className={$.music}>♫</span>
      </h1>
      <div className={$.card}>
        <ReactPlayer
          style={{ maxWidth: isSmall ? "70vw" : "80vw" }}
          url="https://soundcloud.com/user-973743786/sets/live-at-rtv80-the-basement-300923?si=ffac1e32e38f4d9ea2eef2a42201edd4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
        />
      </div>
    </div>
  );
};

export default SoundCloudBlock;
