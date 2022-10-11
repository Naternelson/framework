import { useRoutes } from "react-router-dom";
import { AppRouter } from "./AppRoutes";

const ROUTES = new AppRouter().addDefaults().render()

export const useAppRoutes = () => {
    return useRoutes(ROUTES)
}