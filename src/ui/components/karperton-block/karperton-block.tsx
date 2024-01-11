import * as React from "react";
import socks from "/logo512.png";
import {
  faAngleDown,
  faChevronRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref } from "@firebase/storage";
import storage from "../../../firebase";
import { getDownloadURL } from "firebase/storage";
import { cx } from "../../../utils/join-class-names";
import $ from "./karperton-block.module.scss";
import {
  faApple,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const KarpertonBlock: React.FC = () => {
  const [arrowShown, setArrowShown] = React.useState(true);
  const [image, setImage] = React.useState<string>();
  const [pending, setPending] = React.useState(false);

  const arrowVisibility = () => {
    if (window.scrollY >= 200) {
      setArrowShown(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", arrowVisibility);

    return () => window.removeEventListener("scroll", arrowVisibility);
  }, []);

  const getImage = React.useCallback(() => {
    const downloadUrl = getDownloadURL(
      ref(storage, `karperton-fotos/karperton-cover.jpg`)
    );

    Promise.resolve(downloadUrl).then((url) => {
      setImage(url);
      setPending(false);
    });
  }, []);

  React.useEffect(() => {
    setPending(true);
    getImage();
  }, [getImage]);

  return (
    <div className={$.block}>
      <div className={$.release}>
        {!pending && (
          <div className={$.coverWrap}>
            <img className={$.cover} src={image} alt="cover" />
          </div>
        )}
        <div className={$.contentWrap}>
          <div className={$.actions}>
            <div className={$.top}>
              <a
                className={$.wrapper}
                href="https://open.spotify.com/track/5J2Pc5L0QJUoR3HhOjccN8"
                target="_blank"
                rel="noreferrer"
              >
                <div className={cx($.button, $.spotify)}>
                  Spotify
                  <FontAwesomeIcon
                    className={$.right}
                    icon={faSpotify}
                    size="sm"
                  />
                </div>
              </a>
              <a
                className={$.wrapper}
                href="https://youtu.be/3KAvKZXTXVg"
                target="_blank"
                rel="noreferrer"
              >
                <div className={cx($.button, $.youtube)}>
                  Youtube
                  <FontAwesomeIcon
                    className={$.right}
                    icon={faYoutube}
                    size="sm"
                  />
                </div>
              </a>
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
