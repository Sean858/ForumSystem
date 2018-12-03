export default {
  // Functions return fixtures
  fetchPosts: () => {
    return {
      ok: true,
      data: require('../Fixtures/fetchPosts.json')
    }
  },

  signup: () => {
    return {
      ok: true,
      data: require('../Fixtures/signup.json')
    }
  },

  login: () => {
    return {
      ok: true,
      data: require('../Fixtures/login.json')
    }
  },

  fetchProfile: (token) => {
    return {
      ok: true,
      data: require('../Fixtures/fetchProfile.json')
    }
  },

  fetchReports: (token) => {
    return {
      ok: true,
      data: require('../Fixtures/fetchReports.json')
    }
  },

  submitBan: (token, reportIds) => {
    return {
      ok: true,
      data: require('../Fixtures/submitBan.json')
    }
  }, 

  submitUnban: (token, banIds) => {
    return {
      ok: true,
      data: require('../Fixtures/submitUnban.json')
    }
  },

  submitPost: (token, title, content, categoryId) => {
    return {
      ok: true,
      data: require('../Fixtures/submitPost.json')
    }
  },

  fetchPost: (postId) => {
    return {
      ok: true,
      data: require('../Fixtures/fetchPost.json')
    }
  },

  submitComment: (token, postId, content) => {
    return {
      ok: true,
      data: require('../Fixtures/submitComment.json')
    }
  },

  submitReport: (token, postId, reportReasonIds, comment) => {
    return {
      ok: true,
      // data: require('../Fixtures/submitReport.json')
    }
  },

  submitLike: (token, postId) => {
    return {
      ok: true,
      data: require('../Fixtures/submitLike.json')
    }
  },

  fetchStats: (token) => {
    return {
      ok: true,
      data: require('../Fixtures/fetchStats.json')
    }
  }
}