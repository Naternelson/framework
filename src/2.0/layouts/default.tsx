import { Link as RouterLink, Outlet } from "react-router-dom"
import {ButtonBase, Link} from "@mui/material"
import { DefaultLayout as Layout } from "./templates/default"
import {Box, BoxProps, Typography, AppBar, AppBarProps, ButtonProps} from "@mui/material"
import React, { ReactNode } from "react"
import { ButtonLink } from "../components/ButtonLink"
export const DefaultLayout = () => {
    const navbarHeight="3rem"
    return (
        <Layout
            main={<Outlet/>}
            footer={<Footer/>}
            navbar={<NavBar uiProps={{height: navbarHeight}} data={{
                title: {
                    name: "Site Title",
                    path: "/"
                },
                links: [
                    {name: "About", path: "/about"},
                    {name: "Contanct", path: "/contact"}
                ]
            }}/>}
            navbarHeight={navbarHeight}
        />
    )
    // return (
    //     <div className="page-container">
    //         <main>
    //             <Outlet/>
    //         </main>
    //         <footer>
    //             <Link to="/sitemap">sitemap</Link>
    //             <div className="disclaimer">
    //                 This is the default layout
    //             </div>
    //         </footer>
    //     </div>
    // )
}

function Footer(){
    const footerProps:BoxProps = {
        borderTop: "1px solid rgba(0,0,0,.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing:"border-box"

    }
    const linkProps:BoxProps = {
        padding: "1rem 2rem",
        fontSize: "small"
    }
    const disclaimer:BoxProps = {
        padding: ".4rem",
        bgcolor: "brown",
        fontSize: "smaller",
        textAlign: "center",
        color: "white"
    }
    return (
        <Box {...footerProps}>
            <Box {...linkProps}>
                <ButtonLink to="/sitemap">Sitemap</ButtonLink>
            </Box>
            <Box {...disclaimer}>
                Default Layout
            </Box>
        </Box>
    )
}

type NavBarData = {
    title?: {
        name?: string | React.ReactNode
        linkTo?: string,
        [dataKey:string]: any 
    }
    links?: {
        name: string 
        path: string,
        [dataKey:string]: any 
    }[],
    menus?: {
        name: string 
        items: {
            name: string 
            priority?: number,
            onClick?: ButtonProps["onClick"] 
        }[],
        [dataKey:string]: any 
    }

}


function NavBar(props: {
    uiProps?: BoxProps,
    data: NavBarData
    variant?: string 
}){
    const {variant, ...p} = props
    switch(variant){
        default: 
            return <NavBarDefault {...p}/>
    }
}

function NavBarDefault(props: {
    uiProps?: BoxProps,
    data: NavBarData
}){
    const appBarProps: BoxProps = {
        color: "white",
        display:"flex",
        alignItems:"center",
        bgcolor: "primary.main",
        height:"100%",
        width: "100%",
        ...props.uiProps,
    }
    const toolbarProps:BoxProps = {
        display: "flex",
        justifyContent: "start",
        paddingX: {
            xs: "2rem",
            md: "10rem"
        },

    }
    return (
        <Box {...appBarProps}>
            <Box {...toolbarProps}>
                <ButtonLink to="/" typogrophyProps={{sx:{fontSize:"larger"}}}>{props.data.title?.name}</ButtonLink>
            </Box>
        </Box>

    )
}