import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middlewares = [thunk]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'category', 'sub']
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  ),
);

export const persistor = persistStore(store);
export default store;
