import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import HomeActions from '../Redux/HomeRedux'

export function * fetchPosts(api, action) {

  const response = yield call(api.fetchPosts)

  if(response.ok) {
    const posts = response.data.posts
    yield put(HomeActions.postsSuccess(posts))
  } else {
    const message = response.data.message
    yield put(HomeActions.postsFailure(message))
  }
}