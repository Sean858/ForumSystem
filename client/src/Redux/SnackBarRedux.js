
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showSnackbar: ["message", "type"],
  hideSnackbar: null
})

export const SnackBarTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  open: false,
  message: "",
  color: "red"
})

/* ------------- Selectors ------------- */

export const SnackBarSelectors = {
}

/* ------------- Reducers ------------- */

export const showSnackbar = (state, {message, color}) =>
  state.merge({ open: true, color: color, message: message })

export const hideSnackbar = (state, action) => {
  return state.merge({ open: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_SNACKBAR]: showSnackbar,
  [Types.HIDE_SNACKBAR]: hideSnackbar
})