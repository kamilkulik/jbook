import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { loadState } from './localStorage';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const enhancer = composeEnhancers(applyMiddleware(persistMiddleware, thunk));

// const persistedState = loadState();

const store = () => createStore(reducers, /** persistedState , **/ enhancer);

export default store;
