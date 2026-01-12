## Exercice 7 – Memoisation avec `React.memo` et le Hook `useCallback`

**Concept Brief**  
Optimisez le rendu d’une liste d’items en évitant les recalculs inutiles grâce à `React.memo` et `useCallback`.  

**Code Challenge**  

1. Créez `src/itemList.tsx`.  
2. Implémentez un composant `Item` qui reçoit :  
   - `value: number`  
   - `onClick: () => void`  
   Le composant affiche le nombre et un bouton « + ».  
3. Enveloppez `Item` avec `React.memo` pour qu’il ne se re‑render que si ses props changent.  
4. Créez `ItemList` qui :  
   - Garde un tableau d’entiers `items` dans l’état (`[1,2,3]`).  
   - Fournit à chaque `Item` une fonction `increment` qui incrémente la valeur correspondante.  
   - Utilise `useCallback` pour mémoriser `increment` afin que la référence ne change pas entre les rendus.  
5. Remplacez le rendu de `App` par `<ItemList />`.  

**Starter snippet** :

```tsx
import React, { useState, useCallback } from "react";

// Item memoisé
const Item: React.FC<{ value: number; onClick: () => void }> = React.memo(
  ({ value, onClick }) => {
    console.log("Render Item", value);
    return (
      <div style={{ margin: "8px 0" }}>
        <span>{value}</span>
        <button onClick={onClick} style={{ marginLeft: "8px" }}>
          +
        </button>
      </div>
    );
  }
);

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  // Fonction d’incrément mémorisée
  const increment = useCallback(
    (index: number) => {
      setItems((prev) => {
        const copy = [...prev];
        copy[index] += 1;
        return copy;
      });
    },
    [] // aucune dépendance externe
  );

  return (
    <div>
      {items.map((val, idx) => (
        <Item
          key={idx}
          value={val}
          onClick={() => increment(idx)} // nouvelle fonction à chaque map, mais memo garde le même onClick grâce à useCallback
        />
      ))}
    </div>
  );
};
```

**Débogage tip**  
Si vous voyez `Render Item` s’afficher pour tous les items à chaque clic, assurez‑vous :  
- Que `increment` est bien créé avec `useCallback` (pas de dépendances qui changent).  
- Que `Item` est bien enveloppé avec `React.memo`.  
- Que vous ne recréez pas de nouvelles props complexes (ex. objets) sans les mémoriser.  