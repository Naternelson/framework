import { Box, BoxProps, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";
import "./AnimatedGradient.css"


export function AnimatedGradient(props: PropsWithChildren<BoxProps & {bgSize?: string, duration?: number| string}>){
    const {children, bgSize, duration, ...bProps} = props
    const boxProps:BoxProps = {
        ...bProps,
        sx: {
            bgcolor: "primary.light",
            backgroundSize: bgSize || "400%",
            animationName: "animate-gradient",
            animationDuration: typeof duration === "string" ? duration : typeof duration === "number" ? String(duration) +"s"  : "40s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            ...bProps.sx
        },
        children
    }
    return <Box {...boxProps}/>
}