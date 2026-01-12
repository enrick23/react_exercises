## Exercice 13 – Tests unitaires avec Jest et React Testing Library

**Concept Brief**  
Écrivez des tests automatisés pour le composant `Counter` (exercice 2) afin de vérifier son rendu initial et le comportement des boutons d’incrément/décrément.  

**Code Challenge**  

1. **Installer les dépendances de test**  

   ```bash
   npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
   ```

2. **Configurer Jest** – créez `jest.config.js` à la racine  

   ```js
   /** @type {import('ts-jest').JestConfigWithTsJest} */
   module.exports = {
     preset: "ts-jest",
     testEnvironment: "jsdom",
     moduleNameMapper: {
       "^.+\\.(css|scss)$": "identity-obj-proxy",
     },
     setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
   };
   ```

   **`jest.setup.ts`**  

   ```ts
   import "@testing-library/jest-dom";
   ```

3. **Créer le test** – `src/__tests__/Counter.test.tsx`  

   ```tsx
   import React from "react";
   import { render, screen, fireEvent } from "@testing-library/react";
   import { Counter } from "../counter";

   describe("Counter component", () => {
     test("affiche 0 au montage", () => {
       render(<Counter />);
       expect(screen.getByText(/Compteur :/i)).toHaveTextContent("Compteur : 0");
     });

     test("incrémente le compteur lorsqu’on clique sur +", () => {
       render(<Counter />);
       const incBtn = screen.getByRole("button", { name: "+" });
       fireEvent.click(incBtn);
       expect(screen.getByText(/Compteur :/i)).toHaveTextContent("Compteur : 1");
     });

     test("décrémente le compteur lorsqu’on clique sur -", () => {
       render(<Counter />);
       const decBtn = screen.getByRole("button", { name: "-" });
       // d’abord incrémenter pour éviter le passage en négatif
       fireEvent.click(screen.getByRole("button", { name: "+" }));
       fireEvent.click(decBtn);
       expect(screen.getByText(/Compteur :/i)).toHaveTextContent("Compteur : 0");
     });
   });
   ```

4. **Exécuter les tests**  

   ```bash
   npx jest
   ```

   Vous devez voir les trois tests passer.  

**Débogage tip**  
Si `screen.getByRole` ne trouve pas les boutons, assurez‑vous que les éléments `<button>` contiennent exactement le texte « + » et « - ». Vous pouvez aussi ajouter `aria-label` aux boutons et les cibler avec `getByLabelText`.