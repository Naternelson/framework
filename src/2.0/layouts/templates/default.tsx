import {Box, BoxProps, useTheme} from "@mui/material"
import { ReactNode } from "react"

export type DefaultLayoutProps = {
    footer?:ReactNode
    navbar?: ReactNode,
    main?: ReactNode
    footerHeight?: BoxProps["height"] 
    navbarHeight?: BoxProps["height"]  
     
}

export function DefaultLayout(props: DefaultLayoutProps){
    const footerHeight = props.footerHeight || "5rem"
    const navHeight = props.navbarHeight || "2rem"
    const boxProps:BoxProps = {
        position: "relative",
        minHeight: "100vh",
        display:"flex"
    }
    const contentWrapper:BoxProps ={
        component:"main",
        flex:1,
        paddingBottom: footerHeight,
        paddingTop: navHeight 
    }
    const navWrapper:BoxProps = {
        component:"nav",
        height: navHeight, 
        position: "absolute",
        width: "100%",
        top: 0
    }
    const footerWrapper:BoxProps = {
        position: "absolute", 
        bottom: 0,
        width: "100%",
        height: footerHeight
    }
    return (
        <Box {...boxProps}>
            {props.navbar && <Box {...navWrapper}>{props.navbar}</Box>}
            {props.main && <Box {...contentWrapper}>{props.main}</Box>}
            {props.footer && <Box {...footerWrapper}>{props.footer}</Box>}
        </Box>
    )
}