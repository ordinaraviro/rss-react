import { useTheme } from "../ThemeContext/ThemeContext";
import "./Button.scss";
import { ReactNode } from "react";

export default function Button({
  handleClick,
  children,
}: {
  handleClick: () => void;
  children: ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <button
      className={theme === "dark" ? "btn btn-dark" : "btn"}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
