import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './Redux'

import MenuBar from './Components/MenuBar'
import Main from './Routers/MainRouter'
import Snackbar from './Components/Snackbar';

const {store, persistor} = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          {/* <header className="App-header"> */}
          <MenuBar/>
          <Main/>
          {/* </header> */}
          <Snackbar/>
        </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;