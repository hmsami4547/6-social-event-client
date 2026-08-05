import { createBrowserRouter } from "react-router";

import Home from "../Body/Home";
import Static1 from "../Template/Static";
import Static from "../Template/Static";
import Login from "../registration/Login";
import Register from "../registration/Register";
import CreateEvent from "../Body/CreateEvent";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EventDetails from "../Body/EventDetails";
import ManageEvents from "../Body/ManageEvents";
import Update from "../Body/Update";
import MyEvent from "../Body/MyEvent";
import UserDetails from "../User/UserDetails";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Static,
    children: [{
        index : true,
        Component:Home,
        loader: ()=>fetch("http://localhost:3000/").then(res => res.json())
    },{
      path:"/:id",
      element: <PrivateRoute><EventDetails></EventDetails></PrivateRoute>,
      loader: ({params})=> fetch(`http://localhost:3000/${params.id}`).then(res => res.json())
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
  },
  {
    path: "/manageEvents",
    element: <PrivateRoute><ManageEvents></ManageEvents></PrivateRoute>
  },
  {
    path:"/update/:id",
    element: <PrivateRoute><Update></Update></PrivateRoute>,
    loader: ({params})=>fetch(`http://localhost:3000/createEvent/${params.id}`,
      {credentials: 'include'}
    ).then(res => res.json())
  },
  {path: "/myEvent",
    element: <PrivateRoute><MyEvent></MyEvent></PrivateRoute>
  },
  {
    path:"/userDetails",
    element: <PrivateRoute><UserDetails></UserDetails></PrivateRoute>
  }
]);

export default router