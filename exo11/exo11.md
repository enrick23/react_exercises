## Exercice 11 – Hook personnalisé : `useFetch` avec gestion du chargement, des erreurs et annulation

**Concept Brief**  
Créez un hook réutilisable qui effectue une requête `fetch`, expose les états `data`, `loading` et `error`, et annule la requête si le composant se démonte.  

**Code Challenge**  

1. **Créer le hook** – `src/hooks/useFetch.ts`  

   ```tsx
   import { useEffect, useState } from "react";

   /** Hook générique pour récupérer des données */
   export function useFetch<T>(url: string) {
     const [data, setData] = useState<T | null>(null);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<Error | null>(null);

     useEffect(() => {
       const controller = new AbortController();
       const signal = controller.signal;

       async function fetchData() {
         try {
           const response = await fetch(url, { signal });
           if (!response.ok) {
             throw new Error(`HTTP ${response.status}`);
           }
           const json = (await response.json()) as T;
           setData(json);
         } catch (err) {
           // Ignorer l’erreur d’annulation
           if (err instanceof DOMException && err.name === "AbortError") return;
           setError(err as Error);
         } finally {
           setLoading(false);
         }
       }

       fetchData();

       // Nettoyage : annuler la requête si le composant se démonte
       return () => controller.abort();
     }, [url]);

     return { data, loading, error };
   }
   ```

2. **Tester le hook** – `src/components/PostFetcher.tsx`  

   ```tsx
   import React from "react";
   import { useFetch } from "../hooks/useFetch";

   interface Post {
     userId: number;
     id: number;
     title: string;
     body: string;
   }

   export const PostFetcher: React.FC = () => {
     const { data, loading, error } = useFetch<Post>(
       "https://jsonplaceholder.typicode.com/posts/1"
     );

     if (loading) return <p>Chargement…</p>;
     if (error) return <p>Erreur : {error.message}</p>;

     return (
       <div>
         <h3>{data?.title}</h3>
         <p>{data?.body}</p>
       </div>
     );
   };
   ```

3. **Intégrer dans l’application** – `src/app.tsx`  

   ```tsx
   import React from "react";
   import { PostFetcher } from "./components/PostFetcher";

   export const App: React.FC = () => (
     <div style={{ padding: "20px" }}>
       <h2>Exemple de useFetch</h2>
       <PostFetcher />
     </div>
   );

   export default App;
   ```

4. **Vérifier le comportement**  
   - Lancez l’app (`npm run dev`).  
   - Vous devez voir « Chargement… », puis le titre et le corps du post.  
   - Ouvrez la console et rafraîchissez rapidement : le hook doit annuler la requête précédente sans générer d’erreur.

**Débogage tip**  
Si vous obtenez `Error: AbortError` dans la console, assurez‑vous que le `return () => controller.abort();` est bien présent dans le `useEffect` ; sinon la requête n’est pas annulée et l’erreur apparaît même après le démontage.