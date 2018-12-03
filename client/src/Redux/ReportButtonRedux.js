
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openReportButtonPopup: null,
  closeReportButtonPopup: null,
  reportSubmit: ["postId", "reportReasonIds", "comment"],
  reportSuccess: null,
  reportFailure: ["message"]
})

export const ReportButtonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  popupOpen: false,
  waiting: false,
  error: null,
})

/* ------------- Selectors ------------- */

export const ReportButtonSelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

export const open = (state, action) =>
  state.merge({ popupOpen: true, waiting: false, error: null })
  
export const close = (state, action) =>
  state.merge({ popupOpen: false, waiting: false, error: null })

export const reportSubmit = (state, action) =>
  state.merge({ waiting: true, error: null })

export const reportSuccess = (state, action) => {
  return state.merge({ popupOpen: false, waiting: false, error: null })
}

export const reportFailure = (state, {message}) =>
  state.merge({ waiting: false, error: message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_REPORT_BUTTON_POPUP]: open,
  [Types.CLOSE_REPORT_BUTTON_POPUP]: close,
  [Types.REPORT_SUBMIT]: reportSubmit,
  [Types.REPORT_SUCCESS]: reportSuccess,
  [Types.REPORT_FAILURE]: reportFailure
})