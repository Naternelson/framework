import { Box, BoxProps, Typography, useTheme } from "@mui/material"
import { useEffect } from "react"
import { AnimatedGradient } from "../../components/AnimatedGradient"

const createLinearGradient = (direction: string,...colors: string[])=> {
    const reverse = colors.reverse().slice(1)
    return `linear-gradient(${direction}, ${[...colors].join(", ")})`
}

const createRadialGradient = (...colors: string[])=> {
    return [
        "at closest-side, "+ colors[0]+ ", transparent 20%", 
        "at bottom, "+ colors[1]+ ", transparent 40%",
        "at top right, "+ colors[2]+", transparent 50%"
    ].map(text => "radial-gradient("+ text + ")").join(", ")
}

export const RootPage = () => {
    const theme = useTheme()
    const {palette} = theme
    const {secondary, info, error, warning} = palette
    
    const gradient = createLinearGradient("135deg", info.light,  warning.light, error.light)
    // const gradient = createRadialGradient(secondary.light,  warning.light, error.light)
    const boxProps:BoxProps = {
        height: "100%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column", 
        alignItems: "center", 
        sx: {
            backgroundImage: gradient 
        }
    }
    return <AnimatedGradient {...boxProps}>
        <Box width="500px">

            <Typography variant="h1" align="center">ROOT PAGE</Typography>
            <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci illo iusto sint minus. Placeat, praesentium. Ullam nesciunt molestias nobis, blanditiis, quas deserunt minus, eaque facilis esse aspernatur repellendus distinctio eius.</Typography>
        </Box>
    </AnimatedGradient>
        
}