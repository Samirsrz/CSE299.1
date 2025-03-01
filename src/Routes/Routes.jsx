import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
// import PrivateRoute from "../Providers/PrivateRoute";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        // {
        //    path:'/donation-requests',
        //    element: <PrivateRoute><DonationRequests></DonationRequests></PrivateRoute>
        // },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
      
     
  
      ]
    },
  
  ]);