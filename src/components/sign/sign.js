

import React, {Component } from 'react';
import './sign.scss';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import HeaderLogo from 'static/sign/headerIcon.svg';

/**
 * signin 表示登录页面
 * signup 表示注册页面
 */
const STATUS = {
  signin: {
    title: '登录知乎，发现更大的世界',
    btnName: '注册',
    footerTip: '没有账号？'
  },
  signup: {
    title: '注册知乎，发现更大的世界',
    btnName: '登录',
    footerTip: '已有账号？'
  }
}

const DOWNLOAD = {
  close: '下载知乎 App',
  show: '关闭二维码'
}

const SIGNIN = 'signin'
const SIGNUP = 'signup'
const SHOW = 'show'
const CLOSE = 'close'

class Sign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentState: SIGNIN,
      currentDownload: CLOSE
    }
  }
  // 选择注册或者登录
  changeState = ()=>{
    this.setState({
      currentState: this.state.currentState === SIGNIN ? SIGNUP : SIGNIN
    })
  }
  // 显示下载二维码
  showDownloadCode = ()=>{
    this.setState({
      currentDownload: this.state.currentDownload === SHOW? CLOSE : SHOW
    })
  }
  render() {
    return (
      <div className='sign' onClick={this.closeCountryList}>
        <div className='sign-wrap'>
          <div className='container'>
            <div className='header'>
              <img src={HeaderLogo} alt='headerIcon'/>
              <p>{STATUS[this.state.currentState].title}</p>
            </div>
            <div className='body'>
              {this.state.currentState === SIGNIN?<SignIn />:<SignUp />}
              <div className='info-tip'>
                {STATUS[this.state.currentState].footerTip}
                <span onClick={this.changeState} >{STATUS[this.state.currentState].btnName}</span>
              </div>
              <div className={`download-code ${this.state.currentDownload === SHOW ? '':'close-download-code'}`}></div>
            </div>
          </div>
          <button className='download-btn' onClick={this.showDownloadCode}>{DOWNLOAD[this.state.currentDownload]}</button>
        </div>
        <div className='footer'>
          <p>
            <a target='_blank' rel='noopener noreferrer' href='https://zhuanlan.zhihu.com/'>知乎专栏</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/roundtable'>圆桌</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/explore'>发现</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/app/'>移动应用</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/contact'>联系我们</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://app.mokahr.com/apply/zhihu'>来知乎工作</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/org/signup'>注册机构号</a>
          </p>
          <p>
            © 2018 知乎
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='http://www.miibeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=LKirVA32eFLbyBI7VjVSQxdU58ZQYipWEuAzagWxTonQqSHQIYE0!-1613082564'>京 ICP 证 110745 号</a>
            <span>·</span>京公网安备 11010802010035 号
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://zhstatic.zhihu.com/assets/zhihu/publish-license.jpg'>出版物经营许可证</a>
          </p>
          <p>
            <a target='_blank' rel='noopener noreferrer' href='https://zhuanlan.zhihu.com/p/28852607'>侵权举报</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='http://www.12377.cn/'>网上有害信息举报</a>
            <span>·</span><a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/jubao'>专区儿童色情信息举报专区</a>
            <span>·</span>违法和不良信息举报：010-82716601
          </p>
          <div className='model-company'>
            <img src="https://static.zhihu.com/static/revved/img/index/chengxing_logo@2x.65dc76e8.png" alt="诚信企业标志"/>
            <a target='_blank' rel='noopener noreferrer' href="https://credit.cecdc.com/CX20170607038331320388.html">诚信网站示范企业</a>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Sign;
