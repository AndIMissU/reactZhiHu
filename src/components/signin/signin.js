import React, { Component } from 'react';
import UsePassword from './usepassword/usepassword';
import UseQRCode from './useqrcode/useqrcode';

class signIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSignInMethod: 'usePassword'
    }
  }
  // 选择登录方式
  chooseSignInMethod = (type)=>{
    this.setState({
      currentSignInMethod: type
    })
  }
  render() {
    return (
      <div className='signin-wrap'>
        {this.state.currentSignInMethod === 'usePassword'?
          <UsePassword chooseSignInMethodEvent = {this.chooseSignInMethod}/>
          :<UseQRCode chooseSignInMethodEvent = {this.chooseSignInMethod}/>
        }
      </div>
    )
  }
}

export default signIn