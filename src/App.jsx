import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Locations from "./Locations";
import MyFoundIt from "./myfoundit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/myfoundit" element={<MyFoundIt />} />
      </Routes>
    </Router>
  );
}

export default App;
