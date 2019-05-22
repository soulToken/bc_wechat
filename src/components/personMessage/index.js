import React, { Component } from 'react';

import {modifyUserInfo,uploadPicture,getClinicBaseinfo,getUserBaseinfo,getUserSignInInfo} from '../../api/api'

import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast,ImagePicker,Radio ,Checkbox} from 'antd-mobile';
import './index.css'
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const prompt = Modal.prompt;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr}`;
  }
  
const alert = Modal.alert;
const district=[
    {
      value:'1',
      label:'男'
    },
    {
      value:'0',
      label:'女'
    }
  ]
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    var type=sessionStorage.getItem("clinicShowType")
    var type=sessionStorage.getItem("clinicShowType")
    this.state = {
      disabled: false,
      // match: this.props.match.path,
      history: this.props.history,
      sex:null,
      clinicShowType:type,
      ex:"qian",
      date: now,
      time: now,
      utcDate: utcNow,
      dpValue: null,
      customChildValue: null,
      visible: false,
      name:null,
      headUrl:null,
      relativesNum:0,
      nickName:null,
      clinicName:'',
      gradeName:'',
      getUserBaseinfo:getUserBaseinfo,
      modifyUserInfo:modifyUserInfo,
      uploadPicture:uploadPicture,
      files:[]
    }
    document.title="个人中心"
  }
  componentDidMount(){
   console.log(this)
   this.getDetail();
   this.getDetail2();
  }
  getDetail2(){
    var self=this;
  getUserSignInInfo().then((res) => {
      if (res.ok) {
          res.json().then((obj) => {
              if (obj.resultCode === "1000") {
                  if(!obj.result){
                      return
                  }
                     self.setState({
                          gradeName:obj.result.gradeName,
                      
                     })

              } else {
                  Toast.fail(obj.resultCode, 1);
              }
          })

      }
  }
  ).catch((res) => {
      Toast.fail("网络错误", 1);
  })
}





  getDetail=()=>{
    var self=this;
    var param=""
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    getUserBaseinfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
                 self.setState({
                  name:obj.result.name||obj.result.nickName,
                  sex:obj.result.sex=='2'?'0':obj.result.sex,
                  birthday:obj.result.birthday||"1990-01-01",
                  mobile:obj.result.mobile,
                  headUrl:obj.result.headUrl,
                  nickName:obj.result.nickName,
                  relativesNum:obj.result.relativesNum,
                  mobileValid:obj.result.mobileValid,
                  files:[{
                    url:obj.result.headUrl
                  }]
                 })     
                  window.localStorage.setItem("loginInfo",JSON.stringify(obj.result))
            }else{
                Toast.hide()
                Toast.fail(obj.resultMsg, 1);
            }
        })

    }
    }).catch(function(){
      Toast.hide()
      Toast.fail("网络错误", 1);
    })
  }
  changeMessage=(param,resolve)=>{
    var self=this;
    modifyUserInfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                self.getDetail()
                if(resolve){
                  resolve()
                }
               
            }else{
              if(resolve){
                resolve()
              }
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(err){
      // alert(err)
      // Toast.fail(res,1)
      Toast.fail("网络错误呢", 1);
    })
  }
  changeName=() => {
    var self=this;
    prompt('', '请输入名字',
  [
    {
      text: '取消',
      onPress: value => new Promise((resolve) => {
        resolve()
      }),
    },
    {
      text: '确定',
      onPress: value => new Promise((resolve, reject) => {
        if(!value.trim()){
          Toast.info('不可以输入空姓名 !!!', 1);
          return 
        }
        if(value.trim().length>16){
          Toast.info('最多输入16个字符 !!!', 1);
          return 
        }
        const param="nickName="+value;
        self.changeMessage(param,resolve)
      }),
    },
  ], 'default', null, ['请输入姓名'])
}
goBind=()=>{
  var self=this;

  //判断是否跳转到小程序授权手机号界面

  var comeFrom=window.sessionStorage.getItem('comeFrom');
  //判断小程序跳转并且没有绑定手机号
 
  var sonSettingCode=""
  if(window.sessionStorage.getItem('sonSettingCode')){
      sonSettingCode=window.sessionStorage.getItem('sonSettingCode')
  }
  var clinicConfigInfo=null;
  if(window.sessionStorage.getItem('clinicConfigInfo')){
      clinicConfigInfo= JSON.parse(window.sessionStorage.getItem('clinicConfigInfo'))
  }
  var code=""
  if(clinicConfigInfo&&clinicConfigInfo.clinicId){
      code=clinicConfigInfo.clinicId

  }
  var openId=""
  var loginInfo=JSON.parse(window.localStorage.getItem("loginInfo"));
  if(loginInfo&&loginInfo.openId){
      openId=loginInfo.openId
  }
  if(!this.state.mobile&&comeFrom){
      // 输入框失去焦点
      window.wx.miniProgram.navigateTo({url: '/pages/getNumber/index?source=3&sonSettingCode='+sonSettingCode+"&code="+code+'&openId='+openId})
      return 
  }








  if(this.state.mobileValid=='1'){
    const alertInstance = alert('提示', '已经绑定过确定修改绑定吗???', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () =>  self.props.history.push({ pathname:'/bind',state:{where : 'my'} }) },
    ]);

    return 
  }
  if(this.state.mobileValid=='0'&&this.state.mobile){
    self.props.history.push({ pathname:'/bind',state:{where : 'my2',phoneNumber:this.state.mobile} }) 
  }else{
  
    self.props.history.push({ pathname:'/bind',state:{where : 'my'} })
  }
 
 
    // alertInstance.close();

 
}
chooseSex=(v)=>{
  if(v){
    return district.filter(function(item){
      return item.value==v
    })[0].label
  }
}
changeSex=(v)=>{
  var param="sex="+v[0]
  this.changeMessage(param)
}
changeBirthday=(date)=>{
  var newDate=formatDate(date)
  var param="birthday="+newDate;
  this.changeMessage(param)
}
  goYuyue=()=>{
        //如果在主诊所里面  则点击预约跳转到主诊所我的预约;
        var clinicConfigInfo= JSON.parse(window.sessionStorage.getItem('clinicConfigInfo'));  
        if(clinicConfigInfo&&clinicConfigInfo.isMainClinic==1&&clinicConfigInfo.isManyClinics==1){
          this.props.history.push('/subRecord')
          return 
        }
        this.props.history.push('/appointment')
  }
  doctorBind(){
      this.props.history.push('/doctorBind')
  }
  goCoupon(){
    this.props.history.push('/mycouponList')
  }
  goEquity(){
    this.props.history.push('/equity')
  }
  develop=()=>{
    this.props.history.push('/developed')
  }
  changeNewSex=(e)=>{
    console.log(e)
   if(e.target.checked==false){
       return 
   } 
    if(e.target.children=="男"){
        var param="sex="+1
        this.changeMessage(param)
    }else{
        var param="sex="+0
        this.changeMessage(param)
    }
}
  render() {
    return (
        

<div>
  

    <List className="date-picker-list  member" style={{ backgroundColor: 'white',marginTop:'10px' }}>
            
            <Item
              extra={this.state.nickName}
              arrow="horizontal"
              onClick={this.changeName.bind(this)}
            >
              昵称
              </Item>
           
              <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.props.sex)}
            >
              <Item 
              arrow="horizontal">性别</Item>
            </Picker>  
            <Item
           
              extra={this.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机号码
              </Item>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="未填写"
              minDate={new Date("1900-01-01")}
              maxDate={this.state.time}
              value={this.state.birthday?new Date(this.state.birthday):null}
              onChange={this.changeBirthday.bind(this)}
            >
              <List.Item 
              arrow="horizontal">出生日期</List.Item>
            </DatePicker> 
           





              <Item
           
              
              
              extra={this.state.gradeName}              
              arrow="horizontal"
             
            >
              会员等级
              </Item>
          
    </List>
    </div>

  
);
  }
}

// export default withRouter(Iteme) 
export default  ListExample