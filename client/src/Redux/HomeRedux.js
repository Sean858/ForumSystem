
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postsFetch: null,
  postsSuccess: ['posts'],
  postsError: ['message']
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  posts: [],
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const HomeSelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const postsFetch = (state, action) =>
  state.merge({ waiting: true, error: null })

export const postsSuccess = (state, {posts}) => {
  return state.merge({ waiting: false, posts: posts })
}

export const postsError = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POSTS_FETCH]: postsFetch,
  [Types.POSTS_SUCCESS]: postsSuccess,
  [Types.POSTS_ERROR]: postsError,
})