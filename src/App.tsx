import "./App.css";
import { Outlet } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="mx-auto pt-6 pb-12 px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
