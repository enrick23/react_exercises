## Exercice 12 – Optimisation avec `useMemo` et `useCallback` dans une liste filtrable

**Concept Brief**  
Implémentez une liste d’articles filtrable par recherche. Utilisez `useMemo` pour mémoïser le tableau filtré et `useCallback` pour mémoïser le gestionnaire de recherche, évitant ainsi les recalculs inutiles des éléments enfants.  

**Code Challenge**  

1. **Créer le composant** – `src/components/FilterableList.tsx`  

   ```tsx
   import React, { useState, useMemo, useCallback, ChangeEvent } from "react";

   interface Item {
     id: number;
     name: string;
   }

   // Données statiques (peuvent être remplacées par une API)
   const DATA: Item[] = [
     { id: 1, name: "Pomme" },
     { id: 2, name: "Banane" },
     { id: 3, name: "Cerise" },
     { id: 4, name: "Datte" },
     { id: 5, name: "Figue" },
   ];

   // Élément enfant mémoïsé
   const ListItem: React.FC<{ item: Item }> = React.memo(({ item }) => {
     console.log("Render Item:", item.name);
     return <li>{item.name}</li>;
   });

   export const FilterableList: React.FC = () => {
     const [query, setQuery] = useState("");

     // Mémoïser le gestionnaire de saisie
     const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       setQuery(e.target.value);
     }, []);

     // Mémoïser le tableau filtré
     const filteredItems = useMemo(() => {
       const lower = query.toLowerCase();
       return DATA.filter((it) => it.name.toLowerCase().includes(lower));
     }, [query]);

     return (
       <div style={{ maxWidth: "300px", margin: "auto" }}>
         <input
           type="text"
           placeholder="Rechercher..."
           value={query}
           onChange={handleChange}
           style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
         />
         <ul>
           {filteredItems.map((it) => (
             <ListItem key={it.id} item={it} />
           ))}
         </ul>
       </div>
     );
   };
   ```

2. **Intégrer dans l’application** – `src/app.tsx`  

   ```tsx
   import React from "react";
   import { FilterableList } from "./components/FilterableList";

   export const App: React.FC = () => (
     <div style={{ padding: "20px" }}>
       <h2>Liste filtrable (optimisée)</h2>
       <FilterableList />
     </div>
   );

   export default App;
   ```

3. **Tester**  
   - Lancez l’app (`npm run dev`).  
   - Tapez dans le champ de recherche : la liste doit se réduire en temps réel.  
   - Ouvrez la console : chaque `ListItem` ne doit se re‑render que lorsqu’il apparaît/disparaît, grâce à `React.memo`.  

**Débogage tip**  
Si tous les items se re‑render à chaque frappe :  
- Vérifiez que `ListItem` est bien déclaré avec `React.memo`.  
- Assurez‑vous que `filteredItems` est mémoïsé : le tableau doit être créé uniquement quand `query` change (`useMemo` avec `[query]`).  