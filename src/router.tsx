import { Form, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ToDo from "./pages/ToDo";
import AboutMe from "./pages/AboutMe";

export const router: any = createBrowserRouter([
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
        element: <ToDo />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
]);
