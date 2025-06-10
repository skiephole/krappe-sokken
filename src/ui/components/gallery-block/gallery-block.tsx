import * as React from "react";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "../../../firebase";
import SimpleImageSlider from "react-simple-image-slider";
import $ from "./gallery-block.module.scss";
import { useBreakpoints } from "app/hooks/use-window-width";

type GroupImage = {
  url: string;
};

const GalleryBlock: React.FC = () => {
  const { isMedium } = useBreakpoints();
  const [groupImages, setGroupImages] = React.useState<GroupImage[]>();
  const [isVisible, setIsVisible] = React.useState(false);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  const getGroupImages = React.useCallback(() => {
    const webpUrls = [
      `2024/1.webp`,
      `2024/2.webp`,
      `2024/3.webp`,
      `2024/4.webp`,
    ];

    const jpegUrls = [
      `2024/1.jpeg`,
      `2024/2.jpeg`,
      `2024/3.jpeg`,
      `2024/4.jpeg`,
    ];

    const downloadPromises = webpUrls.map((url, index) =>
      getDownloadURL(ref(storage, url)).catch(() =>
        getDownloadURL(ref(storage, jpegUrls[index]))
      )
    );

    Promise.all(downloadPromises).then((urls) => {
      setGroupImages(urls.map((url) => ({ url: url })));
    });
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      getGroupImages();
    }
  }, [isVisible, getGroupImages]);

  return (
    <div className={$.block}>
      <div className={$.gallery} ref={galleryRef}>
        <div className={$.slider}>
          {groupImages && (
            <SimpleImageSlider
              width={isMedium ? 320 : 750}
              height={isMedium ? 213 : 527}
              navStyle={1}
              images={groupImages}
              showBullets={false}
              showNavs={true}
              autoPlay={true}
              autoPlayDelay={4}
            />
          )}
          <p>
            Foto's door{" "}
            <a
              className={$.link}
              href="https://www.instagram.com/6wies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>@6wies ❤️</b>
            </a>
          </p>
        </div>
      </div>
      <div className={$.footer}>
        <a href="mailto: krappesokkenband@gmail.com" className={$.link}>
          krappesokkenband@gmail.com
        </a>
        <span className={$.separator}>&nbsp; | &nbsp;</span>
        <a
          className={$.link}
          href="https://www.instagram.com/krappesokkenband/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @krappesokkenband
        </a>
      </div>
    </div>
  );
};

export default GalleryBlock;
