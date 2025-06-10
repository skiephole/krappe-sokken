import { useState, useEffect } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  faApple,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "../../../firebase";
import { cx } from "../../../utils/join-class-names";
import $ from "./release-block.module.scss";

type Image = {
  url: string;
};

const ReleaseBlock = () => {
  const [arrowShown, setArrowShown] = useState(true);
  const [image, setImage] = useState<Image>();

  useEffect(() => {
    getDownloadURL(ref(storage, `ep-release/saturday-spice-cover.jpg`)).then(
      (url) => {
        setImage({ url: url });
      }
    );
  }, []);

  const arrowVisibility = () => {
    setArrowShown(window.scrollY < 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", arrowVisibility);

    return () => window.removeEventListener("scroll", arrowVisibility);
  }, []);

  return (
    <div className={$.background}>
      <div className={$.block}>
        <div className={$.release}>
          <div className={$.coverWrap}>
            {image && (
              <img
                className={$.cover}
                src={image.url}
                alt="Band members of Krappe Sokken on the cover of our first EP Saturday Spice"
              />
            )}
          </div>
          <div className={$.contentWrap}>
            <div className={$.textBubble}>
              <h1 className={$.intro}>
                Stream our first EP "Saturday Spice" on all platforms!
              </h1>
            </div>
            <div className={$.actions}>
              <div className={$.top}>
                {[
                  {
                    url: "https://open.spotify.com/album/4TJbuY2lcUP6QcLlevigPa?si=V7dgGwn2TUejnq3ow0hnCQ",
                    icon: faSpotify,
                    text: "Spotify",
                    style: $.spotify,
                  },
                  {
                    url: "https://www.youtube.com/watch?v=yCMl5GpNgVA&list=OLAK5uy_lehqulo6kWvXUQ7iF4px2cw92Zg-db9Hs",
                    icon: faYoutube,
                    text: "Youtube",
                    style: $.youtube,
                  },
                ].map(({ url, icon, text, style }) => (
                  <a
                    key={url}
                    className={$.wrapper}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className={cx($.button, style)}>
                      {text}
                      <FontAwesomeIcon
                        className={$.right}
                        icon={icon}
                        size="sm"
                      />
                    </div>
                  </a>
                ))}
              </div>
              <a
                className={$.wrapper}
                href="https://music.apple.com/dk/album/saturday-spice-ep/1753390346"
                target="_blank"
                rel="noreferrer"
              >
                <div className={cx($.button, $.apple)}>
                  Apple Music
                  <FontAwesomeIcon
                    className={$.right}
                    icon={faApple}
                    size="sm"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={cx($.indicator, !arrowShown && $.hide)}>
          <FontAwesomeIcon className={$.arrow} icon={faAngleDown} size="3x" />
        </div>
      </div>
    </div>
  );
};

export default ReleaseBlock;
