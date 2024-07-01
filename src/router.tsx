import { Form, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ToDo from "./views/ToDo";
import AboutMe from "./views/AboutMe";

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
        element: <ToDo />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
]);
