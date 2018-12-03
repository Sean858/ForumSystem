import { call, put, select } from 'redux-saga/effects'
import ViewPostActions from '../Redux/ViewPostRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * openViewPostModal(action) {
  
  const { postId } = action
  
  yield put(ViewPostActions.postFetch(postId))
}

export function * fetchPost(api, action) {
  
  const { postId } = action
  
  const response = yield call(api.fetchPost, postId)
  
  if(response.ok) {
    const post = response.data.post
    yield put(ViewPostActions.postFetchSuccess(post))
  } else {
    const message = response.data.message
    yield put(ViewPostActions.postFetchFailure(message))
  }
}

export function * submitComment(api, action) {
  
  const { postId, content } = action
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.submitComment, token, postId, content)
  
  if(response.ok) {
    const post = response.data.post
    yield put(ViewPostActions.commentSuccess(post))
  } else {
    const message = response.data.message
    yield put(ViewPostActions.commentFailure(message))
  }
}