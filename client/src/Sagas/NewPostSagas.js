import { call, put, select } from 'redux-saga/effects'
import NewPostActions from '../Redux/NewPostRedux';
import HomeActions from '../Redux/HomeRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * submitPost(api, action) {
  
  const {title, content, categoryId} = action
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.submitPost, token, title, content, categoryId)
  
  if(response.ok) {
    const posts = response.data.posts

    yield put(HomeActions.postsSuccess(posts))
    yield put(NewPostActions.postSuccess())
  } else {
    const message = response.data.message
    yield put(NewPostActions.postFailure(message))
  }
}