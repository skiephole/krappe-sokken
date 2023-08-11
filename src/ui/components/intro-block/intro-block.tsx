import * as React from "react";
import socks from "/logo512.png";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref } from "@firebase/storage";
import storage from "../../../firebase";
import { getDownloadURL } from "firebase/storage";
import { cx } from "../../../utils/join-class-names";
import $ from "./intro-block.module.scss";

const IntroBlock: React.FC = () => {
  const [arrowShown, setArrowShown] = React.useState(true);
  const [groupImages, setGroupImages] = React.useState<string[]>([]);
  const [pending, setPending] = React.useState(false);
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [showImage, setShowImage] = React.useState<boolean>(
    window.innerHeight > 800
  );

  const updateMedia = () => {
    setShowImage(window.innerHeight > 800);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const arrowVisibility = () => {
    if (window.scrollY >= 200) {
      setArrowShown(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", arrowVisibility);

    return () => window.removeEventListener("scroll", arrowVisibility);
  }, []);

  const getGroupImages = React.useCallback(() => {
    const imageUrls = [
      `karperton-fotos/foto_s krappe sokken-04.jpg`,
      `karperton-fotos/foto_s krappe sokken-08.jpg`,
      `karperton-fotos/foto_s krappe sokken-13.jpg`,
    ];

    const downloadUrls = imageUrls.map((url) =>
      getDownloadURL(ref(storage, url))
    );

    Promise.all(downloadUrls).then((urls) => {
      setGroupImages(urls);
      setPending(false);
    });
  }, []);

  React.useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 3));
    setPending(true);
    getGroupImages();
  }, [getGroupImages]);

  return (
    <div className={$.block}>
      <div className={$.welcome}>
        <div className={$.socksWrap}>
          <img className={$.socks} src={socks} alt="socks" />
        </div>
        <div className={$.contentWrap}>
          <div className={$.textBubble}>
            <h1 className={$.intro}>
              Welkom soklovers ❤️ Wij zijn een 6-koppige indie pop/punk band uit
              Alkmaar. Muzikale vreugde die je laat dansen en glimlachen!
            </h1>
          </div>
          {groupImages && !pending && showImage && (
            <img
              className={$.imageBubble}
              src={groupImages[randomNumber]}
              alt="groupImage"
            />
          )}
        </div>
      </div>
      <div className={cx($.indicator, !arrowShown && $.hide)}>
        <FontAwesomeIcon className={$.arrow} icon={faAngleDown} size="3x" />
      </div>
    </div>
  );
};

export default IntroBlock;
