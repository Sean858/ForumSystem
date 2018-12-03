
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  likeSubmit: ["postId"],
  likeSuccess: null,
  likeFailure: ["message"]
})

export const LikeButtonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const LikeButtonSelectors = {
}

/* ------------- Reducers ------------- */

export const likeSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const likeSuccess = (state, action) => {
  return state.merge({ waiting: false, error: null })
}

export const likeFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIKE_SUBMIT]: likeSubmit,
  [Types.LIKE_SUCCESS]: likeSuccess,
  [Types.LIKE_FAILURE]: likeFailure
})