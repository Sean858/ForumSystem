import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://localhost:5000') => {
// const create = (baseURL = 'https://www.mocky.io/v2') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const fetchPosts = () => api.get('/api/posts')

  const signup = (avatarId, name, email, password) => { 
    var data = new FormData();
    data.append('avatarId', avatarId);
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    return api.post('/api/user', data);
  }

  const login = (email, password) => {
    var data = new FormData();
    data.append('email', email);
    data.append('password', password);
    return api.post('/api/login', data);
  }

  const fetchProfile = (token) => api.get('/api/user', {}, {headers: {"token": token}});

  const fetchReports = (token) => api.get('/api/reports', {}, {headers: {"token": token}});

  const submitBan = (token, reportIds) => {
    var data = new FormData();
    data.append('reportIds', reportIds);
    return api.post('/api/ban', data, {headers: {"token": token}});
  }

  const submitUnban = (token, banIds) => {
    var data = new FormData();
    data.append('banIds', banIds);
    return api.post('/api/unban', data, {headers: {"token": token}});
  }

  const submitPost = (token, title, content, categoryId) => { 
    var data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('categoryId', categoryId);
    return api.post('/api/post', data, {headers: {"token": token}});
  }

  const fetchPost = (postId) => api.get('/api/post/' + postId);

  const submitComment = (token, postId, content) => { 
    var data = new FormData();
    data.append('postId', postId);
    data.append('content', content);
    return api.post('/api/comment', data, {headers: {"token": token}});
  }

  const submitReport = (token, postId, reportReasonIds, comment) =>  {
    var data = new FormData();
    data.append('postId', postId);
    data.append('reportReasonIds', reportReasonIds);
    data.append('comment', comment);
    return api.post('/api/report', data, {headers: {"token": token}});
  }

  const submitLike = (token, postId) => { 
    var data = new FormData();
    data.append('postId', postId);
    return api.post('/api/like', data, {headers: {"token": token}});
  }

  const fetchStats = (token) => api.get('/api/stats', {}, {headers: {"token": token}});

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    fetchPosts,
    signup,
    login,
    fetchProfile,
    fetchReports,
    submitBan,
    submitUnban,
    submitPost,
    fetchPost, 
    submitComment,
    submitReport, 
    submitLike,
    fetchStats
  }
}

// let's return back our create method as the default.
export default {
  create
}