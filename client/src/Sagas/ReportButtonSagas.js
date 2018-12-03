import { call, put, select } from 'redux-saga/effects'
import ReportButtonActions from '../Redux/ReportButtonRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * submitReport(api, action) {
  
  const { postId, reportReasonIds, comment } = action
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.submitReport, token, postId, reportReasonIds, comment)
  
  if(response.ok) {
    yield put(ReportButtonActions.reportSuccess())
  } else {
    const message = response.data.message
    yield put(ReportButtonActions.reportFailure(message))
  }
}