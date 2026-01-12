**Exercice 1 – Test unitaire d’un composant de formulaire simple**

*Objectif* : Vérifier que le formulaire rend correctement les champs, accepte la saisie et appelle la fonction `onSubmit` avec les valeurs attendues.  

**Étapes**  

1. **Composant à tester** (`src/components/SimpleForm.tsx`)  

   ```tsx
   import React, { useState } from "react";

   interface SimpleFormProps {
     onSubmit: (data: { name: string; email: string }) => void;
   }

   export const SimpleForm: React.FC<SimpleFormProps> = ({ onSubmit }) => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       onSubmit({ name, email });
     };

     return (
       <form onSubmit={handleSubmit}>
         <label>
           Nom :
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="John Doe"
           />
         </label>
         <br />
         <label>
           Email :
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="john@example.com"
           />
         </label>
         <br />
         <button type="submit">Envoyer</button>
       </form>
     );
   };
   ```

2. **Écrire le test** (`src/__tests__/SimpleForm.test.tsx`)  

   ```tsx
   import React from "react";
   import { render, screen, fireEvent } from "@testing-library/react";
   import { SimpleForm } from "../components/SimpleForm";

   describe("SimpleForm", () => {
     test("soumet les valeurs saisies", () => {
       const mockSubmit = jest.fn();
       render(<SimpleForm onSubmit={mockSubmit} />);

       // Saisir le nom
       fireEvent.change(screen.getByPlaceholderText("John Doe"), {
         target: { value: "Alice" },
       });

       // Saisir l'email
       fireEvent.change(screen.getByPlaceholderText("john@example.com"), {
         target: { value: "alice@example.com" },
       });

       // Soumettre le formulaire
       fireEvent.click(screen.getByRole("button", { name: /envoyer/i }));

       expect(mockSubmit).toHaveBeenCalledTimes(1);
       expect(mockSubmit).toHaveBeenCalledWith({
         name: "Alice",
         email: "alice@example.com",
       });
     });
   });
   ```

3. **Exécuter le test**  

   ```bash
   npx jest src/__tests__/SimpleForm.test.tsx
   ```

   Le test doit passer, confirmant que le composant gère correctement la saisie et la soumission.  