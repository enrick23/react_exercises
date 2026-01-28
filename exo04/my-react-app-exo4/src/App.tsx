import React from "react";
import { PostList } from "./fetchPosts";
import ReactDOM from "react-dom/client";

const App: React.FC = () => {
  return <PostList />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
