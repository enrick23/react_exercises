import React from "react";
import { Counter } from "./counter";


   import ReactDOM from "react-dom/client";

   const App: React.FC = () => {
  return <Counter />;
};

   const root = ReactDOM.createRoot(
     document.getElementById("root") as HTMLElement
   );
   root.render(<App />);