"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export type ThemeChoice = "dark" | "light" | "system";
const validTheme = (value: string | null): ThemeChoice =>
  value === "light" || value === "system" ? value : "dark";

type Preferences = {
  reduced: boolean;
  simple: boolean;
  userReduced: boolean;
  systemReduced: boolean;
  setReduced: (v: boolean) => void;
  setSimple: (v: boolean) => void;
  theme: "dark" | "light";
  themeChoice: ThemeChoice;
  setTheme: (v: ThemeChoice) => void;
};
const Context = createContext<Preferences>({
  reduced: false,
  simple: false,
  userReduced: false,
  systemReduced: false,
  setReduced: () => {},
  setSimple: () => {},
  theme: "dark",
  themeChoice: "dark",
  setTheme: () => {},
});
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [userReduced, setUserReduced] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [simple, setSimpleState] = useState(false);
  const [theme, setResolvedTheme] = useState<"dark" | "light">("dark");
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>("dark");
  useEffect(() => {
    let choice = validTheme(
      document.documentElement.dataset.themeChoice || null,
    );
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved =
        choice === "system" ? (scheme.matches ? "dark" : "light") : choice;
      setThemeChoice(choice);
      setResolvedTheme(resolved);
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeChoice = choice;
      document.documentElement.style.colorScheme = resolved;
    };
    const schemeChanged = () => {
      if (choice === "system") apply();
    };
    const storageChanged = (event: StorageEvent) => {
      if (event.key !== "mu-theme" && event.key !== null) return;
      choice = validTheme(event.newValue);
      apply();
    };
    const changed = () => {
      choice = validTheme(document.documentElement.dataset.themeChoice || null);
      apply();
    };
    apply();
    scheme.addEventListener("change", schemeChanged);
    window.addEventListener("storage", storageChanged);
    window.addEventListener("mu-theme-change", changed);
    return () => {
      scheme.removeEventListener("change", schemeChanged);
      window.removeEventListener("storage", storageChanged);
      window.removeEventListener("mu-theme-change", changed);
    };
  }, []);
  const setTheme = (choice: ThemeChoice) => {
    document.documentElement.dataset.themeChoice = choice;
    try {
      localStorage.setItem("mu-theme", choice);
    } catch {}
    window.dispatchEvent(new Event("mu-theme-change"));
  };
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    update();
    media.addEventListener("change", update);
    try {
      setUserReduced(localStorage.getItem("mu-reduced") === "true");
      setSimpleState(localStorage.getItem("mu-simple") === "true");
    } catch {}
    return () => media.removeEventListener("change", update);
  }, []);
  const reduced = userReduced || systemReduced;
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);
  const setReduced = (v: boolean) => {
    setUserReduced(v);
    try {
      localStorage.setItem("mu-reduced", String(v));
    } catch {}
  };
  const setSimple = (v: boolean) => {
    setSimpleState(v);
    try {
      localStorage.setItem("mu-simple", String(v));
    } catch {}
  };
  return (
    <Context.Provider
      value={{
        reduced,
        simple,
        userReduced,
        systemReduced,
        setReduced,
        setSimple,
        theme,
        themeChoice,
        setTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const usePreferences = () => useContext(Context);
export function ThemeToggle() {
  const { theme, setTheme } = usePreferences();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
    >
      <Sun className="theme-sun" size={17} aria-hidden="true" />
      <Moon className="theme-moon" size={17} aria-hidden="true" />
    </button>
  );
}
export function ThemePicker() {
  const { themeChoice, setTheme } = usePreferences();
  return (
    <div className="theme-picker" role="group" aria-label="Color theme">
      {(
        [
          { value: "dark", Icon: Moon, label: "Dark" },
          { value: "light", Icon: Sun, label: "Light" },
          { value: "system", Icon: Monitor, label: "System" },
        ] as const
      ).map(({ value, Icon, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={themeChoice === value}
          onClick={() => setTheme(value)}
        >
          <Icon size={13} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
export function VisualPreferences() {
  const p = usePreferences();
  return (
    <div className="visual-preferences" aria-label="Visual preferences">
      <button
        type="button"
        aria-pressed={p.reduced}
        onClick={() => p.setReduced(!p.userReduced)}
      >
        {p.reduced ? "✓" : "○"} Reduce motion
        {p.systemReduced && (
          <span className="sr-only"> enabled by your system preference</span>
        )}
      </button>
      <button
        type="button"
        aria-pressed={p.simple}
        onClick={() => p.setSimple(!p.simple)}
      >
        {p.simple ? "✓" : "○"} Simplified visuals
      </button>
      <ThemePicker />
    </div>
  );
}
