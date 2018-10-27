import React, { Component } from 'react';
import './signup.scss';
import ByPhone from 'components/byphone/byphone'

class signUp extends Component {
  // 获取注册信息并传入信息
  requireRegisterState = ()=>{
    if (!this.checkPhoneState()) return
    if (!this.checkVerCodeState()) return
    let _phoneState = this.getPhoneInfo()
    let _verificationCode = this.getCode()
    alert(
      '电话号码为：' + _phoneState.currentCountryCode + ' ' + _phoneState.phoneNumber
      + '\n验证码为：' + _verificationCode
    )
  }

  // 调用子组件的方法
  checkPhoneState = ()=>{ return this.refs['signByPhone'].checkPhoneState() } // 检查手机号状态
  getPhoneInfo = ()=>{ return this.refs['signByPhone'].getPhoneInfo() } // 获取手机号
  checkVerCodeState = ()=>{ return this.refs['signByPhone'].checkVerCodeState() } // 检查验证码状态
  getCode = ()=> { return this.refs['signByPhone'].getCode() } // 获取验证码

  render() {
    return (
      <div className='signup-wrap'>
        <ByPhone ref='signByPhone' changeLoginMethodState={false}/>
        <button className='subbmit' onClick={this.requireRegisterState}>注册</button>
        <div className='agreement'>
          <span>注册即代表同意
            <a href='https://www.zhihu.com/terms'>《知乎协议》</a>
            <a href='https://www.zhihu.com/terms/privacy'>《隐私政策》</a>
          </span>
          <a href='https://www.zhihu.com/org/signup'>注册机构号</a>
        </div>
      </div>
    )
  }
}

export default signUp