import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  selectAvatar: ['avatarId'],
  openAuthModal: null,
  closeAuthModal: null,
  signupSubmit: ['avatarId', 'name', 'email', 'password'],
  signupSuccess: ['token', 'profile'],
  signupFailure: ['message'],
  loginSubmit: ['email', 'password'],
  loginSuccess: ['token', 'profile'],
  loginFailure: ['message'],
  logout: null,
  profileFetch: null,
  profileFetchSuccess: ['name', 'dateJoined', 'avatarId',
  'likesReceived', 'statusId', 'email', 'posts', 'comments', 'isAdmin'],
  profileFetchFailure: ['message'],
  profileEditSubmit: null,
  profileEditSuccess: ['profile'],
  profileEditFailure: ['message'],
  updateLikedPosts: ['likedPosts']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false,
  token: null,
  avatarId: 0,
  modalOpen: false,
  waiting: false,
  signupError: null,
  loginError: null,
  profile: {
    name: null,
    dateJoined: null,
    avatarId: 0, 
    likesReceived: 0,
    statusId: 0,
    email: null,
    posts: [],
    comments: [],
    likedPosts: [],
    isAdmin: false
  },
  profileError: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  selectLoggedIn: state => state.auth.loggedIn,
  selectToken: state => state.auth.token,
  isPostLiked: (state, postId) => state.auth.profile.likedPosts.includes(postId) 
}

/* ------------- Reducers ------------- */

export const selectAvatar = (state, {avatarId}) => 
  state.merge({ avatarId: avatarId })

export const open = (state, action) =>
  state.merge({ modalOpen: true, waiting: false, signupError: null, loginError: null })
  
export const close = (state, action) =>
  state.merge({ modalOpen: false, waiting: false, signupError: null, loginError: null })

export const signupSubmit = (state, action) =>
  state.merge({ waiting: true, signupError: null })

export const signupSuccess = (state, {token, profile}) => {
  return state.merge({ profile: profile, modalOpen: false, loggedIn: true, token: token, waiting: false, signupError: null })
}

export const signupFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

export const loginSubmit = (state, action) =>
  state.merge({ waiting: true, loginError: null })

export const loginSuccess = (state, {token, profile}) => {
  return state.merge({ profile: profile, modalOpen: false, loggedIn: true, token: token, waiting: false, loginError: null })
}

export const loginFailure = (state, {message}) =>
  state.merge({ waiting: false, loginError: message })

export const logout = (state, action) =>
  state.merge({ loggedIn: false, token: null, 
    profile: {
    name: null,
    dateJoined: null,
    avatarId: 0, 
    likesReceived: 0,
    statusId: 0,
    email: null,
    posts: [],
    comments: [],
    likedPosts: [],
    isAdmin: false
  }})

export const profileFetch = (state, action) =>
  state.merge({ waiting: true, profileError: null })

export const profileFetchSuccess = (state, action) => {
  const {name, dateJoined, avatarId, likesReceived, statusId, email, posts, comments, likedPosts, isAdmin} = action
  return state.merge({ name: name, dateJoined: dateJoined, avatarId: avatarId,
    likesReceived: likesReceived, statusId: statusId, email: email, 
    posts: posts, comments: comments, likedPosts: likedPosts, isAdmin: isAdmin, waiting: false, error: null })
}

export const profileFetchFailure = (state, {message}) =>
  state.merge({ waiting: false, profileError: message })

export const profileEditSubmit = (state, action) =>
  state.merge({ waiting: true, profileError: null })

export const profileEditSuccess = (state, {profile}) => {
  return state.merge({ profile: profile, waiting: false, profileError: null })
}

export const profileEditFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

export const updateLikedPosts = (state, {likedPosts}) =>{ 
  var profile = {...state.profile}
  profile.likedPosts = likedPosts
  return state.merge({ profile: profile}) 
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_AVATAR]: selectAvatar,
  [Types.OPEN_AUTH_MODAL]: open,
  [Types.CLOSE_AUTH_MODAL]: close,
  [Types.SIGNUP_SUBMIT]: signupSubmit,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.LOGIN_SUBMIT]: loginSubmit,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.PROFILE_FETCH]: profileFetch,
  [Types.PROFILE_FETCH_SUCCESS]: profileFetchSuccess,
  [Types.PROFILE_FETCH_FAILURE]: profileFetchFailure,
  [Types.PROFILE_EDIT_SUBMIT]: profileEditSubmit,
  [Types.PROFILE_EDIT_SUCCESS]: profileEditSuccess,
  [Types.PROFILE_EDIT_FAILURE]: profileEditFailure,
  [Types.UPDATE_LIKED_POSTS]: updateLikedPosts,
})