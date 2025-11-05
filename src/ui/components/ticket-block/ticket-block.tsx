import * as React from "react";
import $ from "./ticket-block.module.scss";
import { getDownloadURL, ref } from "@firebase/storage";
import storage from "../../../firebase";

type Image = {
    url: string;
  };

const TicketBlock: React.FC = () => {

    const [image, setImage] = React.useState<Image>();

    React.useEffect(() => {
      getDownloadURL(ref(storage, `2025/christmaswiggle.gif`)).then(
        (url) => {
          setImage({ url: url });
        }
      );
    }, []);

  return (
    <div className={$.background}>
      <div className={$.block}>
        <div className={$.content}>
          <div className={$.textBubble}>
            <h2 className={$.title}>Krappe Kerst</h2>
            <p className={$.text}>
              Kom naar ons kerstfeetje! Het wordt een avond vol muziek, gezelligheid en kerstsfeer.
              Bestel je tickets en zorg dat je erbij bent!
            </p>
          </div>
          <div className={$.iframeWrapper}>
            <iframe
              src="https://krappe-sokken.weticket.io/krappe-kerst/shop?"
              width="100%"
              style={{ border: "none" }}
              title="Ticket Booking"
            />
          </div>
        </div>
        {image && (
          <img
            className={$.image}
            src={image.url}
            alt="Christmas wiggle"
          />
        )}
      </div>
    </div>
  );
};

export default TicketBlock;

