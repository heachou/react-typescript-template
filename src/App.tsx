import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCount } from './store/actions'
import { AppState } from './store'
import { Button } from 'antd'
// import 'antd/dist/antd.css'

interface IAppProps {
  count: number,
  addCount: typeof addCount
}

class App extends Component<IAppProps, {}>{
  render() {
    const { count } = this.props
    return (
      <div>
        <p>{count}</p>
        <Button type="primary" onClick={this.handleClick}>点击</Button>
      </div>
    )
  }
  private handleClick = () => {
    this.props.addCount()
  }
}

const mapStateToProps = (state: AppState) => ({
  count: state.count
})

export default connect(mapStateToProps, { addCount })(App)
