import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Playlists from "../components/Playlists/Playlists";
import Favorites from "../components/Favorites/Favorites";
import Search from "../components/Search/Search";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'search',
                element: <Search></Search>
            },
            {
                path: 'favorites',
                element: <Favorites></Favorites>
            },
            {
                path: 'playlists',
                element: <Playlists></Playlists>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default router;