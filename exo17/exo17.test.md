**Exercice 2 – Test d’intégration d’une liste filtrable (exercice 12) avec React Testing Library**

*Objectif* : Vérifier que la recherche filtre correctement les items et que les composants enfants ne sont pas re‑renderés inutilement grâce à `React.memo`.  

**Étapes**  

1. **Composant à tester** (`src/components/FilterableList.tsx`) – (identique à l’exercice 12).  

2. **Écrire le test d’intégration** (`src/__tests__/FilterableList.test.tsx`)  

   ```tsx
   import React from "react";
   import { render, screen, fireEvent } from "@testing-library/react";
   import { FilterableList } from "../components/FilterableList";

   // Spy sur console.log pour détecter les renders des items
   const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

   describe("FilterableList", () => {
     afterAll(() => {
       consoleLogSpy.mockRestore();
     });

     test("affiche tous les items au départ", () => {
       render(<FilterableList />);
       expect(screen.getByText("Pomme")).toBeInTheDocument();
       expect(screen.getByText("Banane")).toBeInTheDocument();
       expect(screen.getByText("Cerise")).toBeInTheDocument();
     });

     test("filtre les items en fonction de la saisie", () => {
       render(<FilterableList />);
       const input = screen.getByPlaceholderText("Rechercher...");

       fireEvent.change(input, { target: { value: "ba" } });
       expect(screen.queryByText("Pomme")).not.toBeInTheDocument();
       expect(screen.getByText("Banane")).toBeInTheDocument();
       expect(screen.queryByText("Cerise")).not.toBeInTheDocument();
     });

     test("ne re‑render pas les items non affectés", () => {
       render(<FilterableList />);
       const input = screen.getByPlaceholderText("Rechercher...");

       // Au premier rendu, chaque item log « Render Item: … »
       expect(consoleLogSpy).toHaveBeenCalledWith("Render Item:", "Pomme");
       expect(consoleLogSpy).toHaveBeenCalledWith("Render Item:", "Banane");
       expect(consoleLogSpy).toHaveBeenCalledWith("Render Item:", "Cerise");

       consoleLogSpy.mockClear();

       // Filtrer pour ne garder que « Banane »
       fireEvent.change(input, { target: { value: "ba" } });

       // Seul « Banane » doit être rendu à nouveau
       expect(consoleLogSpy).toHaveBeenCalledTimes(1);
       expect(consoleLogSpy).toHaveBeenCalledWith("Render Item:", "Banane");
     });
   });
   ```

3. **Exécuter le test**  

   ```bash
   npx jest src/__tests__/FilterableList.test.tsx
   ```

   Tous les tests doivent réussir : la recherche fonctionne et les renders inutiles sont évités grâce à `React.memo` et `useMemo`.  
   
