import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Logout from "./components/Logout.tsx";
import RootHome from "./components/RootHome.tsx";
import Chat from "./components/Chat.tsx";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/logout',
            element: <Logout />
        },
        {
            path: '/',
            element: <RootHome />,
            children: [
                {
                    index: true,
                    element: <Chat />
                }
            ]
        }

    ])
    return <RouterProvider router={router} />
}