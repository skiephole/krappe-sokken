import * as React from "react";
import socks from "/logo512.png";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase";
import { cx } from "../../../utils/join-class-names";
import $ from "./intro-block.module.scss";

// Preload the logo image
const preloadLogo = new Image();
preloadLogo.src = socks;

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
    const smallImageUrls = [`2024/small_1.webp`, `2024/small_4.webp`];
    const highQualityUrls = [`2024/1.webp`, `2024/4.webp`];
    // Fallbacks if WebP not available
    const fallbackUrls = [`2024/1.jpeg`, `2024/4.jpeg`];

    // First try to get small placeholder images
    const smallImagesPromise = smallImageUrls.map((url, index) =>
      getDownloadURL(ref(storage, url)).catch(() =>
        getDownloadURL(ref(storage, fallbackUrls[index]))
      )
    );

    // Then load high quality images
    Promise.all(smallImagesPromise)
      .then((smallUrls) => {
        // First set the small images for quick display
        setGroupImages(smallUrls);
        setPending(false);

        // Then load high quality images in the background
        const highQualityPromise = highQualityUrls.map((url, index) =>
          getDownloadURL(ref(storage, url)).catch(() =>
            getDownloadURL(ref(storage, fallbackUrls[index]))
          )
        );

        return Promise.all(highQualityPromise);
      })
      .then((highQualityUrls) => {
        // Replace with high quality images when ready
        setGroupImages(highQualityUrls);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
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
          <div className={$.socksWrap}>
            <img
              className={$.socks}
              src={socks}
              alt="socks"
              width={150}
              height={150}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className={$.contentWrap}>
            <div className={$.textBubble}>
              <h1 className={$.intro}>
                Krappe Sokken, indie band uit Alkmaar. Muzikale vreugde die je
                laat dansen en glimlachen!
              </h1>
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
