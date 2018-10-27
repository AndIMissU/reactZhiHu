import React, { Component } from 'react';
import './bypassword.scss';
import EyeOpen from 'static/sign/eyeOpen.svg';
import EyeClose from 'static/sign/eyeClose.svg';
import AccountInput from 'components/accountinput/accountinput';

class byPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',  // 密码
      showPassword: false,  // 是否显示密码
      noPassword: false // 是否未填写密码
    }
  }

  // 绑定对应内容变化事件  
  changePasswordType = ()=>{ this.setState({ showPassword: !this.state.showPassword }) } // 修改password密码框的类型
  setPassword = (e)=>{ this.setState({ password: e.target.value }) } // 输入密码

  //  为父组件提供密码
  getPassword = ()=>{
    return this.state.password
  }
  
  // 调用子组件的方法
  checkPhoneState = ()=>{ return this.refs['account'].checkPhoneState() } // 检查账户输入的状态
  getPhoneInfo = ()=>{ return this.refs['account'].getPhoneInfo() } // 获取手机号
  changeCountryListButton = ()=>{ this.refs['account'].changeCountryListButton() }  // 改变显示国家列表按钮的状态

  // 验证密码状态
  checkPasswordState = ()=>{
    this.setState({
      noPassword: !this.state.password
    })
    return !!this.state.password
  }

  // 聚焦密码输入状态
  focusPasswordInput = ()=>{
    this.setState({
      noPassword: false
    },()=>{
      this.passwordInput.focus()
    })
  }

  render() {
    return (
      <div className="by-password-wrap">
        <AccountInput ref="account" placeholder="手机号或邮箱"/>
        <div className={`password ${this.state.noPassword? 'no-password-tip':''}`}
          onClick={this.focusPasswordInput}>
          <input ref={(input) => { this.passwordInput = input }} 
            className={this.state.password ?'':'no-password'} 
            type={this.state.showPassword?'text':'password'}  
            placeholder='密码' 
            value={this.state.password} 
            onChange={this.setPassword} />
          <img onClick={this.changePasswordType} src={this.state.showPassword?EyeOpen:EyeClose} alt='passwordImg'/>
        </div>
        <div className='options'>
          <button onClick={this.props.loginByPhone} className='switch-type'>手机验证码登录</button>
          <a className='plain' target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/account/password_reset'>忘记密码?</a>
        </div>
      </div>
    )
  }
}

export default byPassword