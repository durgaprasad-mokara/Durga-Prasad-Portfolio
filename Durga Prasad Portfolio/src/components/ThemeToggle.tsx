import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-0.5 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        background: isDark
          ? "linear-gradient(135deg, hsl(222 47% 14%), hsl(263 70% 30%))"
          : "linear-gradient(135deg, hsl(210 40% 90%), hsl(199 89% 70%))",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className="w-3.5 h-3.5 text-amber-300 transition-opacity duration-300" style={{ opacity: isDark ? 0.3 : 1 }} />
        <Moon className="w-3.5 h-3.5 text-indigo-200 transition-opacity duration-300" style={{ opacity: isDark ? 1 : 0.3 }} />
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{
          marginLeft: isDark ? "auto" : 0,
          background: isDark
            ? "linear-gradient(135deg, hsl(263 70% 50%), hsl(189 94% 43%))"
            : "linear-gradient(135deg, hsl(40 95% 60%), hsl(30 95% 55%))",
          boxShadow: isDark
            ? "0 0 12px hsl(263 70% 50% / 0.5)"
            : "0 0 12px hsl(40 95% 60% / 0.5)",
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-white" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
