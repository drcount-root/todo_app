import { useState, useEffect } from "react";

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      className="theme-toggle border border-1 rounded"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggler;
