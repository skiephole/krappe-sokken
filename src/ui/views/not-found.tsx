import type * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "./not-found.module.scss";

const NotFoundView: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Pagina niet gevonden | Krappe Sokken";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-krappe-not-found", "true");
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);

  return (
    <main className={$.wrap}>
      <h1 className={$.title}>Pagina niet gevonden</h1>
      <p className={$.text}>
        Deze URL bestaat niet (meer). Ga terug naar de homepage voor shows,
        bio en muziek van Krappe Sokken.
      </p>
      <Link className={$.homeLink} to="/">
        Terug naar home
      </Link>
    </main>
  );
};

export default NotFoundView;
