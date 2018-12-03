
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openNewPostModal: null,
  closeNewPostModal: null,
  postSubmit: ['title', 'content', 'categoryId'],
  postSuccess: null,
  postFailure: ['message']
})

export const NewPostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  postCategory: null,
  modalOpen: false,
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const NewPostSelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const open = (state, action) =>
  state.merge({ modalOpen: true, waiting: false, error: null })
  
export const close = (state, action) =>
  state.merge({ modalOpen: false, waiting: false, error: null })

export const postSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const postSuccess = (state, action) => {
  return state.merge({ modalOpen: false, waiting: false, error: null })
}

export const postFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_NEW_POST_MODAL]: open,
  [Types.CLOSE_NEW_POST_MODAL]: close,
  [Types.POST_SUBMIT]: postSubmit,
  [Types.POST_SUCCESS]: postSuccess,
  [Types.POST_FAILURE]: postFailure
})