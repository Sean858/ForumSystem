import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware({ })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  );

  const store = createStore(rootReducer, enhancer)

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}