import { ReactElement, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/** A Simple DEV wrapper to log the name and description of an Element */
export function AppElement(props:{element: ReactElement| React.ReactNode | JSX.Element, name: string, description?: string, log?: boolean}){
    useEffect(() => {
        if(process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
            if((props.name || props.description) && props.log) {
                console.groupCollapsed(props.name)
                console.log({description: props.description}) 
                console.groupEnd()
            }
        }
    }, [props])
    return <>{props.element}</>
}
/** A Wrapper around a Node. A provided redirect function will return a boolean. If returned false, the page will redirect. If the function is a Promise, it will return null until resolved. */
export function ProtectedElement(props: {element:ReactElement| React.ReactNode | JSX.Element, redirect:() => boolean | Promise<boolean>, redirectTo:string, name:string, description?: string }){
    const [ready, setReady] = useState<null|boolean>(null)
    const nav = useNavigate()
    useEffect(()=> {
        const r = props.redirect()
        if(typeof r === "boolean") setReady(r) 
        else r.then((bool) => setReady(bool)) 
    }, [])
    useEffect(()=> {
        if(ready === false) nav(props.redirectTo, {replace: true})
    }, [ready])
    return ready ? <AppElement {...{element:props.element, name: props.name, description: props.description}}/> : null 

}