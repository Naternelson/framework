import { Link, RouteObject } from "react-router-dom";
import { AppRouter } from "../../router/AppRoutes";

export const SiteMap = (props: AppRouter) => {
    return (
        <div className="page">
            <h1>Insert SITEMAP here</h1>
            <ul>
                {props.defaultRoots.map(route => {
                    return <li key={route.name}>
                        {route.path && <Link to={route.path}><em>{route.name}</em></Link>}
                    </li>
                })}
                {props.routes.map(route => {
                    return <li key={route.name}>
                        {route.path && <Link to={route.path}><em>{route.name}</em></Link>}
                    </li>
                })}
            </ul>
        </div>
    )
}