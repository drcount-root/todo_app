import React from "react";

import { useTheme } from "../context/ThemeContext";

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn btn-outline-secondary mb-3">
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggler;
