import { createBrowserRouter } from "react-router";

import Home from "../Body/Home";
import Static1 from "../Template/Static";
import Static from "../Template/Static";
import Login from "../registration/Login";
import Register from "../registration/Register";
import CreateEvent from "../Body/CreateEvent";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Static,
    children: [{
        index : true,
        Component:Home
    }]
  },{
    path:"/signin",
    Component: Login
  },{
    path:"/signup",
    Component: Register
  },
  {
    path:"/eventcreate",
    element: <PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>
  }
]);

export default router