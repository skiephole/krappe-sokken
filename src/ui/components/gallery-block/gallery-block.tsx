import * as React from "react";
import { getDownloadURL, ref } from "@firebase/storage";
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

  const getGroupImages = React.useCallback(() => {
    const imageUrls = [
      `2024/1.jpeg`,
      `2024/2.jpeg`,
      `2024/3.jpeg`,
      `2024/4.jpeg`,
    ];

    const downloadUrls = imageUrls.map((url) =>
      getDownloadURL(ref(storage, url))
    );

    Promise.all(downloadUrls).then((urls) => {
      setGroupImages(urls.map((url) => ({ url: url })));
    });
  }, []);

  React.useEffect(() => {
    getGroupImages();
  }, [getGroupImages]);

  return (
    <div className={$.block}>
      <div className={$.gallery}>
        <div className={$.slider}>
          {groupImages && (
            <SimpleImageSlider
              width={isMedium ? 320 : 750}
              height={isMedium ? 213 : 527}
              navStyle={1}
              images={groupImages}
              showBullets={false}
              showNavs={false}
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
