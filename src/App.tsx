import BasePageView from "./ui/views/base-page";
import NotFoundView from "./ui/views/not-found";
import { Routes, Route } from "react-router-dom";
import "../src/ui/styles/global.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BasePageView />} />
        {/*
          Unknown paths: Firebase serves dist/404.html with HTTP 404 (see
          firebase.json — no SPA catch-all rewrite). This shell matches
          index.html so the same JS bundle runs and this route renders.
        */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </div>
  );
}

export default App;
