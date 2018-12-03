import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchStats: null,
  fetchStatsSuccess: ["post_count", "user_count", "category_count", 
                      "most_posts_count",  "most_posts_name", 
                      "most_likes_count", "most_likes_name",
                      "most_likes_post_count", "most_likes_post_name",
                      "most_bans_count", "most_bans_name"],
  fetchStatsFailure: ["message"]
})

export const StatsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  waiting: false,
  error: null,
  postCount: 0,
  categoryCount: {},
  mostPostsCount: 0,
  mostPostsName: "",
  mostLikesCount: 0,
  mostLikesName: "",
  mostLikesPostCount: 0,
  mostLikesPostName: "",
  mostBansCount: 0,
  mostBansName: ""
})

/* ------------- Selectors ------------- */

export const StatsSelectors = {
}

/* ------------- Reducers ------------- */

export const fetchStats = (state, action) =>
  state.merge({ waiting: true, error: null })

export const fetchStatsSuccess = (state, {post_count, user_count, category_count, 
                                          most_posts_count,  most_posts_name, 
                                          most_likes_count, most_likes_name,
                                          most_likes_post_count, most_likes_post_name,
                                          most_bans_count, most_bans_name}) => {
  return state.merge({ post_count: post_count, user_count: user_count, category_count: category_count, 
    most_posts_count: most_posts_count,  most_posts_name: most_posts_name, 
    most_likes_count: most_likes_count, most_likes_name: most_likes_name, 
    most_likes_post_count: most_likes_post_count, most_likes_post_name: most_likes_post_name, 
    most_bans_count: most_bans_count, most_bans_name: most_bans_name,
    waiting: false, error: null })
}

export const fetchStatsFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_STATS]: fetchStats,
  [Types.FETCH_STATS_SUCCESS]: fetchStatsSuccess,
  [Types.FETCH_STATS_FAILURE]: fetchStatsFailure
})