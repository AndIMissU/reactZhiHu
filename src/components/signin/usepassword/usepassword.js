import React, { Component } from 'react'
import './usepassword.scss'
import WeChat from 'static/sign/wechat.svg';
import WeiBo from 'static/sign/weibo.svg'
import QQ from 'static/sign/qq.svg'
import ByPhone from 'components/byphone/byphone'
import ByPassword from 'components/bypassword/bypassword'

const QR_CODE= 'useQRCode'
const OVERSEAS_PHONE = '海外手机登录'
const EMAIL = '邮箱账号登陆'

class usePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginMethodByPassword: true,  // 是否用密码登录
      ifshowCountryList: false,  // 是否显示国家列表
      usePasswordMethod: OVERSEAS_PHONE, // 用密码登录 邮箱/手机号
      showSocialAccountMethod: false  // 是否显示用社交账号登录
    }
  }

  // 调用子组件的方法 是否显示国家列表按钮
  changeCountryListButton = ()=>{
    this.setState({
      loginMethodByPassword: true,
      usePasswordMethod: this.state.usePasswordMethod === OVERSEAS_PHONE ? EMAIL : OVERSEAS_PHONE
    },()=>{
      return this.refs['usePassword'].changeCountryListButton()
    })
  }

  // 改变登录方式 
  loginByPhone = ()=>{ this.setState({ loginMethodByPassword: false }) } // 选择用手机号登录
  loginByPassword = ()=>{ this.setState({ loginMethodByPassword: true }) } // 选择用密码登录

  // 改变显示社交账号登录的状态
  loginBySocial = ()=>{ this.setState({ showSocialAccountMethod: true }) }

  // 验证手机号和邮箱的状态
  checkPhoneState = ()=>{
    return (
      this.state.loginMethodByPassword?
        this.refs['usePassword'].checkPhoneState()
        :this.refs['usePhone'].checkPhoneState()
    )
  }

  // 验证密码或者验证码状态
  checkVerState = ()=>{
    return (
      this.state.loginMethodByPassword ?
        this.refs['usePassword'].checkPasswordState()
        :this.refs['usePhone'].checkVerCodeState()
    )
  }
  // 获取手机号或者邮箱
  getPhone = ()=>{
    return (
      this.state.loginMethodByPassword?
        this.refs['usePassword'].getPhoneInfo()
        :this.refs['usePhone'].getPhoneInfo()
    )
  }
  // 获取密码或者验证码
  getPasswrodOrCode = ()=>{
    return (
      this.state.loginMethodByPassword?
        ('密码：'+this.refs['usePassword'].getPassword())
        :('验证码：'+this.refs['usePhone'].getCode())
    )
  }

  // 登录
  getSignInfo = ()=>{
    if(!this.checkPhoneState()) return
    if (!this.checkVerState()) return
    let _phone = this.getPhone()
    let _code = this.getPasswrodOrCode()
    let _text = _phone.hasOwnProperty('currentCountryCode')? 
      '手机号：'+ _phone.currentCountryCode+ ' ' + _phone.phoneNumber + '\n' + _code
      : '手机号/邮箱：'+ _phone.phoneNumber + '\n' + _code
    alert(
      _text
    )
  }


  render() {
    return (
      <div className='use-password'>
        {this.state.loginMethodByPassword ? 
          <ByPassword ref='usePassword' loginByPhone = {this.loginByPhone}/>
          :<ByPhone ref='usePhone' changeLoginMethodState={true} loginByPassword={this.loginByPassword}/>
        }
        <button className='submit' onClick={this.getSignInfo}>登录</button>
        <div className='other-types'>
          <button onClick={()=>{this.props.chooseSignInMethodEvent(QR_CODE)}}>二维码登录</button>
          <span>·</span>
          <button onClick={this.changeCountryListButton}>{this.state.usePasswordMethod}</button>
          <span>·</span>
          <div>
            {this.state.showSocialAccountMethod?
              (
                <div className='social-account-list'>
                  <a target='_black' rel='noopener noreferrer' href='https://open.weixin.qq.com/connect/qrconnect?appid=wx268fcfe924dcb171&redirect_uri=https%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fwechat&response_type=code&scope=snsapi_login&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55#wechat'>
                    <img src={WeChat} alt='weChatLogo'/>
                  </a>
                  <a target='_blank' rel='noopener noreferrer' href='https://api.weibo.com/oauth2/authorize?scope=email&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55&redirect_uri=http%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fsina&response_type=code&client_id=3063806388'>
                    <img src={WeiBo} alt='weiBoLogo'/>
                  </a>
                  <a target='_blank' rel='noopener noreferrer' href='https://graph.qq.com/oauth2.0/show?which=Login&display=pc&scope=get_user_info%2Cget_info%2Cadd_t%2Cadd_pic_t%2Cget_other_info%2Cget_fanslist%2Cget_idollist%2Cadd_idol%2Cadd_share&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55&redirect_uri=https%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fqqconn&response_type=code&client_id=100490701'>
                    <img src={QQ} alt='QQLogo'/>
                  </a>
                </div>
              )
              :<button onClick={this.loginBySocial}>社交账号登录</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default usePassword