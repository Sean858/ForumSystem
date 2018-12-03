
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCategories: null,
})

export const ViewPostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: [
    {
      key: 'announcement',
      value: 'announcement',
      text: 'Announcement',
      color: 'blue'
    },
    {
      key: 'discussion',
      value: 'discussion',
      text: 'Discussion',
      color: 'teal'
    },
    {
      key: 'question',
      value: 'question',
      text: 'Question',
      color: 'green'
    },
    {
      key: 'guide',
      value: 'guide',
      text: 'Guide',
      color: 'orange'
    },
  ]
})

/* ------------- Selectors ------------- */

export const PostCategorySelectors = {
  // selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

})