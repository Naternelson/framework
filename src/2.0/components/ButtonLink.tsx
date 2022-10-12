import { ButtonBase, ButtonBaseProps, Typography, TypographyProps } from "@mui/material"
import { PropsWithChildren } from "react"
import { NavigateOptions, useNavigate } from "react-router-dom"

export type ButtonLinkProps = ButtonBaseProps & {to: string, navOptions?: NavigateOptions, typogrophyProps?: TypographyProps}
export const ButtonLink = (props:PropsWithChildren<ButtonLinkProps>) => {
    const nav = useNavigate()
    const {children, to, navOptions, typogrophyProps, ...buttonBaseProps} = props 
    const buttonProps:ButtonBaseProps = {
        onClick: () => nav(to, navOptions),
        disableRipple:true,
        ...buttonBaseProps   
    }
    const typoProps:TypographyProps = {
        variant: "button",
        ...typogrophyProps
    }
    return (
        <ButtonBase {...buttonProps}>
            <Typography {...typoProps}>
                {children}
            </Typography>
        </ButtonBase>
    )
}