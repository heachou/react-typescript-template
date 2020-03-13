import React,{Component} from 'react'
import {Button} from 'antd'

interface LoginProps {
  history: any
}

class Login extends Component<LoginProps,{}>{
  private login = ()=>{
    this.props.history.push('/')
  }
  render(){
    return <div>
      <Button type="primary" onClick={this.login}>登录</Button>
    </div>
  }
}

export default Login