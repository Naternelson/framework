import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./AppRoutes"

const RouteObject = [AppRouter.getDefault().render()] 
export const APP_ROUTES = createBrowserRouter(RouteObject)   

export default function AppRouterService (){
    useEffect(()=> {
        console.log({APP_ROUTES, RouteObject})
    },[])
    return <RouterProvider router={APP_ROUTES} />
}