import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { addCount } from '../../store/actions'
import { AppState } from '../../store'

interface IAppProps {
  count: number,
  addCount: typeof addCount,
  history: any
}

class Index extends Component<IAppProps, {}>{
  private handleClick = () => {
    this.props.addCount()
  }
  private toLogin = () => {
    this.props.history.push('/login')
  }
  private testHook=()=>{
    this.props.history.push('/hooks')
  }
  render() {
    const { count } = this.props
    return <div>
      Index
      <p>{count}</p>
      <Button type="primary" onClick={this.handleClick}>点击</Button>
      <Button type="primary" onClick={this.toLogin}>跳转到登录</Button>
      <Button type="primary" onClick={this.testHook}>测试 hook</Button>
    </div>
  }
}

export default connect((state: AppState) => ({
  count: state.count
}), { addCount })(Index)