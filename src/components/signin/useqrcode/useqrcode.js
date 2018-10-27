import React, { Component } from'react';
import './useqrcode.scss'
import ZhihuQRCode from 'static/sign/zhihuqrcode.jpg'

const PASSWORD = 'usePassword'

class useQRCode extends Component {
  render() {
    return (
      <div className='qr-code-wrap'>
        <div className='content'>
          <img src={ZhihuQRCode} alt='二维码'/>
          <p>打开 <a href='https://www.zhihu.com/app/' target='_blank' rel='noopener noreferrer'> 知乎 App</a></p>
          <p>在「我的」页面右上角打开扫一扫</p>
        </div>
        <div className='to-use-password'>
          <span onClick={()=>{this.props.chooseSignInMethodEvent(PASSWORD)}}>使用密码登录</span>
        </div>
      </div>
    )
  }
}

export default useQRCode