## Exercice 15 – Pattern Render Props pour un composant de pagination réutilisable

**Concept Brief**  
Implémentez un composant `Paginator` qui gère la logique de pagination (calcul des pages, navigation) et expose son UI via le pattern **render props**. Le consommateur décide comment afficher les contrôles tout en profitant de la logique partagée.  

**Code Challenge**  

1. **Créer le composant `Paginator`** – `src/components/Paginator.tsx`  

   ```tsx
   import React, { useState, useCallback } from "react";

   interface PaginatorProps<T> {
     /** Tableau complet de données à paginer */
     items: T[];
     /** Nombre d’items par page */
     pageSize: number;
     /** Fonction de rendu (render prop) */
     children: (params: {
       /** Items de la page courante */
       currentItems: T[];
       /** Numéro de page (1‑based) */
       currentPage: number;
       /** Total de pages */
       totalPages: number;
       /** Aller à la page suivante */
       next: () => void;
       /** Aller à la page précédente */
       prev: () => void;
       /** Aller à une page précise */
       goTo: (page: number) => void;
     }) => React.ReactNode;
   }

   export function Paginator<T>({ items, pageSize, children }: PaginatorProps<T>) {
     const [currentPage, setCurrentPage] = useState(1);
     const totalPages = Math.ceil(items.length / pageSize);

     const startIdx = (currentPage - 1) * pageSize;
     const currentItems = items.slice(startIdx, startIdx + pageSize);

     const next = useCallback(() => {
       setCurrentPage((p) => Math.min(p + 1, totalPages));
     }, [totalPages]);

     const prev = useCallback(() => {
       setCurrentPage((p) => Math.max(p - 1, 1));
     }, []);

     const goTo = useCallback((page: number) => {
       const p = Math.max(1, Math.min(page, totalPages));
       setCurrentPage(p);
     }, [totalPages]);

     return <>{children({ currentItems, currentPage, totalPages, next, prev, goTo })}</>;
   }
   ```

2. **Utiliser le `Paginator`** – créer une page d’exemple `src/pages/PostsPage.tsx`  

   ```tsx
   import React from "react";
   import { Paginator } from "../components/Paginator";

   interface Post {
     id: number;
     title: string;
   }

   // Données factices
   const POSTS: Post[] = Array.from({ length: 23 }, (_, i) => ({
     id: i + 1,
     title: `Post n°${i + 1}`,
   }));

   export const PostsPage: React.FC = () => (
     <Paginator items={POSTS} pageSize={5}>
       {({ currentItems, currentPage, totalPages, next, prev, goTo }) => (
         <div>
           <h2>Liste des posts (page {currentPage}/{totalPages})</h2>
           <ul>
             {currentItems.map((p) => (
               <li key={p.id}>{p.title}</li>
             ))}
           </ul>

           {/* Contrôles de navigation */}
           <div style={{ marginTop: "12px" }}>
             <button onClick={prev} disabled={currentPage === 1}>
               ← Précédent
             </button>
             <button onClick={next} disabled={currentPage === totalPages} style={{ marginLeft: "8px" }}>
               Suivant →
             </button>
           </div>

           {/* Saut direct vers une page */}
           <div style={{ marginTop: "8px" }}>
             Aller à la page :
             {[...Array(totalPages)].map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => goTo(idx + 1)}
                 style={{
                   marginLeft: "4px",
                   fontWeight: currentPage === idx + 1 ? "bold" : "normal",
                 }}
               >
                 {idx + 1}
               </button>
             ))}
           </div>
         </div>
       )}
     </Paginator>
   );
   ```

3. **Brancher la page dans l’app** – `src/app.tsx`  

   ```tsx
   import React from "react";
   import { PostsPage } from "./pages/PostsPage";

   export const App: React.FC = () => (
     <div style={{ padding: "20px" }}>
       <PostsPage />
     </div>
   );

   export default App;
   ```

4. **Tester**  
   - Lancez l’application (`npm run dev`).  
   - Vous devez voir 5 posts affichés, avec les boutons **Précédent**, **Suivant** et les numéros de page.  
   - Naviguez entre les pages ; le composant `Paginator` gère toute la logique, tandis que le rendu est entièrement contrôlé par le render‑prop.  

**Débogage tip**  
Si le bouton **Suivant** reste actif même à la dernière page, vérifiez :  
- Que `totalPages` est correctement calculé (`Math.ceil(items.length / pageSize)`).  
- Que la fonction `next` utilise `Math.min(p + 1, totalPages)` pour ne pas dépasser la limite.  