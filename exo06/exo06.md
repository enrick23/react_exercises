## Exercice 6 – Utiliser le Context API pour partager l’état du thème (clair/sombre)

**Concept Brief**  
Créez un contexte qui fournit la couleur du thème à toute l’application et ajoutez un bouton pour basculer entre le mode clair et le mode sombre.  

**Code Challenge**  

1. Créez `src/themeContext.tsx`.  
2. Définissez :  
   - `type Theme = "light" | "dark"`  
   - `interface ThemeContextProps { theme: Theme; toggleTheme: () => void }`  
   - `const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined)`  
3. Implémentez un `ThemeProvider` qui :  
   - Garde `theme` dans un `useState` (initialisé à `"light"`).  
   - Fournit `theme` et `toggleTheme` via le `ThemeContext.Provider`.  
4. Créez un composant `ThemedBox` qui consomme le contexte :  
   - Affiche un `<div>` avec un fond blanc/noir selon le thème et du texte contrasté.  
5. Dans `src/app.tsx` :  
   - Enveloppez tout le rendu avec `<ThemeProvider>`.  
   - Ajoutez un bouton « Basculer le thème » qui appelle `toggleTheme`.  
   - Affichez `<ThemedBox />` sous le bouton.  

**Starter snippet (`src/themeContext.tsx`)** :

```tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
```

**`ThemedBox.tsx`** (consommation) :

```tsx
import React from "react";
import { useTheme } from "./themeContext";

export const ThemedBox: React.FC = () => {
  const { theme } = useTheme();
  const style = {
    padding: "20px",
    marginTop: "10px",
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    textAlign: "center" as const,
  };
  return <div style={style}>Thème actuel : {theme}</div>;
};
```

**Intégration dans `app.tsx`** :

```tsx
import { ThemeProvider, useTheme } from "./themeContext";
import { ThemedBox } from "./ThemedBox";

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Basculer le thème</button>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{ padding: "20px" }}>
        <ThemeToggleButton />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
};

export default App;
```

**Débogage tip**  
Si `useTheme` renvoie `undefined`, vérifiez que le composant qui l’appelle est bien imbriqué **à l’intérieur** du `<ThemeProvider>` ; sinon le contexte n’est pas disponible.