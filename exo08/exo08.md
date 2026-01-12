## Exercice 8 – Lazy loading de composants avec `React.lazy` et `Suspense`

**Concept Brief**  
Divisez l’application en morceaux chargés à la demande pour réduire le bundle initial.  

**Code Challenge**  

1. Créez un nouveau composant `HeavyComponent.tsx` qui simule un composant lourd :  
   - Affiche un texte « Composant lourd chargé ».  
   - Ajoutez un `setTimeout` de 1 s dans le corps du composant pour simuler un délai (par ex. `useEffect(() => setTimeout(() => setReady(true), 1000), []);`).  
2. Dans `src/app.tsx` :  
   - Importez le composant avec `React.lazy(() => import("./HeavyComponent"))`.  
   - Entourez son rendu avec `<Suspense fallback={<div>Chargement…</div>}>`.  
   - Ajoutez un bouton « Afficher le composant lourd » qui, lorsqu’on clique, rend le composant lazy.  
3. Le composant ne doit être chargé que lorsqu’on clique sur le bouton.  

**Starter snippet (`src/HeavyComponent.tsx`)** :

```tsx
import React, { useEffect, useState } from "react";

export const HeavyComponent: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return ready ? <div>🚀 Composant lourd chargé !</div> : <div>Initialisation…</div>;
};
```

**Intégration dans `app.tsx`** :

```tsx
import React, { useState, lazy, Suspense } from "react";

const LazyHeavy = lazy(() => import("./HeavyComponent"));

export const App: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setShowHeavy(true)}>Afficher le composant lourd</button>

      {showHeavy && (
        <Suspense fallback={<div>Chargement du composant…</div>}>
          <LazyHeavy />
        </Suspense>
      )}
    </div>
  );
};

export default App;
```

**Débogage tip**  
Si le fallback ne s’affiche jamais et que le composant ne se charge pas, vérifiez :  
- Que le chemin du fichier dans `import("./HeavyComponent")` est correct.  
- Que le serveur de développement supporte le chargement dynamique (Vite/webpack le fait automatiquement).  