import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AboutMe from "./views/AboutMe";
import Achievement from "./views/Achievement";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "",
        index: true,
        element: (
          <>
            <AboutMe />
          </>
        ),
      },
      {
        path: "to-do",
        element: <Achievement />,
      },
    ],
  },
]);
