import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";
import './LinkButton.scss'
import { ReactNode } from "react";

export default function LinkButton({path, children}:{path: string, children:ReactNode}) {
    const {theme} = useTheme();
    return(
        <Link className={theme === 'dark'? 'link-btn link-btn-dark':'link-btn'} to={path}>
            {children}
        </Link>
    )
}