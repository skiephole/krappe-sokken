import BasePageView from "./ui/views/base-page";
import { Routes, Route } from "react-router-dom";
import "../src/ui/styles/global.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BasePageView />} />
      </Routes>
    </div>
  );
}

export default App;
