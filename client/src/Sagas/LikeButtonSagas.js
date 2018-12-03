import { call, put, select } from 'redux-saga/effects'
import LikeButtonActions from '../Redux/LikeButtonRedux';
import AuthActions from '../Redux/AuthRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * submitLike(api, action) {
  
  const { postId } = action
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.submitLike, token, postId)
  
  if(response.ok) {

    const likedPosts = response.data.likedPosts

    yield put(LikeButtonActions.likeSuccess())
    yield put(AuthActions.updateLikedPosts(likedPosts))
  } else {
    const message = response.data.message
    yield put(LikeButtonActions.likeFailure(message))
  }
}