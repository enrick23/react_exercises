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
    fetchPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>Chargement des posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "12px" }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};
