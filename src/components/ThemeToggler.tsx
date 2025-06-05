import { useTheme } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle border border-1 rounded"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggler;
