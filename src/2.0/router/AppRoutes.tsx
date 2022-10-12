import {  RouteObject } from "react-router-dom";
import { DefaultLayout } from "../layouts/default";
import { NotFoundPage } from "../pages/404";
import { AboutPage } from "../pages/about";
import { AppPage } from "../pages/app";
import { ContactPage } from "../pages/contact";
import { FAQPage } from "../pages/faq";
import { LoginPage } from "../pages/login";
import { PlaygroundPage } from "../pages/playground";
import { PrivacyPage } from "../pages/privacy";
import { RootPage } from "../pages/root";
import { SignupPage } from "../pages/signup";
import { SiteMap } from "../pages/sitemap";
import { TermsOfServicePage } from "../pages/terms-of-service";


export class AppRouter{
    static getDefault =() =>{
        const router = new AppRouter(
            "MAIN_LAYOUT",  {
                path: "/",
                element: <DefaultLayout/>,
                // loader: () => {
                //     return new Promise((res) => {
                //         setTimeout(res, 2000) 
                //     }) 
                // },
                routes: [
                    new AppRouter("ROOT", {
                        index: true, 
                        element: <RootPage/>
                    }),
                    new AppRouter("NOT_FOUND", {
                        path: "*",
                        element: <NotFoundPage/>
                    }),
                    new AppRouter("ABOUT", {
                        path: "about",
                        element: <AboutPage/>
                    }),
                    new AppRouter("APP", {
                        path: "app",
                        element: <AppPage/>
                    }),
                    new AppRouter("CONTACT", {
                        path: "contact",
                        element: <ContactPage/>
                    }),
                    new AppRouter("FAQ", {
                        path: "faq",
                        element: <FAQPage/>
                    }),
                    new AppRouter("LOGIN", {
                        path: "login",
                        element: <LoginPage/>
                    }),
                    new AppRouter("PLAYGROUND", {
                        path: "PLAYGROUND",
                        element: <PlaygroundPage/>
                    }),
                    new AppRouter("PRIVACY", {
                        path: "privacy",
                        element: <PrivacyPage/>
                    }),
                    new AppRouter("SIGNUP", {
                        path: "signup",
                        element: <SignupPage/>
                    }),
                    new AppRouter("TERMS_OF_SERVICE", {
                        path: "terms-of-service",
                        element: <TermsOfServicePage/>
                    }),
                ]
            }
        )
        router.add("SITEMAP", {
            path: "sitemap",
            element: <SiteMap router={router}/>
        })
        console.log({router})
        return router 
    } 

    name: string
    routes: AppRouter[] = []
    action?: RouteObject["action"]
    caseSensitive?: RouteObject["caseSensitive"]
    errorElement?: RouteObject["element"]
    handle?: RouteObject["handle"]
    hasErrorBoundary?: RouteObject["hasErrorBoundary"]
    id: RouteObject["id"]
    index?: RouteObject["index"]
    loader?: RouteObject["loader"]
    shouldRevalidate: RouteObject["shouldRevalidate"]
    path?: RouteObject["path"]
    element?: RouteObject["element"]
    private children?: RouteObject["children"]


    constructor(name: string, options?: Omit<RouteObject, "children"> & {routes?: AppRouter[]}){
        console.log(name, options)
        this.name = name 
        this.id = name 
        if(!options) return this 
        const {routes, action, caseSensitive, errorElement, handle, hasErrorBoundary, id, index, loader, shouldRevalidate, path, element} = options
        if(routes) this.routes = routes 
        if(action) this.action = action 
        if(caseSensitive) this.caseSensitive = caseSensitive 
        if(errorElement) this.errorElement = errorElement
        if(handle) this.handle = handle 
        if(hasErrorBoundary) this.hasErrorBoundary = hasErrorBoundary 
        if(id) this.id = id 
        if(index) this.index = index 
        if(loader) this.loader = loader 
        if(shouldRevalidate) this.shouldRevalidate = shouldRevalidate 
        if(path) this.path = path 
        if(element) this.element = element

    } 
    add(name: string, options?: Omit<RouteObject, "children"> & {routes?: AppRouter[]}){
        const route = new AppRouter(name, options)
        this.routes.push(route)
        return route 
    }
    remove(name: string, recursive?: boolean){
        if(!recursive) {this.routes.filter(r=> r.name !== name); return this }
        const indexes: number[] = []
        this.routes.forEach((r, i) => {
            if(r.name === name) indexes.push(i) 
            else r.remove(name, recursive)
        })
        this.routes = this.routes.filter((_r, i)=> {
            return !indexes.includes(i)
        })
        return this 
    }
    render():RouteObject{
        const routeObject:RouteObject = {}
        const keys = ["path", "index", "element", "action", "caseSensitive", "errorElement", "handle", "hasErrorBoundary", "id", "index", "loader","shouldRevalidate"]
        const obj = Object.keys(this).reduce((routeObject, key) => {
            if(keys.includes(key) && this[key as keyof this]) return {...routeObject, [key]: this[key as keyof RouteObject] as any}
            if(key === "routes" && this.routes.length) return {...routeObject, children: this.renderChildren()}
            return routeObject
        }, routeObject)
        return obj 
    }
    renderChildren(){
        return this.routes.map(r => r.render())
    }
 }
