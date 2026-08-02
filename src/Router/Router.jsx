import { createBrowserRouter } from "react-router";

import Home from "../Body/Home";
import Static1 from "../Template/Static";
import Static from "../Template/Static";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Static,
    children: [{
        index : true,
        Component:Home
    }]
  }
]);

export default router