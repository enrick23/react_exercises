**Exercice 3 – Test d’intégration d’une navigation avec React Router v6 (exercice 10)**  

*Objectif* : S’assurer que les routes s’affichent correctement, que le composant `User` lit le paramètre d’URL et que la navigation via les liens fonctionne sans rechargement de page.  

**Étapes**  

1. **Composants à tester** – `Home.tsx`, `About.tsx`, `User.tsx` et le routeur dans `app.tsx` (identiques à l’exercice 10).  

2. **Configurer le test** (`src/__tests__/Router.test.tsx`)  

   ```tsx
   import React from "react";
   import { render, screen } from "@testing-library/react";
   import { MemoryRouter, Route, Routes } from "react-router-dom";
   import { Home } from "../pages/Home";
   import { About } from "../pages/About";
   import { User } from "../pages/User";

   // Wrapper minimal qui reproduit le même routing que l’app
   const TestRouter: React.FC<{ initialPath: string }> = ({ initialPath }) => (
     <MemoryRouter initialEntries={[initialPath]}>
       <nav>
         <a href="/">Accueil</a>
         <a href="/about">À propos</a>
         <a href="/user/42">Utilisateur 42</a>
       </nav>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/user/:id" element={<User />} />
       </Routes>
     </MemoryRouter>
   );

   describe("Router integration", () => {
     test("affiche la page d’accueil par défaut", () => {
       render(<TestRouter initialPath="/" />);
       expect(screen.getByText(/🏠 Accueil/i)).toBeInTheDocument();
     });

     test("navigue vers la page À propos", () => {
       render(<TestRouter initialPath="/about" />);
       expect(screen.getByText(/ℹ️ À propos/i)).toBeInTheDocument();
     });

     test("affiche le profil utilisateur avec l’ID correct", () => {
       render(<TestRouter initialPath="/user/99" />);
       expect(screen.getByText(/👤 Profil utilisateur : 99/i)).toBeInTheDocument();
     });

     test("les liens du menu changent de route sans rechargement", () => {
       render(<TestRouter initialPath="/" />);
       const aboutLink = screen.getByText("À propos");
       aboutLink.click(); // fireEvent.click fonctionne aussi, mais click() de RTL suffit

       // Après le clic, la route doit être /about
       expect(screen.getByText(/ℹ️ À propos/i)).toBeInTheDocument();
     });
   });
   ```

3. **Exécuter le test**  

   ```bash
   npx jest src/__tests__/Router.test.tsx
   ```

   Tous les scénarios doivent passer : le routeur rend la bonne page, le paramètre `:id` est correctement injecté, et la navigation via les liens fonctionne en mémoire (sans rechargement du navigateur).