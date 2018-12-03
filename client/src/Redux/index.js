import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import PersistConfig from '../Config/PersistConfig'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  newPost: require('./NewPostRedux').reducer,
  viewPost: require('./ViewPostRedux').reducer,
  postCategory: require('./PostCategoryRedux').reducer,
  auth: require('./AuthRedux').reducer,
  reportButton: require('./ReportButtonRedux').reducer,
  viewReport: require('./ViewReportRedux').reducer,
  home: require('./HomeRedux').reducer,
  likeButton: require('./LikeButtonRedux').reducer,
  stats: require('./StatsRedux').reducer,
  snackbar: require('./SnackBarRedux').reducer
})

export default () => {
  let finalReducers = reducers
  if (PersistConfig.active) {
    const persistConfig = PersistConfig.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  let persistor = persistStore(store);

  return { store, persistor }
}