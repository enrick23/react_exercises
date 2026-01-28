import React from "react";
import { ContactForm } from "./contactForm";
import ReactDOM from "react-dom/client";

const App: React.FC = () => {
  return <ContactForm />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
