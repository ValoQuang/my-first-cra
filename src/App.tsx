import { Outlet } from "react-router-dom";
import AboutMe from "./pages/AboutMe";
import Footer from "./pages/Footer";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <div
      data-theme="light"
      className="text-3xl px-24 py-2 gap-2 flex flex-col justfiy-between overflow-y-hidden max-lg:overflow-x-hidden"
    >
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
