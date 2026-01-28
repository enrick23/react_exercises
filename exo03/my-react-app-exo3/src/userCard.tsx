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
        <strong>{name}</strong> <span>({age} ans)</span>
      </div>
    </div>
  );
};
