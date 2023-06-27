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
      `karperton-fotos/foto_s krappe sokken-01.jpg`,
      `karperton-fotos/foto_s krappe sokken-02.jpg`,
      `karperton-fotos/foto_s krappe sokken-03.jpg`,
      `karperton-fotos/foto_s krappe sokken-05.jpg`,
      `karperton-fotos/foto_s krappe sokken-07.jpg`,
      `karperton-fotos/foto_s krappe sokken-12.jpg`,
      `karperton-fotos/foto_s krappe sokken-15.jpg`,
      `karperton-fotos/foto_s krappe sokken-16.jpg`,
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
        {groupImages && (
          <SimpleImageSlider
            width={isMedium ? 300 : 527}
            height={isMedium ? 460 : 792}
            navStyle={1}
            images={groupImages}
            showBullets={false}
            showNavs={true}
            autoPlay={true}
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
            @6wies
          </a>
        </p>
      </div>
      <header className={$.header}>
        <a
          className={$.link}
          href="https://www.instagram.com/krappesokkenband/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voor meer knappe koppies, kijk op onze insta ❤️
        </a>
      </header>
    </div>
  );
};

export default GalleryBlock;
