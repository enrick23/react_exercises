## Exercice 1 – Créer une application React + TypeScript « vanilla » (sans outil de scaffolding)

**Concept Brief**  
Mettez en place, à la main, un petit projet React avec TypeScript : compilez le code TypeScript, chargez React et React‑DOM depuis un CDN, puis affichez « Bonjour ! ».  

**Code Challenge**  

1. **Structure des dossiers**  
   ```
   my-react-app/
   ├─ index.html
   ├─ src/
   │   └─ app.tsx
   └─ tsconfig.json
   ```

2. **`tsconfig.json`** (configuration minimale)  

   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "ESNext",
       "jsx": "react-jsx",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "outDir": "./dist"
     },
     "include": ["src"]
   }
   ```

3. **`index.html`** – charge les CDN et le script compilé  

   ```html
   <!DOCTYPE html>
   <html lang="fr">
   <head>
     <meta charset="UTF-8" />
     <title>React + TS sans framework</title>
     <!-- React & React‑DOM (UMD) -->
     <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
     <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   </head>
   <body>
     <div id="root"></div>

     <!-- Le fichier JavaScript généré par tsc -->
     <script type="module" src="./dist/app.js"></script>
   </body>
   </html>
   ```

4. **`src/app.tsx`** – composant simple  

   ```tsx
   import React from "react";
   import ReactDOM from "react-dom/client";

   const App: React.FC = () => {
     return <h1>Bonjour !</h1>;
   };

   const root = ReactDOM.createRoot(
     document.getElementById("root") as HTMLElement
   );
   root.render(<App />);
   ```

5. **Compiler**  
   ```bash
   npx tsc
   ```
   Cette commande lit `tsconfig.json`, compile `src/app.tsx` en `dist/app.js`.

6. **Tester**  
   Ouvrez `index.html` dans le navigateur (vous pouvez lancer un serveur simple : `npx serve .` ou `python -m http.server`). Vous devez voir le texte **Bonjour !**.

**Débogage tip**  
Si le texte n’apparaît pas, ouvrez la console du navigateur :  
- Vérifiez qu’il n’y a pas d’erreur « Cannot find module 'react' » ; cela signifie que le fichier `dist/app.js` n’a pas été chargé (chemin incorrect).  
- Assurez‑vous que le script `<script type="module">` pointe bien vers `./dist/app.js`.