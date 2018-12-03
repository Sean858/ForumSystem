import { call, put, select } from 'redux-saga/effects'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'
import SnackBarActions from '../Redux/SnackBarRedux'

export function * signup(api, action) {

  const { avatarId, name, email, password } = action

  const response = yield call(api.signup, avatarId, name, email, password)

  if(response.ok) {
    const token = response.data.token
    const profile = response.data.profile
    yield put(AuthActions.signupSuccess(token, profile))
  } else {
    const message = response.data.message
    yield put(SnackBarActions.showSnackbar(message))
    // yield put(AuthActions.signupFailure(message))
  }
}

export function * login(api, action) {

  const { email, password } = action

  const response = yield call(api.login, email, password)
  
  if(response.ok) {
    const token = response.data.token
    const profile = response.data.profile
    yield put(AuthActions.loginSuccess(token, profile))
  } else {
    const message = response.data.message
    yield put(SnackBarActions.showSnackbar(message))
    // yield put(AuthActions.loginFailure(message))
  }
}

export function * fetchProfile(api, action) {
  
  const token = yield select(AuthSelectors.selectToken)
  const response = yield call(api.fetchProfile, token)
  
  if(response.ok) {
    const name = response.data.name
    const dateJoined = response.data.dateJoined
    const avatarId = response.data.avatarId
    const likesReceived = response.data.likesReceived
    const statusId = response.data.statusId
    const email = response.data.email
    const posts = response.data.posts
    const comments = response.data.comments
    const likedPosts = response.data.likedPosts
    const isAdmin = response.data.isAdmin
    yield put(AuthActions.profileFetchSuccess(
      name, dateJoined, avatarId, likesReceived, statusId, email, posts, comments, likedPosts, isAdmin))
  } else {
    const message = response.data.message
    yield put(SnackBarActions.showSnackbar(message))
    // yield put(AuthActions.profileFetchFailure(message))
  }
}