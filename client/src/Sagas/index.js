import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
import { HomeTypes } from '../Redux/HomeRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { ViewReportTypes } from '../Redux/ViewReportRedux'
import { NewPostTypes } from '../Redux/NewPostRedux'
import { ViewPostTypes } from '../Redux/ViewPostRedux'
import { ReportButtonTypes } from '../Redux/ReportButtonRedux'
import { LikeButtonTypes } from '../Redux/LikeButtonRedux'
import { StatsTypes } from '../Redux/StatsRedux'


/* ------------- Sagas ------------- */
import { fetchPosts } from './HomeSagas'
import { signup, login, fetchProfile } from './AuthSagas'
import { fetchReports, submitBan, submitUnban } from './ViewReportSagas'
import { submitPost } from './NewPostSagas'
import { openViewPostModal, fetchPost, submitComment } from './ViewPostSagas'
import { submitReport } from './ReportButtonSagas'
import { submitLike } from './LikeButtonSagas'
import { fetchStats } from './StatsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()


/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(HomeTypes.POSTS_FETCH, fetchPosts, api),
    takeLatest(AuthTypes.SIGNUP_SUBMIT, signup, api),
    takeLatest(AuthTypes.LOGIN_SUBMIT, login, api),
    takeLatest(AuthTypes.PROFILE_FETCH, fetchProfile, api),
    takeLatest(ViewReportTypes.REPORTS_FETCH, fetchReports, api),
    takeLatest(ViewReportTypes.BAN_SUBMIT, submitBan, api),
    takeLatest(ViewReportTypes.UNBAN_SUBMIT, submitUnban, api),
    takeLatest(NewPostTypes.POST_SUBMIT, submitPost, api),
    takeLatest(ViewPostTypes.OPEN_VIEW_POST_MODAL, openViewPostModal),
    takeLatest(ViewPostTypes.POST_FETCH, fetchPost, api),
    takeLatest(ViewPostTypes.COMMENT_SUBMIT, submitComment, api),
    takeLatest(ReportButtonTypes.REPORT_SUBMIT, submitReport, api),
    takeLatest(LikeButtonTypes.LIKE_SUBMIT, submitLike, api),
    takeLatest(StatsTypes.FETCH_STATS, fetchStats, api)
  ])
}