## Exercice 5 – Gestion de formulaire contrôlé avec validation simple

**Concept Brief**  
Créez un formulaire où chaque champ est contrôlé par l’état React, puis validez que le champ « email » contient un « @ ».  

**Code Challenge**  

1. Ajoutez `src/contactForm.tsx`.  
2. Déclarez les états : `name`, `email`, `message` (chaînes) et `error` (chaine vide ou message d’erreur).  
3. Implémentez un formulaire :  
   - `<input>` pour le nom, `<input type="email">` pour l’email, `<textarea>` pour le message.  
   - Chaque champ possède `value={...}` et `onChange={e => setX(e.target.value)}`.  
   - Au `onSubmit`, empêchez le rechargement (`e.preventDefault()`).  
   - Vérifiez que `email.includes("@")`. Si non, mettez `error` à « Email invalide ». Sinon, affichez `alert("Message envoyé")` et réinitialisez les champs.  
4. Remplacez le rendu de `App` par `<ContactForm />`.  

**Starter snippet** :

```tsx
import React, { useState } from "react";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation ici
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      {/* Nom */}
      {/* Email */}
      {/* Message */}
      {/* Bouton submit */}
      {/* Affichage error si présent */}
    </form>
  );
};
```

**Débogage tip**  
Si le formulaire ne rafraîchit pas la page après soumission, assurez‑vous que `e.preventDefault()` est bien appelé ; sinon le navigateur rechargera la page et vous perdrez l’état.  