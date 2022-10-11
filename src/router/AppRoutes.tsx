import { RouteObject, RouteProps, RouterProps, useRoutes } from "react-router-dom"
import { NotFoundPage } from "../pages/404"
import { AboutPage } from "../pages/about"
import { AppPage } from "../pages/app"
import { ContactPage } from "../pages/contact"
import { FAQPage } from "../pages/faq"
import { LoginPage } from "../pages/login"
import { PlaygroundPage } from "../pages/playground"
import { PrivacyPage } from "../pages/privacy"
import { RootPage } from "../pages/root"
import { SignupPage } from "../pages/signup"
import { SiteMap } from "../pages/sitemap"
import { TermsOfServicePage } from "../pages/terms-of-service"
import { AppElement, ProtectedElement } from "./AppElement"

export class AppRouter{
    routes: AppRoute[] = []
    defaultRoots: AppRoute[] = []
    get count(){
        return this.routes.length + this.defaultRoots.length
    }
    addChild(props:AppRouteProps){
        this.routes.push(new AppRoute(props))
    }
    addRoot(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "ROOT",
            path: "/",
            description: description || "Main landing page for site",
            element: element|| <RootPage/>
        }))
    }
    add404(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "404",
            path: "*",
            description: description || "Landing page for status 404",
            element: element || <NotFoundPage/>
        }))
    }
    addPlayground(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "PLAYGROUND",
            path: "/playground",
            description: description || "A Page for developers to play with elements in the app",
            redirect:() => {
                const env = process.env.NODE_ENV 
                return env === "development" || !env
            },
            redirectTo: "/playground-page",
            element: element || <PlaygroundPage/>
        }))
    }
    addContact(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "CONTACT",
            path: "/contact",
            description: description || "A Page for visitors to send a contact request",
            element: element || <ContactPage/>
        }))
    }
    addPrivacy(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "PRIVACY",
            path: "/privacy",
            description: description || "A Page for visitors to see the privacy policy",
            element: element || <PrivacyPage/>
        }))
    }
    addTermsOfService(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "TERMS_OF_SERVICE",
            path: "/terms-of-service",
            description: description || "A Page for visitors to see the terms-of-service policy",
            element: element || <TermsOfServicePage/>
        }))
    }
    addAbout(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "ABOUT",
            path: "/about",
            description: description || "A Page for visitors to learn about the app/service",
            element: element || <AboutPage/>
        }))
    }
    addFAQ(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "FAQ",
            path: "/faq",
            description: description || "A Page for visitors to get answers to commonly asked questions",
            element: element || <FAQPage/>
        }))
    }
    addApp(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "APP DASHBOARD",
            path: "/app",
            description: description || "The landing page for verified users ",
            element: element || <AppPage/>
        }))
    }
    addLogin(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "LOGIN",
            path: "/login",
            description: description || "A Page with a login form",
            element: element || <LoginPage/>
        }))
    }
    addSignup(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "SIGNUP",
            path: "/signup",
            description: description || "A Page with a signup form",
            element: element || <SignupPage/>
        }))
    }
    addSitemap(element?: RouteProps["element"], description?:string){
        this.defaultRoots.push(new AppRoute({
            name: "SITEMAP",
            path: "/sitemap",
            description: description || "A sitemap",
            element: element || <SiteMap {...this}/>
        }))
    }
    addDefaults(){
        this.add404()
        this.addAbout()
        this.addContact()
        this.addPlayground()
        this.addRoot()
        this.addPrivacy()
        this.addTermsOfService()
        this.addFAQ()
        this.addSignup()
        this.addLogin()
        this.addApp()
        this.addSitemap()
        return this
    }
    render(){
        this.routes = [...this.defaultRoots, ...this.routes]

        return this.routes.map(r => r.render())
    }
    
}

export type AppRouteProps = RouteObject & {description?: string, name: string, redirect?: () => Promise<boolean> | boolean, redirectTo?: string }
export class AppRoute{
    private params: RouteObject = {}
    name: string
    element:RouteProps["element"] = <></>
    routes: AppRoute[] = []
    get path(){
        return this.params.path
    }
    set path(p:string|undefined){
        this.params.path = p
    } 
    description?:string
    redirect?: () => Promise<boolean> | boolean 
    redirectTo?: string 
    get hasRedirect(){
        return !!this.redirect && !!this.redirectTo
    }
    constructor(props: AppRouteProps){
        const {description, name, redirect, redirectTo, ...params} = props 
        this.params = params 
        this.name = name
        this.description = description
        this.element = params.element

        if(redirect && redirectTo) this.addRedirect(redirect, redirectTo)
    }

    addRedirect(redirect: () => Promise<boolean> | boolean , redirectTo:string){
        this.redirect = redirect
        this.redirectTo = redirectTo
    }
    render():RouteObject{
        if(this.routes) this.params.children = this.routes.map(r => r.render())
        this.params.element = this.hasRedirect ? <ProtectedElement 
                element={this.element}
                name={this.name}
                description={this.description}
                redirect={this.redirect as (() => Promise<boolean>) | (() => boolean) }
                redirectTo={this.redirectTo as string}
            /> : <AppElement 
                element={this.element}
                name={this.name}
                description={this.description}
            />
        return this.params
    }
    addChild(props:AppRouteProps){
        this.routes.push(new AppRoute(props))
    }
}

