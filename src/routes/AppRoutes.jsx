import App from "../App"
import MainLayout from "../layout/MainLayout"
import { createBrowserRouter,RouterProvider } from "react-router"
import { lazy, Suspense } from "react"
import { getUsers } from "../api/usersApi"

let About = lazy(()=> import("../Pages/About"))
let Contact = lazy(()=> import("../Pages/Contact"))


const AppRoutes = () => {
    let router = createBrowserRouter([
        {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"",
                element:<App/>,
            },
            {
                path:"about",
                loader: getUsers,
                hydrateFallbackElement : <h1> Loading user data</h1>,
                element: <Suspense fallback={<h1>Loading About </h1>}>
                    <About/>
                </Suspense>
            },
             {
                path:"contact",
                element: <Suspense fallback={<h1> Loading Contact </h1>}>
                    <Contact/>
                </Suspense>
            },
        ],
    },
])
  return <RouterProvider router={router}/>
}

export default AppRoutes
