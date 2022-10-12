import { Link, RouteObject } from "react-router-dom";
import { AppRouter } from "../../router/AppRoutes";

export const SiteMap = (props: {router: AppRouter}) => {
    const obj = props.router.renderChildren()

    return (
        <div className="page">
            <h1>Insert SITEMAP here</h1>
            <ul>
                {props.router.routes.map(route => {
                    console.log({name: route.name, path: route.path})
                    return (
                        <li key={route.name}>
                            <Link to={"/" + (route.path || "")}>{route.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}