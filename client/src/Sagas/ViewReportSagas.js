import { call, put, select } from 'redux-saga/effects'
import ViewReportActions from '../Redux/ViewReportRedux';
import { AuthSelectors } from '../Redux/AuthRedux'

export function * fetchReports(api, action) {
  
  const token = yield select(AuthSelectors.selectToken)
  
  const response = yield call(api.fetchReports, token)

  if(response.ok) {
    const reports = response.data.reports
    const bans = response.data.bans
    yield put(ViewReportActions.reportsFetchSuccess(reports, bans))
  } else {
    const message = response.data.message
    yield put(ViewReportActions.reportsFetchFailure(message))
  }
}

export function * submitBan(api, action) {

  const {reportIds} = action
  const token = yield select(AuthSelectors.selectToken)

  const response = yield call(api.submitBan, token, reportIds)

  if(response.ok) {
    const reports = response.data.reports
    const bans = response.data.bans
    yield put(ViewReportActions.banSuccess(reports, bans))
  } else {
    const message = response.data.message
    yield put(ViewReportActions.banFailure(message))
  }
}

export function * submitUnban(api, action) {

  const {banIds} = action
  const token = yield select(AuthSelectors.selectToken)

  const response = yield call(api.submitUnban, token, banIds)

  if(response.ok) {
    const reports = response.data.reports
    const bans = response.data.bans
    yield put(ViewReportActions.unbanSuccess(reports, bans))
  } else {
    const message = response.data.message
    yield put(ViewReportActions.unbanFailure(message))
  }
}


