import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loader";
import Home from "./routes/homePage/Home";

import {Layout, RequireAuth}  from "./routes/layout/Layout";
import ListPage from "./routes/listPage/ListPage";
import Register from "./routes/register/Register";
import Login from "./routes/loginPage/Login";
import Profilepage from "./routes/profile/Profilepage";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfileEditPage from "./routes/profileEditPage/ProfileEditPage";
import NewPostPage from "./routes/newPostPage/NewPostPage"

import{
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
            children:[
                {
                    path : "/",
                    element: <Home/>,
                },
                {
                    path: "/list",
                    element: <ListPage />,
                    loader : listPageLoader ,
                },
                {
                    path: "/register",
                    element: <Register/>
                },
                {
                    path: "/login",
                    element: <Login/>
                },
                {
                    path: "/:id",
                    element: <SinglePage />,
                    loader: singlePageLoader
                },           
            ]
        },
        {
            path:"/",
            element:<RequireAuth/>,
            children:[
                {
                    path: "/profile",
                    element: <Profilepage/>,
                    loader : profilePageLoader ,
                },
                {
                    path: "/profile/edit",
                    element: <ProfileEditPage/>,
                    loader : profilePageLoader ,
                },
                {
                    path: "/add",
                    element: <NewPostPage/>,
                    loader: profilePageLoader
                }
            ]
        }
      ]);


    return (
    <RouterProvider router={router} />
    );
}

export default App
