import { Outlet } from "react-router-dom";
import { Navigation, Footer } from "./main/components/index";
import { useSelector } from "react-redux";
import { StoreState } from "./redux/store";

function App() {
  const { theme } = useSelector((state: StoreState) => state.theme);
  return (
    <div
      data-theme={theme}
      className="text-3xl max-lg:px-0 px-24 py-2 gap-2 flex flex-col justfiy-between max-lg:overflow-x-hidden"
    >
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
