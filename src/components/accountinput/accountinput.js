import React, { Component } from 'react';
import './accountinput.scss';

// 各国国家区号
const COUNTRY_LIST = [ '中国 +86', '美国 +1', '日本 +81', '中国香港 +852', '中国台湾 +886', '马来西亚 +60', '澳大利亚 +61', 
  '加拿大 +1', '英国 +44', '新加坡 +65', '德国 +49', '俄罗斯 +7', '埃及 +20', '南非 +27', '希腊 +30', '荷兰 +31', '比利时 +32',
  '法国 +33', '西班牙 +34', '匈牙利 +36', '意大利 +39', '罗马尼亚 +40', '瑞士 +41', '奥地利 +43', '丹麦 +45',  '瑞典 +46',
  '挪威 +47', '波兰 +48', '秘鲁 +51', '墨西哥 +52', '古巴 +53', '阿根廷 +54', '巴西 +55', '智利 +56', '哥伦比亚 +57',
  '委内瑞拉 +58', '印度尼西亚 +62', '菲律宾 +63', '新西兰 +64', '泰国 +66', '哈萨克斯坦 +7', '韩国 +82', '越南 +84', '土耳其 +90',
  '印度 +91', '巴基斯坦 +92', '阿富汗 +93', '斯里兰卡 +94', '缅甸 +95', '伊朗 +98', '摩洛哥 +212', '阿尔及利亚 +213', '突尼斯 +216',
  '利比亚 +218', '冈比亚 +220', '塞内加尔 +221', '马里 +223', '几内亚 +224', '科特迪瓦 +225', '布基纳法索 +226', '尼日尔 +227',
  '多哥 +228', '贝宁 +229', '毛里求斯 +230', '利比里亚 +231', '塞拉利昂 +232', '加纳 +233', '尼日利亚 +234', '乍得 +235',
  '中非共和国 +236', '喀麦隆 +237', '圣多美和普林西比 +239', '加蓬 +241', '刚果民主共和国 +243', '安哥拉 +244', '阿森松岛 +247',
  '塞舌尔 +248', '苏丹 +249', '埃塞俄比亚 +251', '索马里 +252', '吉布提 +253', '肯尼亚 +254', '坦桑尼亚 +255', '乌干达 +256',
  '布隆迪 +257', '莫桑比克 +258', '赞比亚 +260', '马达加斯加 +261', '津巴布韦 +263', '纳米比亚 +264', '马拉维 +265', '莱索托 +266',
  '博茨瓦纳 +267', '斯威士兰 +268', '直布罗陀 +350', '葡萄牙 +351', '卢森堡 +352', '爱尔兰 +353', '冰岛 +354', '阿尔巴尼亚 +355',
  '马耳他 +356', '塞浦路斯 +357', '芬兰 +358', '保加利亚 +359', '立陶宛 +370', '拉脱维亚 +371', '爱沙尼亚 +372', '摩尔多瓦 +373',
  '亚美尼亚 +374', '白俄罗斯 +375', '安道尔共和国 +376', '摩纳哥 +377', '圣马力诺 +378', '乌克兰 +380', '斯洛文尼亚 +386',
  '捷克 +420', '斯洛伐克 +421', '列支敦士登 +423', '伯利兹 +501', '瓜地马拉 +502', '萨尔瓦多 +503', '洪都拉斯 +504', '尼加拉瓜 +505',
  '哥斯达黎加 +506', '巴拿马 +507', '海地 +509', '玻利维亚 +591', '圭亚那 +592', '厄瓜多尔 +593', '法属圭亚那 +594', '巴拉圭 +595',
  '马提尼克 +596', '苏里南 +597', '乌拉圭 +598', '文莱 +673', '巴布亚新几内亚 +675', '汤加 +676', '所罗门群岛 +677', '斐济 +679',
  '库克群岛 +682', '法属波利尼西亚 +689', '中国澳门 +853', '柬埔寨 +855', '老挝 +856', '孟加拉国 +880', '马尔代夫 +960', '黎巴嫩 +961',
  '约旦 +962', '叙利亚 +963', '伊拉克 +964', '科威特 +965', '沙特阿拉伯 +966', '也门 +967', '阿曼 +968', '阿拉伯联合酋长国 +971',
  '以色列 +972', '巴林 +973', '卡塔尔 +974', '蒙古 +976', '尼泊尔 +977', '塔吉克斯坦 +992', '土库曼斯坦 +993', '阿塞拜疆 +994',
  '格鲁吉亚 +995', '吉尔吉斯斯坦 +996', '乌兹别克斯坦 +998', '巴哈马 +1242', '巴巴多斯 +1246', '安圭拉岛 +1264', '安提瓜和巴布达 +1268',
  '开曼群岛 +1345', '百慕大群岛 +1441', '格林纳达 +1473', '蒙特塞拉特岛 +1664', '关岛 +1671', '圣露西亚 +1758', '波多黎各 +1787',
  '多明尼加共和国 +1809', '特立尼达和多巴哥 +1868', '牙买加 +1876', '塞尔维亚共和国 +381', '毛里塔尼亚 +222'
]
class accountInut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',   // 手机号
      noPhoneNumber: false,  // 是否没有填入手机号
      invalidPhoneNumber: false, // 手机号是否无效

      hasCountryList: props.hasCountryList, // 是否显示选择国家
      currentPlaceholder: props.placeholder,
      showCountryList: false,  // 是否显示国家列表
      currentCountry: COUNTRY_LIST[0],  // 当前国家
      currentCountryCode: COUNTRY_LIST[0].split(' ')[1]  // 当前国家的 手机区号
    }
  }

  // 供父组件调用返回数据
  getPhoneInfo = ()=> { 
    let newState = {
      phoneNumber: this.state.phoneNumber,
    }
    if(this.state.hasCountryList) newState['currentCountryCode'] = this.state.currentCountryCode
    return newState
  }

  // 供父组件改变是否显示国家列表
  changeCountryListButton = () =>{
    this.setState({
      hasCountryList: !this.state.hasCountryList
    })
  }

  // 输入手机号码
  setPhoneNumber = (e)=>{
    this.setState({
      phoneNumber: e.target.value
    })
  }

  // 检查手机号状态
  checkPhoneState = ()=>{
    let _noPhoneNumber = !this.state.phoneNumber
    let _invalidPhoneNumber = false
    if (_noPhoneNumber) {
      _invalidPhoneNumber = false
    } else {
      _invalidPhoneNumber = this.state.currentCountry === COUNTRY_LIST[0] && !/^1[34578]\d{9}$/.test(this.state.phoneNumber)
    }
    this.setState({
      noPhoneNumber: _noPhoneNumber,
      invalidPhoneNumber: _invalidPhoneNumber
    })
    return !_noPhoneNumber && !_invalidPhoneNumber
  }

  // 聚焦手机号的输入框时 隐藏报错提示
  focusPhoneInput = ()=>{
    this.setState({
      noPhoneNumber: false,
      invalidPhoneNumber: false
    },()=>{
      this.phoneNumberInput.focus()  // 自动聚焦手机号的输入框
    })
  }

  // 点击显示国家列表
  changeCountryListState = ()=>{
    this.setState({
      showCountryList: !this.state.showCountryList
    })
  }

  // 选择国家
  chooseCountry = (e)=>{
    let _currentCountry = e.target.innerHTML
    let _currentCountryCode = _currentCountry.split(' ')[1]
    this.setState({
      currentCountry: _currentCountry,
      currentCountryCode: _currentCountryCode
    })
  }
  // 渲染国家列表信息
  countryList = ()=>{
    return (
      <ul className='country-list' onClick={this.chooseCountry}>
        {COUNTRY_LIST.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    )
  }

  render() {
    return(
      <div className='account'>
        {this.state.hasCountryList?(
          <div className='country-wrap'>
            <div className='select-counrty' onClick={this.changeCountryListState}>
              {this.state.currentCountry}
              {this.state.showCountryList?this.countryList():''}
            </div>
            <span>&nbsp;</span>
          </div>
          ):''
        }

        <div className={`phone-wrap ${this.state.noPhoneNumber?'no-phone-number':''} 
          ${this.state.invalidPhoneNumber?'invalid-phone-number':''}`}
          onClick={this.focusPhoneInput}>
          <input ref={(input) => { this.phoneNumberInput = input }} 
            className={this.state.noPhoneNumber?'error-tip':''} 
            onBlur={this.setPhoneNumber}
            placeholder={this.state.currentPlaceholder}
            type='text' />
        </div>
      </div>
    )
  }
}

export default accountInut