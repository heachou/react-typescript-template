import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './pages/index/index'
import Login from './pages/login/login'
import Hooks from './pages/hooks/hooks'
import s from './app.less'

class App extends Component{
  render() {
    return (
      <div className={s.app}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/hooks" component={Hooks} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default App
