import React, { useState, useEffect } from "react";
import { faAngleDown, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref } from "@firebase/storage";
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
                alt="Band members of Krappe Sokken"
              />
            )}
          </div>
          <div className={$.contentWrap}>
            {/* <div className={$.actions}>
            <div className={$.top}>
              {[
                {
                  url: "https://open.spotify.com/artist/2iqC2qUkuVcpj8eOfGeZCt?si=jtIbDQkAS5uOSZG-v-g6hA",
                  icon: faSpotify,
                  text: "Spotify",
                  style: $.spotify,
                },
                {
                  url: "https://www.youtube.com/@KrappeSokken",
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
              href="https://music.apple.com/us/artist/krappe-sokken/1722854990"
              target="_blank"
              rel="noreferrer"
            >
              <div className={cx($.button, $.apple)}>
                Apple Music
                <FontAwesomeIcon className={$.right} icon={faApple} size="sm" />
              </div>
            </a>
          </div> */}
            <div className={$.textBubble}>
              <h1 className={$.intro}>
                Pre-save our new EP "Saturday Spice" on all platforms!
              </h1>
            </div>
            <div className={$.actions}>
              <a
                className={$.wrapper}
                href="https://play.mw.fm/saturday-spice"
                target="_blank"
                rel="noreferrer"
              >
                <div className={cx($.button, $.apple)}>
                  Pre-save now!
                  <FontAwesomeIcon
                    className={$.right}
                    icon={faMusic}
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
