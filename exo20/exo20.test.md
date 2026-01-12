**Exercice 4 – Test d’intégration d’un composant de pagination (exercice 15) avec React Testing Library**

*Objectif* : S’assurer que le composant `Paginator` (pattern render‑props) calcule correctement le nombre de pages, que les boutons **Précédent / Suivant** fonctionnent et que le rendu fourni par le render‑prop s’actualise correctement.  

---  

### 1️⃣ Composant à tester (déjà existant)

```tsx
// src/components/Paginator.tsx
import React, { useState, useCallback } from "react";

interface PaginatorProps<T> {
  items: T[];
  pageSize: number;
  children: (params: {
    currentItems: T[];
    currentPage: number;
    totalPages: number;
    next: () => void;
    prev: () => void;
    goTo: (page: number) => void;
  }) => React.ReactNode;
}

export function Paginator<T>({ items, pageSize, children }: PaginatorProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const currentItems = items.slice(startIdx, startIdx + pageSize);

  const next = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const goTo = useCallback(
    (page: number) => {
      const p = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(p);
    },
    [totalPages]
  );

  return (
    <>
      {children({ currentItems, currentPage, totalPages, next, prev, goTo })}
    </>
  );
}
```

### 2️⃣ Page d’exemple qui utilise le paginator (déjà existante)

```tsx
// src/pages/PostsPage.tsx
import React from "react";
import { Paginator } from "../components/Paginator";

interface Post {
  id: number;
  title: string;
}

const POSTS: Post[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `Post n°${i + 1}`,
}));

export const PostsPage: React.FC = () => (
  <Paginator items={POSTS} pageSize={5}>
    {({ currentItems, currentPage, totalPages, next, prev, goTo }) => (
      <div>
        <h2>
          Liste des posts (page {currentPage}/{totalPages})
        </h2>
        <ul>
          {currentItems.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>

        <div style={{ marginTop: "12px" }}>
          <button onClick={prev} disabled={currentPage === 1}>
            ← Précédent
          </button>
          <button
            onClick={next}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "8px" }}
          >
            Suivant →
          </button>
        </div>

        <div style={{ marginTop: "8px" }}>
          Aller à la page :
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx + 1)}
              style={{
                marginLeft: "4px",
                fontWeight: currentPage === idx + 1 ? "bold" : "normal",
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    )}
  </Paginator>
);
```

### 3️⃣ Tests d’intégration (`src/__tests__/Paginator.test.tsx`)

```tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostsPage } from "../pages/PostsPage";

describe("Paginator integration", () => {
  test("affiche la première page et le nombre total de pages", () => {
    render(<PostsPage />);
    expect(screen.getByText(/page 1\/5/i)).toBeInTheDocument();

    // Les 5 premiers posts doivent être visibles
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`Post n°${i}`)).toBeInTheDocument();
    }
    // Le 6ᵉ post ne doit pas être présent
    expect(screen.queryByText("Post n°6")).not.toBeInTheDocument();
  });

  test("les boutons Précédent / Suivant naviguent correctement", () => {
    render(<PostsPage />);

    const nextBtn = screen.getByRole("button", { name: /suivant/i });
    const prevBtn = screen.getByRole("button", { name: /précédent/i });

    // Au départ, le bouton Précédent est désactivé
    expect(prevBtn).toBeDisabled();

    // Aller à la page 2
    fireEvent.click(nextBtn);
    expect(screen.getByText(/page 2\/5/i)).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();

    // Vérifier que les posts 6‑10 sont affichés
    for (let i = 6; i <= 10; i++) {
      expect(screen.getByText(`Post n°${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText("Post n°5")).not.toBeInTheDocument();

    // Retour à la page 1
    fireEvent.click(prevBtn);
    expect(screen.getByText(/page 1\/5/i)).toBeInTheDocument();
  });

  test("le saut direct via les numéros de page fonctionne", () => {
    render(<PostsPage />);

    // Cliquer sur le bouton « 4 »
    const page4Btn = screen.getByRole("button", { name: "4" });
    fireEvent.click(page4Btn);

    expect(screen.getByText(/page 4\/5/i)).toBeInTheDocument();

    // Page 4 doit contenir les posts 16‑20
    for (let i = 16; i <= 20; i++) {
      expect(screen.getByText(`Post n°${i}`)).toBeInTheDocument();
    }
    // Un post hors de la page ne doit pas apparaître
    expect(screen.queryByText("Post n°15")).not.toBeInTheDocument();
  });

  test("le bouton Suivant est désactivé sur la dernière page", () => {
    render(<PostsPage />);

    const nextBtn = screen.getByRole("button", { name: /suivant/i });

    // Aller jusqu’à la dernière page (5)
    for (let i = 0; i < 4; i++) fireEvent.click(nextBtn);

    expect(screen.getByText(/page 5\/5/i)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
  });
});
```

### 4️⃣ Exécution des tests

```bash
npx jest src/__tests__/Paginator.test.tsx
```

Tous les scénarios doivent réussir : le paginator calcule correctement le nombre de pages, les contrôles de navigation fonctionnent, le rendu fourni par le render‑prop se met à jour et les boutons sont correctement désactivés aux limites.  