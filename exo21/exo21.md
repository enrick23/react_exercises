
## Série de 4 exercices Redux‑Saga

| Objectif | Actions prioritaires | Ressources | Date limite |
|---|---|---|---|
| **Exercice 1 – Flux de base** – Implémenter un saga « fetch‑users » qui récupère les données depuis `https://jsonplaceholder.typicode.com/users` et les stocke dans Redux en **2 heures** à partir du démarrage | 1. Créer une application CRA/Vite 2. Ajouter `@reduxjs/toolkit` + `redux-saga` 3. Créer `usersSlice` avec le réducteur `setUsers` 4. Écrire un saga qui écoute `FETCH_USERS_REQUEST`, effectue le `fetch`, déclenche `setUsers` en cas de succès et `FETCH_USERS_FAILURE` en cas d’erreur 5. Brancher le middleware saga et déclencher la requête depuis un bouton | Docs officielles de Redux‑Saga ([Getting Started](https://redux-saga.js.org/docs/introduction/GettingStarted)), docs de Redux Toolkit, guide MDN `fetch` | 2 h après le lancement |
| **Exercice 2 – Effets parallèles & race** – Construire un saga qui charge en parallèle « posts » et « comments », mais annule les deux si une action `CANCEL_LOAD` est dispatchée, en **3 heures** | 1. Ajouter `postsSlice` & `commentsSlice` 2. Écrire un saga utilisant `all` pour lancer `fetchPosts` et `fetchComments` simultanément 3. Utiliser `race` avec `take(CANCEL_LOAD)` pour annuler les deux appels 4. Dispatch `CANCEL_LOAD` depuis l’UI pour tester l’annulation 5. Vérifier que l’état reste inchangé en cas d’annulation | [Sections](https://redux-saga.js.org/docs/api#effect-combinators) `all`, `race`, `cancel` de Redux‑Saga  | 3 h après le début de l’exercice 2 |
| **Exercice 3 – Flux complexe avec retries & back‑off exponentiel** – Créer un saga qui tente d’ajouter un commentaire via `https://jsonplaceholder.typicode.com/comments` ; en cas d’échec, il réessaye jusqu’à 3 fois avec des délais de 1 s, 2 s et 4 s, puis déclenche `POST_COMMENT_FAILURE` si tous les essais échouent, le tout en **4 heures** | 1. Ajouter `addComment` dans `commentsSlice` 2. Écrire un saga qui écoute `POST_COMMENT_REQUEST` 3. Utiliser l’effet `retry` (ou une boucle manuelle avec `delay`) pour implémenter le back‑off exponentiel 4. Dispatch les actions de succès ou d’échec selon le résultat 5. Tester en forçant des erreurs réseau (ex. : mode « offline » dans les devtools Chrome) | Docs Redux‑Saga `retry`, `delay` ; article « Exponential back‑off with redux‑saga » (freeCodeCamp) | 4 h après le début de l’exercice 3 |
| **Exercice 4 – Tests unitaires avec Jest** – Couvrir à 90 % les sagas des exercices 1‑3 avec des tests Jest + Redux‑Saga‑Test‑Utils en **3 heures** | 1. Installer `jest`, `@testing-library/react`, `redux-saga-test-plan` 2. Créer un fichier `sagas.test.js` 3. Mock le `fetch`/`axios` avec `jest.fn()` ou `msw` 4. Utiliser `expectSaga` pour vérifier que le saga dispatch les actions attendues (succès, échec, cancel, retries) 5. Ajouter un script npm `test:coverage` et vérifier que la couverture atteint ≥ 90 % | Jest docs, [Redux‑Saga‑Test‑Plan guide](https://redux-saga.js.org/docs/advanced/Testing), article « Testing Redux‑Saga with Jest » (medium) | 3 h après le lancement de l’exercice 4 |


### Exemple de test pour l’Exercice 1 (Jest + redux‑saga‑test‑plan)

```javascript
// sagas.test.js
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { fetchUsersSaga } from './sagas';
import { setUsers, fetchUsersFailure } from './usersSlice';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Leanne Graham' }]),
  })
);

test('fetchUsersSaga dispatches setUsers on success', async () => {
  await expectSaga(fetchUsersSaga)
    .put(setUsers([{ id: 1, name: 'Leanne Graham' }]))
    .run();
});

test('fetchUsersSaga dispatches fetchUsersFailure on error', async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

  await expectSaga(fetchUsersSaga)
    .put(fetchUsersFailure('Network error'))
    .run();
});
```
