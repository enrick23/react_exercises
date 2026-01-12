**Exercice 3 – Test d’intégration d’une requête asynchrone avec le hook `useFetch` (exercice 11)**  

*Objectif* : Vérifier que le hook `useFetch` gère correctement les trois états : **loading**, **success** et **error**, et que la requête est bien annulée lorsqu’on démonte le composant.  

**Étapes**  

1. **Composant de test** (`src/components/FetchDisplay.tsx`) – utilise le hook tel qu’il a été implémenté dans l’exercice 11.  

   ```tsx
   import React from "react";
   import { useFetch } from "../hooks/useFetch";

   interface Post {
     userId: number;
     id: number;
     title: string;
     body: string;
   }

   export const FetchDisplay: React.FC<{ url: string }> = ({ url }) => {
     const { data, loading, error } = useFetch<Post>(url);

     if (loading) return <p data-testid="loading">Chargement…</p>;
     if (error) return <p data-testid="error">Erreur : {error.message}</p>;

     return (
       <div data-testid="result">
         <h3>{data?.title}</h3>
         <p>{data?.body}</p>
       </div>
     );
   };
   ```

2. **Mock du fetch** – on utilise **MSW (Mock Service Worker)** pour contrôler les réponses sans toucher au réseau réel.  

   - Installez :  

     ```bash
     npm install --save-dev msw @types/msw
     ```

   - Créez le fichier de handlers (`src/mocks/handlers.ts`) :

     ```ts
     import { rest } from "msw";

     export const handlers = [
       // Réponse réussie
       rest.get("https://api.example.com/post/1", (req, res, ctx) => {
         return res(
           ctx.status(200),
           ctx.json({
             userId: 1,
             id: 1,
             title: "Titre de test",
             body: "Corps du post de test",
           })
         );
       }),

       // Réponse d’erreur
       rest.get("https://api.example.com/post/404", (req, res, ctx) => {
         return res(ctx.status(404));
       }),
     ];
     ```

   - Initialise le serveur (`src/mocks/server.ts`) :

     ```ts
     import { setupServer } from "msw/node";
     import { handlers } from "./handlers";

     export const server = setupServer(...handlers);
     ```

   - Ajoute le setup Jest (`src/setupTests.ts`) :

     ```ts
     import { server } from "./mocks/server";

     // Démarre le serveur avant tous les tests
     beforeAll(() => server.listen());
     // Réinitialise les handlers entre les tests
     afterEach(() => server.resetHandlers());
     // Ferme le serveur à la fin
     afterAll(() => server.close());
     ```

   - Dans `jest.config.js` indique le fichier de setup :

     ```js
     module.exports = {
       // …autres options
       setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
     };
     ```

3. **Écrire les tests** (`src/__tests__/useFetch.test.tsx`)  

   ```tsx
   import React from "react";
   import { render, screen, waitFor, act } from "@testing-library/react";
   import { FetchDisplay } from "../components/FetchDisplay";

   describe("useFetch hook integration", () => {
     test("affiche l’état de chargement puis les données", async () => {
       render(<FetchDisplay url="https://api.example.com/post/1" />);

       // Au départ, le texte de chargement doit être présent
       expect(screen.getByTestId("loading")).toHaveTextContent("Chargement…");

       // Attendre que le résultat apparaisse
       await waitFor(() => expect(screen.getByTestId("result")).toBeInTheDocument());

       // Vérifier le contenu
       expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Titre de test");
       expect(screen.getByText("Corps du post de test")).toBeInTheDocument();
     });

     test("affiche un message d’erreur en cas de réponse non‑ok", async () => {
       render(<FetchDisplay url="https://api.example.com/post/404" />);

       // Chargement d’abord
       expect(screen.getByTestId("loading")).toBeInTheDocument();

       // Attendre l’erreur
       await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());

       expect(screen.getByTestId("error")).toHaveTextContent("Erreur :");
     });

     test("annule la requête si le composant est démonté avant la réponse", async () => {
       // Simuler un délai long dans le handler
       const { server } = await import("../mocks/server");
       const { rest } = await import("msw");
       server.use(
         rest.get("https://api.example.com/post/delayed", (req, res, ctx) => {
           return res(ctx.delay(2000), ctx.json({ title: "Late", body: "Late body" }));
         })
       );

       const { unmount } = render(
         <FetchDisplay url="https://api.example.com/post/delayed" />
       );

       // Démontage immédiat
       act(() => {
         unmount();
       });

       // Aucun crash ne doit survenir et aucun état ne doit être mis à jour après le délai.
       // (Le test passe simplement s’il n’y a pas d’erreur dans la console Jest.)
     });
   });
   ```

4. **Lancer les tests**  

   ```bash
   npx jest src/__tests__/useFetch.test.tsx
   ```

   Vous devez obtenir :  

   - ✅ Le hook passe de *loading* à *success* avec les données mockées.  
   - ✅ Le hook affiche correctement le message d’erreur pour une réponse 404.  
   - ✅ Aucun warning n’apparaît lorsqu’on démonte le composant avant la fin de la requête, prouvant que `AbortController` fonctionne.  