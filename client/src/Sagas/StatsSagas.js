import { call, put, select } from 'redux-saga/effects'
import StatsActions from '../Redux/StatsRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * fetchStats(api, action) {
  
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.fetchStats, token)
  
  if(response.ok) {
    const post_count = response.data.post_count
    const user_count = response.data.user_count
    const category_count = response.data.category_count
    const most_posts_count = response.data.most_posts_count
    const most_posts_name = response.data.most_posts_name
    const most_likes_count = response.data.most_likes_count
    const most_likes_name = response.data.most_likes_name
    const most_likes_post_count = response.data.most_likes_post_count
    const most_likes_post_name = response.data.most_likes_post_name
    const most_bans_count = response.data.most_bans_count
    const most_bans_name = response.data.most_bans_name
    yield put(StatsActions.fetchStatsSuccess(
      post_count, user_count, category_count, 
      most_posts_count,  most_posts_name, 
      most_likes_count, most_likes_name,
      most_likes_post_count, most_likes_post_name,
      most_bans_count, most_bans_name))
  } else {
    const message = response.data.message
    yield put(StatsActions.fetchStatsFailure(message))
  }
}