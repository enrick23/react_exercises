## Exercice 14 – Internationalisation (i18n) avec react‑i18next

**Concept Brief**  
Intégrez la bibliothèque react‑i18next pour afficher l’interface en français et en anglais, en permettant à l’utilisateur de changer de langue à la volée.  

**Code Challenge**  

1. **Installer les paquets**  

   ```bash
   npm install i18next react-i18next i18next-browser-languagedetector
   ```

2. **Configurer i18n** – créez `src/i18n.ts`  

   ```tsx
   import i18n from "i18next";
   import { initReactI18next } from "react-i18next";
   import LanguageDetector from "i18next-browser-languagedetector";

   const resources = {
     fr: {
       translation: {
         welcome: "Bienvenue sur notre application",
         counter: "Compteur : {{count}}",
         increment: "Incrémenter",
         decrement: "Décrémenter",
         changeLang: "Changer de langue",
       },
     },
     en: {
       translation: {
         welcome: "Welcome to our app",
         counter: "Counter: {{count}}",
         increment: "Increment",
         decrement: "Decrement",
         changeLang: "Change language",
       },
     },
   };

   i18n
     .use(LanguageDetector) // détecte la langue du navigateur
     .use(initReactI18next)
     .init({
       resources,
       fallbackLng: "fr",
       interpolation: { escapeValue: false },
     });

   export default i18n;
   ```

3. **Créer un composant compteur internationalisé** – `src/components/I18nCounter.tsx`  

   ```tsx
   import React, { useState } from "react";
   import { useTranslation } from "react-i18next";

   export const I18nCounter: React.FC = () => {
     const { t, i18n } = useTranslation();
     const [count, setCount] = useState(0);

     const toggleLang = () => {
       const newLang = i18n.language === "fr" ? "en" : "fr";
       i18n.changeLanguage(newLang);
     };

     return (
       <div style={{ textAlign: "center", marginTop: "20px" }}>
         <h2>{t("welcome")}</h2>
         <p>{t("counter", { count })}</p>
         <button onClick={() => setCount((c) => c - 1)}>{t("decrement")}</button>
         <button onClick={() => setCount((c) => c + 1)}>{t("increment")}</button>
         <br />
         <button onClick={toggleLang} style={{ marginTop: "12px" }}>
           {t("changeLang")}
         </button>
       </div>
     );
   };
   ```

4. **Initialiser i18n dans l’application** – modifiez `src/app.tsx`  

   ```tsx
   import React from "react";
   import "./i18n"; // charge la configuration
   import { I18nCounter } from "./components/I18nCounter";

   export const App: React.FC = () => (
     <div style={{ padding: "20px" }}>
       <I18nCounter />
     </div>
   );

   export default App;
   ```

5. **Tester**  
   - Lancez l’app (`npm run dev`).  
   - Le texte doit s’afficher en français par défaut.  
   - Cliquez sur **« Changer de langue »** ; le texte passe en anglais.  
   - Les boutons continuent de fonctionner et les traductions sont mises à jour dynamiquement.  

**Débogage tip**  
Si le texte ne change pas après `i18n.changeLanguage`, assurez‑vous :  
- D’avoir importé `./i18n` au moins une fois (dans `app.tsx`).  
- Que les clés de traduction (`welcome`, `counter`, …) existent dans les deux objets de langue.  