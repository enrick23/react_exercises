## Exercice 9 – Gestion d’état global avec Redux Toolkit (TypeScript)

**Concept Brief**  
Utilisez Redux Toolkit pour centraliser l’état d’un compteur partagé entre plusieurs composants.  

**Code Challenge**  

1. **Installer les dépendances**  
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. **Créer le store** – `src/store.ts`  
   ```tsx
   import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

   interface CounterState {
     value: number;
   }

   const initialState: CounterState = { value: 0 };

   const counterSlice = createSlice({
     name: "counter",
     initialState,
     reducers: {
       increment: (state) => { state.value += 1; },
       decrement: (state) => { state.value -= 1; },
       incrementByAmount: (state, action: PayloadAction<number>) => {
         state.value += action.payload;
       },
     },
   });

   export const { increment, decrement, incrementByAmount } = counterSlice.actions;

   export const store = configureStore({
     reducer: {
       counter: counterSlice.reducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

3. **Composant d’affichage** – `src/CounterDisplay.tsx`  
   ```tsx
   import React from "react";
   import { useSelector } from "react-redux";
   import { RootState } from "./store";

   export const CounterDisplay: React.FC = () => {
     const count = useSelector((state: RootState) => state.counter.value);
     return <h2>Valeur du compteur : {count}</h2>;
   };
   ```

4. **Composant de contrôle** – `src/CounterControls.tsx`  
   ```tsx
   import React from "react";
   import { useDispatch } from "react-redux";
   import { increment, decrement, incrementByAmount } from "./store";

   export const CounterControls: React.FC = () => {
     const dispatch = useDispatch();

     return (
       <div>
         <button onClick={() => dispatch(decrement())}>-</button>
         <button onClick={() => dispatch(increment())}>+</button>
         <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
       </div>
     );
   };
   ```

5. **Intégrer le tout** – `src/app.tsx`  
   ```tsx
   import React from "react";
   import { Provider } from "react-redux";
   import { store } from "./store";
   import { CounterDisplay } from "./CounterDisplay";
   import { CounterControls } from "./CounterControls";

   export const App: React.FC = () => (
     <Provider store={store}>
       <div style={{ padding: "20px" }}>
         <CounterDisplay />
         <CounterControls />
       </div>
     </Provider>
   );

   export default App;
   ```

**Débogage tip**  
Si la valeur affichée ne change pas :  
- Vérifiez que les actions sont importées depuis `store.ts`.  
- Assurez‑vous que `CounterDisplay` utilise le bon sélecteur (`state.counter.value`).  