## Exercice 3 – Props typées et composition de composants

**Concept Brief**  
Créez un composant réutilisable qui reçoit des données via des *props* typées et l’utilise dans un parent.  

**Code Challenge**  

1. Ajoutez un fichier `src/userCard.tsx`.  
2. Déclarez une interface `UserCardProps` contenant :  
   - `name: string`  
   - `age: number`  
   - `avatarUrl?: string` (optionnel)  
3. Implémentez le composant `UserCard` qui affiche :  
   - L’image de l’avatar (si fournie) ; sinon, un placeholder (`https://via.placeholder.com/80`).  
   - Le nom en gras.  
   - L’âge entre parenthèses.  
4. Dans `src/app.tsx`, créez un tableau d’utilisateurs (au moins 3) et mappez‑le pour rendre plusieurs `UserCard`.  

**Starter snippet (`src/userCard.tsx`)** :

```tsx
import React from "react";

export interface UserCardProps {
  name: string;
  age: number;
  avatarUrl?: string;
}

export const UserCard: React.FC<UserCardProps> = ({ name, age, avatarUrl }) => {
  const imgSrc = avatarUrl ?? "https://via.placeholder.com/80";

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px", display: "flex", alignItems: "center" }}>
      <img src={imgSrc} alt={`${name}'s avatar`} width={80} height={80} style={{ marginRight: "12px" }} />
      <div>
        <strong>{name}</strong> <span>({age} ans)</span>
      </div>
    </div>
  );
};
```

**Intégration dans `app.tsx`** (ajoutez après les imports) :

```tsx
import { UserCard } from "./userCard";

const users = [
  { name: "Alice", age: 28, avatarUrl: "https://i.pravatar.cc/80?img=1" },
  { name: "Bob", age: 34 },                     // sans avatar
  { name: "Clara", age: 22, avatarUrl: "https://i.pravatar.cc/80?img=3" },
];

const App: React.FC = () => {
  return (
    <div>
      {users.map((u, idx) => (
        <UserCard key={idx} {...u} />
      ))}
    </div>
  );
};
```

**Débogage tip**  
Si vous obtenez l’erreur `Property 'avatarUrl' does not exist on type ...`, vérifiez que le tableau `users` respecte exactement l’interface `UserCardProps` ; l’optionnel `avatarUrl?` doit être présent ou omis, jamais `null` ou `undefined` sans le point d’interrogation.