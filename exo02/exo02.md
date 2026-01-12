## Exercice 2 – Gestion d’état avec le Hook `useState`

**Concept Brief**  
Apprenez à déclarer un état local dans un composant fonctionnel et à le mettre à jour via un bouton.  

**Code Challenge**  

1. Dans le même projet que l’exercice 1, créez un nouveau fichier `src/counter.tsx`.  
2. Implémentez un composant `Counter` qui :  
   - Initialise un état `count` à 0.  
   - Affiche la valeur actuelle.  
   - Propose deux boutons : **+** pour incrémenter et **‑** pour décrémenter.  
3. Modifiez `src/app.tsx` pour rendre le composant `Counter` à la place du simple `<h1>`.  

**Starter snippet (`src/counter.tsx`)** :

```tsx
import React, { useState } from "react";

export const Counter: React.FC = () => {
  // Votre code ici
  return (
    <div>
      <h2>Compteur : {/* valeur du compteur */}</h2>
      <button>{/* décrémenter */}-</button>
      <button>{/* incrémenter */}+</button>
    </div>
  );
};
```

**Intégration dans `app.tsx`** (remplacez le contenu du `return`) :

```tsx
import { Counter } from "./counter";

const App: React.FC = () => {
  return <Counter />;
};
```

**Débogage tip**  
Si le compteur ne change pas après un clic, assurez‑vous :  
- D’utiliser `setCount` (ou le setter que vous avez nommé) dans le gestionnaire `onClick`.  
- Que les fonctions de mise à jour sont bien passées comme `onClick={() => setCount(prev => prev + 1)}` (et similaire pour la décrémentation).  