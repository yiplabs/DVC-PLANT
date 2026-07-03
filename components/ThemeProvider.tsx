"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  particles: boolean;
  setParticles: (on: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  particles: true,
  setParticles: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [particles, setParticlesState] = useState(true);

  // Initial theme is applied pre-paint by the inline script in layout.tsx;
  // here we just sync React state with whatever the document already has.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark") setTheme("dark");
    if (localStorage.getItem("sproutly-particles") === "off") setParticlesState(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sproutly-theme", next);
      return next;
    });
  }, []);

  const setParticles = useCallback((on: boolean) => {
    setParticlesState(on);
    localStorage.setItem("sproutly-particles", on ? "on" : "off");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, particles, setParticles }}>
      {children}
    </ThemeContext.Provider>
  );
}
