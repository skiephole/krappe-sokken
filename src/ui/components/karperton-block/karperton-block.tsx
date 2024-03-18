import React, { useState, useEffect } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref } from "firebase/storage";
import storage from "../../../firebase";
import { getDownloadURL } from "firebase/storage";
import { cx } from "../../../utils/join-class-names";
import $ from "./karperton-block.module.scss";
import {
  faApple,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const KarpertonBlock = () => {
  const [arrowShown, setArrowShown] = useState(true);
  const [image, setImage] = useState<string | undefined>();

  const arrowVisibility = () => {
    setArrowShown(window.scrollY < 200);
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const downloadUrl = await getDownloadURL(
          ref(storage, `karperton-fotos/karperton-cover.jpg`)
        );
        setImage(downloadUrl || "");
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImage();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", arrowVisibility);

    return () => window.removeEventListener("scroll", arrowVisibility);
  }, []);

  return (
    <div className={$.block}>
      <div className={$.release}>
        <div className={$.coverWrap}>
          {image && (
            <img className={$.cover} src={image} alt="Karperton single cover" />
          )}
        </div>
        <div className={$.contentWrap}>
          <div className={$.actions}>
            <div className={$.top}>
              {[
                {
                  url: "https://open.spotify.com/track/5J2Pc5L0QJUoR3HhOjccN8",
                  icon: faSpotify,
                  text: "Spotify",
                  style: $.spotify,
                },
                {
                  url: "https://youtu.be/3KAvKZXTXVg",
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
              href="https://music.apple.com/album/1723013196?i=1723013197"
              target="_blank"
              rel="noreferrer"
            >
              <div className={cx($.button, $.apple)}>
                Apple Music
                <FontAwesomeIcon className={$.right} icon={faApple} size="sm" />
              </div>
            </a>
          </div>
          <div className={$.textBubble}>
            <h1 className={$.intro}>
              Luister naar onze eerste single Karperton op Spotify, Apple Music,
              YouTube en meer!
            </h1>
          </div>
        </div>
      </div>
      <div className={cx($.indicator, !arrowShown && $.hide)}>
        <FontAwesomeIcon className={$.arrow} icon={faAngleDown} size="3x" />
      </div>
    </div>
  );
};

export default KarpertonBlock;
