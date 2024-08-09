import Link from "next/link";
import { useTheme } from "../ThemeContext/useTheme";
import { ReactNode } from "react";

interface LinkButtonProps {
  path: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function LinkButton({
  path,
  children,
  onClick,
}: LinkButtonProps) {
  const { theme } = useTheme();
  return (
    <Link
      className={theme === "dark" ? "link-btn link-btn-dark" : "link-btn"}
      href={path}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
