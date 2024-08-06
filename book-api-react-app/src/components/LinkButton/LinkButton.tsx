// import { Link } from "react-router-dom";
import Link from "next/link";
import { useTheme } from "../ThemeContext/useTheme";
import { ReactNode } from "react";

export default function LinkButton({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <Link
      className={theme === "dark" ? "link-btn link-btn-dark" : "link-btn"} href={path}      // to={path}
    >
      {children}
    </Link>
  );
}
