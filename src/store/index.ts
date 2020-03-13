import { combineReducers, createStore,compose,applyMiddleware } from 'redux'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { CountReducer } from './reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  count: CountReducer
})

const persistConfig = {
  key: 'root',
  storage:storageSession,
}
// let devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

export type AppState = ReturnType<typeof rootReducer>

declare global{
  interface window{
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers()
)
let persistor = persistStore(store)

export {
  store,
  persistor
}
