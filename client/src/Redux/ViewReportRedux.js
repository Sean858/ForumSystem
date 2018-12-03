
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reportsFetch: null,
  reportsFetchSuccess: ['reports', 'bans'],
  reportsFetchFailure: ['message'],
  banSubmit: ['reportIds'],
  banSuccess : ['reports', 'bans'],
  banFailure: ['message'],
  unbanSubmit: ['banIds'],
  unbanSuccess : ['reports', 'bans'],
  unbanFailure: ['message'],
})

export const ViewReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  reports: [],
  bans: [],
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const ViewReportSelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const reportsFetch = (state, action) =>
  state.merge({ waiting: true, error: null })

export const reportsFetchSuccess = (state, {reports, bans}) => {
  return state.merge({ reports: reports, bans: bans, waiting: false, error: null })
}

export const reportsFetchFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

export const banSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const banSuccess = (state, {reports, bans}) => {
  return state.merge({ reports: reports, bans: bans, waiting: false, error: null })
}

export const banFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

export const unbanSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const unbanSuccess = (state, {reports, bans}) => {
  return state.merge({ reports: reports, bans: bans, waiting: false, error: null })
}

export const unbanFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPORTS_FETCH]: reportsFetch,
  [Types.REPORTS_FETCH_SUCCESS]: reportsFetchSuccess,
  [Types.REPORTS_FETCH_FAILURE]: reportsFetchFailure,
  [Types.BAN_SUBMIT]: banSubmit,
  [Types.BAN_SUCCESS]: banSuccess,
  [Types.BAN_FAILURE]: banFailure,
  [Types.UNBAN_SUBMIT]: unbanSubmit,
  [Types.UNBAN_SUCCESS]: unbanSuccess,
  [Types.UNBAN_FAILURE]: unbanFailure
})