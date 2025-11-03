import * as React from "react";
import logo from "/logo512.png";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase";
import { cx } from "../../../utils/join-class-names";
import $ from "./intro-block.module.scss";

// Preload the logo image
const preloadLogo = new Image();
preloadLogo.src = logo;

const IntroBlock: React.FC = () => {
  const [arrowShown, setArrowShown] = React.useState(true);
  const [groupImages, setGroupImages] = React.useState<string[]>([]);
  const [pending, setPending] = React.useState(true);
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

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
    // Define both low and high quality image URLs
    const highQualityUrls = [`2025/1.jpg`, `2025/12.jpeg`];
    // Fallbacks if WebP not available
    const fallbackUrls = [`2024/1.jpeg`, `2024/4.jpeg`];

    const highQualityPromise = highQualityUrls.map((url, index) =>
      getDownloadURL(ref(storage, url)).catch(() =>
        getDownloadURL(ref(storage, fallbackUrls[index]))
      )
    );

    Promise.all(highQualityPromise)
      .then((highQualityUrls) => {
        // Replace with high quality images when ready
        setGroupImages(highQualityUrls);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setPending(false);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  React.useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 2));
    getGroupImages();
  }, [getGroupImages]);

  // Create inline styles for optimized image loading
  const imageStyle = {
    opacity: imageLoaded ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  return (
    <div className={$.background}>
      <div className={$.block}>
        <div className={$.welcome}>
          <div className={$.logoWrap}>
            <img
              className={$.logo}
              src={logo}
              alt="logo"
              width={250}
              height={250}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className={$.contentWrap}>
            <div className={$.textBubble}>
              <h1 className={$.intro}>Krappe Sokken</h1>
              <h2>
                Take your shoes off, keep your socks on and dance 'em off!'
              </h2>
            </div>
            <div className={$.imageWrap}>
              {groupImages.length > 0 && !pending && (
                <img
                  ref={imageRef}
                  className={$.imageBubble}
                  src={groupImages[randomNumber]}
                  alt="Krappe Sokken band"
                  width={800}
                  height={600}
                  rel="preload"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  style={imageStyle}
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                />
              )}
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

export default IntroBlock;
