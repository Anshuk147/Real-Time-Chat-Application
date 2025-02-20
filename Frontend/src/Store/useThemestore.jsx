import { create } from "zustand";

const useThemeStore = create((set) => ({
  currentTheme: "light", // Default theme
  themes: [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ],
  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme); // Apply theme
    localStorage.setItem("theme", theme); // Persist theme
    set({ currentTheme: theme }); // Update Zustand state
  },
}));

export default useThemeStore;
