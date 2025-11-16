import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FindWater from "./pages/Findwater";
import AddSource from "./pages/AddSource";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<FindWater />} />
          <Route path="/home" element={<Home />} />
          <Route path="/find" element={<FindWater />} />
          <Route path="/add" element={<AddSource />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="bg-blue-600 text-white text-center py-2">
        <p>© 2025 Clean Water Finder | Supporting SDG 6</p>
      </footer>
    </div>
  );
}

export default App;
