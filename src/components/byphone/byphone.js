import React, { Component } from 'react';
import AccountInput from 'components/accountinput/accountinput';
import './byphone.scss';

// 验证方式
const VERIFICATION_METHOD = {
  useMessage: {
    placeholderTip: '请输入 6 位短信验证码',
    methodInfo: '获取短信验证码',
    anotherMethod: '接收语音验证码'
  },
  useVoice: {
    placeholderTip: '请输入 6 位语音验证码',
    methodInfo: '获取语音验证码',
    anotherMethod: '接收短信验证码'
  }
}

const MESSAGE = 'useMessage'
const VOICE = 'useVoice'
const MAX_SECOND = 60      // 默认等待的秒数

class byPhone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentVerWay: MESSAGE,  // 当前发送验证码的方式
      // showChangeLoginMethod: false, // 是否显示切换登录方式按钮
      showChangeLoginMethod: props.changeLoginMethodState, // 是否显示切换登录方式按钮

      verCode: '',  // 验证码
      noVerCode: false,  // 是否没有填入验证码
      invalidVerCode: false,  // 验证码是否无效
      ifSendVerCode: false,  // 验证码是否发送
      reSendVerCode: false,  // 是否重新发送验证码
      currentSecond: MAX_SECOND,  // 当前剩余等待的秒数
    }
  }

  // 输入验证码
  setVerifivationCode = (e)=>{
    this.setState({
      verCode: e.target.value
    })
  }
 
  // 更改方法
  // 验证输入框内容
  // 选择语音接收验证码 / 短信接收验证码
  changVerMethod = ()=>{
    this.setState({
      currentVerWay: this.state.currentVerWay === MESSAGE ? VOICE : MESSAGE,
    },()=>{
      this.getVerCode()
    })
  }

  // 获取验证码
  getVerCode = ()=>{
    if (!this.checkPhoneState()) return  // 如果手机号未填则返回
    if (this.state.ifSendVerCode) return  // 在60秒内验证码是已经发送的状态 如果已经发送则返回
    this.setState({
      ifSendVerCode: true
    },()=>{
      let _timer = setInterval(()=>{
        this.setState({
          currentSecond: this.state.currentSecond - 1
        })
        if(this.state.currentSecond === 0) {
          // 将当前秒数还原为默认状态 验证码变为未发送状态 重新发送验证码状态置为true
          this.setState({
            ifSendVerCode: false,
            reSendVerCode: true,
            currentSecond: MAX_SECOND   
          })
          clearInterval(_timer)
        }
      },1000)
    })
    if (this.checkPhoneState()) {
      let _state = this.getPhoneInfo()
      alert(
        _state.currentCountryCode + ' '
        + _state.phoneNumber 
        + ' 请求'
        + VERIFICATION_METHOD[this.state.currentVerWay].methodInfo
      )
    }
  }

  // 检查验证码状态
  checkVerCodeState = ()=>{
    let _noVerCode = !this.state.verCode
    let _invalidVerCode = false
    if (_noVerCode) {
      _invalidVerCode = false
    } else {
      _invalidVerCode = !/^\d{6}$/.test(this.state.verCode)
    }
    this.setState({
      noVerCode: _noVerCode,
      invalidVerCode: _invalidVerCode
    })
    return !_noVerCode && !_invalidVerCode
  }

  // 聚焦验证码的输入框时 隐藏报错提示
  focusVerCodeInput = ()=>{
    this.setState({
      noVerCode: false,
      invalidVerCode: false
    },()=>{
      this.verCodeInput.focus() // 自动聚焦验证码的输入框
    })
  }
  // 给父组件提供验证码
  getCode = ()=>{ return this.state.verCode }
  // 调用子组件的方法
  checkPhoneState = ()=>{ return this.refs['accountInput'].checkPhoneState() } // 检查账户输入的状态
  getPhoneInfo = ()=>{ return this.refs['accountInput'].getPhoneInfo() } // 获取手机号

  render() {
    return (
      <div>
        <AccountInput ref='accountInput' hasCountryList={true} placeholder='手机号'/>
        <div className={`verification-code
          ${this.state.noVerCode?('no-verfication-code-' + this.state.currentVerWay):''}
          ${this.state.invalidVerCode?'invalid-vertification-code':''}`}
          onClick={this.focusVerCodeInput}>
          <input ref={(input) => { this.verCodeInput = input }} 
            onChange={this.setVerifivationCode}
            placeholder={VERIFICATION_METHOD[this.state.currentVerWay].placeholderTip}
            type='text' />
          <p onClick={this.getVerCode}
            className={this.state.ifSendVerCode?'timer-count-down':''}>
            {(!this.state.ifSendVerCode && this.state.reSendVerCode)?'重发':''}
            {this.state.ifSendVerCode?(this.state.currentSecond+' 秒后可重发'):VERIFICATION_METHOD[this.state.currentVerWay].methodInfo}
          </p>
        </div>
        {this.state.showChangeLoginMethod?(
          <div className="change-login-method" onClick={this.props.loginByPassword}>
            密码登录（手机号或邮箱）
          </div>
        ):''}
        <div className={`not-send-verification-code ${this.state.ifSendVerCode?'sent-verfication-code':''}`}
          onClick={this.changVerMethod}>
          {VERIFICATION_METHOD[this.state.currentVerWay].anotherMethod}
        </div>
      </div>
    )
  }
}

export default byPhone