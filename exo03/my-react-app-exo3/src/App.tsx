import React from "react";
import { UserCard } from "./userCard";
import ReactDOM from "react-dom/client";

const users = [
  { name: "Koto", age: 28, avatarUrl: "https://i.pravatar.cc/80?img=1" },
  { name: "Bema", age: 34 },
  { name: "Rindra", age: 22, avatarUrl: "https://i.pravatar.cc/80?img=3" },
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);