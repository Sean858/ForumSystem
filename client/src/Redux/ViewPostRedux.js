
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openViewPostModal: ["postId"],
  closeViewPostModal: null,
  postFetch: ["postId"],
  postFetchSuccess: ["post"],
  postFetchFailure: ["message"],
  commentSubmit: ["postId", "content"],
  commentSuccess: ["post"],
  commentFailure: ['message']
})

export const ViewPostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  postId: null,
  post: {
    title: "",
    author: "",
    date: "1990-01-01 00:00:00",
    content: "",
    comments: []
  },
  modalOpen: false,
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const ViewPostSelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const open = (state, {postId}) =>
  state.merge({ postId: postId, modalOpen: true, waiting: false, error: null })
  
export const close = (state, action) =>
  state.merge({ postId: null, modalOpen: false, waiting: false, error: null })

export const postFetch = (state, {postId}) => {
  return state.merge({ waiting: true, error: null })
}

export const postFetchSuccess = (state, {post}) => {
  return state.merge({ post: post, waiting: false, error: null })
}

export const postFetchFailure = (state, {message}) => {
  return state.merge({ message: message, waiting: false, error: null })
}

export const commentSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const commentSuccess = (state, {post}) => {
  return state.merge({ post: post, waiting: false, error: null })
}

export const commentFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_VIEW_POST_MODAL]: open,
  [Types.CLOSE_VIEW_POST_MODAL]: close,
  [Types.POST_FETCH]: postFetch,
  [Types.POST_FETCH_SUCCESS]: postFetchSuccess,
  [Types.POST_FETCH_FAILURE]: postFetchFailure,
  [Types.COMMENT_SUBMIT]: commentSubmit,
  [Types.COMMENT_SUCCESS]: commentSuccess,
  [Types.COMMENT_FAILURE]: commentFailure
})