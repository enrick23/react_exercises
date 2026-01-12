## Exercice 10 – Navigation avec React Router v6 (TypeScript)

**Concept Brief**  
Ajoutez une navigation à plusieurs pages (Accueil, À propos, Détails d’un utilisateur) en utilisant React Router v6.  

**Code Challenge**  

1. **Installer la dépendance**  
   ```bash
   npm install react-router-dom@6
   ```

2. **Créer les pages**  

   *`src/pages/Home.tsx`*  
   ```tsx
   import React from "react";

   export const Home: React.FC = () => <h2>🏠 Accueil</h2>;
   ```

   *`src/pages/About.tsx`*  
   ```tsx
   import React from "react";

   export const About: React.FC = () => <h2>ℹ️ À propos</h2>;
   ```

   *`src/pages/User.tsx`* – lit le paramètre d’URL `:id`  
   ```tsx
   import React from "react";
   import { useParams } from "react-router-dom";

   export const User: React.FC = () => {
     const { id } = useParams<{ id: string }>();
     return <h2>👤 Profil utilisateur : {id}</h2>;
   };
   ```

3. **Configurer le routeur** – `src/app.tsx`  

   ```tsx
   import React from "react";
   import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
   import { Home } from "./pages/Home";
   import { About } from "./pages/About";
   import { User } from "./pages/User";

   export const App: React.FC = () => (
     <BrowserRouter>
       {/* Menu de navigation */}
       <nav style={{ marginBottom: "16px" }}>
         <NavLink to="/" end style={{ marginRight: "12px" }}>
           Accueil
         </NavLink>
         <NavLink to="/about" style={{ marginRight: "12px" }}>
           À propos
         </NavLink>
         {/* Exemple d’accès à un utilisateur avec id 42 */}
         <NavLink to="/user/42">Utilisateur 42</NavLink>
       </nav>

       {/* Définition des routes */}
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/user/:id" element={<User />} />
       </Routes>
     </BrowserRouter>
   );

   export default App;
   ```

4. **Tester**  
   - Lancez l’application (`npm run dev`).  
   - Cliquez sur les liens du menu : chaque page doit s’afficher sans rechargement complet.  
   - Modifiez l’URL manuellement (ex. `/user/7`) et vérifiez que le composant `User` montre bien l’ID correspondant.  

**Débogage tip**  
Si le composant `User` ne reçoit pas l’`id` :  
- Vérifiez que la route est exactement `/user/:id`.  
- Assurez‑vous d’utiliser `useParams<{ id: string }>()` avec le même nom de paramètre (`id`).  
- Le `<NavLink>` doit inclure un ID réel (ex. `/user/42`).  