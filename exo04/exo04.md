## Exercice 4 – Effet secondaire avec le Hook `useEffect` (appel API simulé)

**Concept Brief**  
Utilisez `useEffect` pour charger des données au montage du composant et les afficher.  

**Code Challenge**  

1. Créez `src/fetchPosts.tsx`.  
2. Simulez une requête API en retournant, après 1 s, un tableau d’objets `Post` : `{ id: number; title: string; body: string }`.  
3. Dans le composant `PostList`, :  
   - Déclarez un état `posts` (initialement vide).  
   - Lancez `useEffect` : au premier rendu, appelez la fonction simulée, puis mettez à jour l’état.  
   - Affichez chaque post sous forme de carte (titre en `<h3>`, corps en `<p>`).  
4. Remplacez le rendu de `App` par `<PostList />`.  

**Starter snippet (`src/fetchPosts.tsx`)** :

```tsx
import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Simule un appel réseau
function fetchPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Premier post", body: "Contenu du premier post." },
        { id: 2, title: "Deuxième post", body: "Contenu du deuxième post." },
        { id: 3, title: "Troisième post", body: "Contenu du troisième post." },
      ]);
    }, 1000);
  });
}

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Votre appel ici
    // setPosts(...);
  }, []);

  return (
    <div>
      {/* Affichez les posts ici */}
    </div>
  );
};
```

**Intégration dans `app.tsx`** :

```tsx
import { PostList } from "./fetchPosts";

const App: React.FC = () => {
  return <PostList />;
};
```

**Débogage tip**  
Si la liste reste vide, vérifiez :  
- Que `fetchPosts()` est bien appelé dans le `useEffect`.  
- Que vous avez bien passé la fonction de mise à jour : `setPosts(data)` dans le `then`.  
- Que le tableau de dépendances du `useEffect` est `[]` (exécution unique).  