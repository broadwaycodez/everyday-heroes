import React, { Component } from 'react'
import './App.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Authorization from '../Authorization/Authorization'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Authorization />
        <Main />
      </div>
    )
  }
}

export default App