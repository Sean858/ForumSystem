import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../Pages/HomePage'
import ViewReportPage from '../Pages/ViewReportPage'
import PrivacyPolicyPage from '../Pages/PrivacyPolicyPage'
import ProfilePage from '../Pages/ProfilePage';
import StatsPage from '../Pages/StatsPage';

class Main extends Component {

render() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/post' component={HomePage}/>
        <Route exact path='/post/:postId' component={HomePage}/>
        <Route exact path='/reports' component={ViewReportPage}/>
        <Route exact path='/privacy' component={PrivacyPolicyPage}/>
        <Route exact path='/profile' component={ProfilePage}/>
        <Route exact path='/stats' component={StatsPage}/>
      </Switch>
    </main>
    )
  }
}

export default Main
