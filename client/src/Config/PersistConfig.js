import storage from 'redux-persist/lib/storage'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: storage,
    transforms: [immutablePersistenceTransform],
    blacklist: ['post', 'viewReport', 'viewPost', 'newPost', 'reportButton', 'reportButton', 'home', 'likeButton', 'stats'],
  }
}

export default REDUX_PERSIST