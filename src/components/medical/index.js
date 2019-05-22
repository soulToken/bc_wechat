
import React, { Component } from 'react';
import { DatePicker, List, InputItem,Picker , Modal, Button, Toast,Flex,ActionSheet } from 'antd-mobile';
import nameUrl from '../../static/svg/personal_name.svg'
import sexUrl from '../../static/svg/personal_sex.svg'
import ageUrl from '../../static/svg/personal_age.svg'
import car from '../../static/images/car.png'
import phoneUrl from '../../static/svg/personal_phone.svg'
import success from '../../static/svg/online_booking_time_success.svg'
import codeUrl from '../../static/svg/phone_verification.svg'
import hospital from '../../static/svg/make_an_appointment_hospital.svg'
import {queryCanuseCoupon,getSignature4Js,modifyUserInfo,getUserBaseinfo,uploadPicture,getVerifyCode,verifyMobile,subscriberAppointmentInfo,getAllMembers,addRelatives,getClinicBaseinfo} from '../../api/api'
import './index.css'
import {GetRequest} from '../../util/index'
import TechnicalSupport from '../technicalSupport/index'

const prompt = Modal.prompt;


//时间设置
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  // const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr}`;
}

//定义
const Item = List.Item;
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
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
const relationStrArr = ['本人','父母','夫妻','子女','亲属','朋友','取消'];

class ListExample extends React.Component {
    //


  //初始化state数据
  constructor(props) {
    var medicalMessage=JSON.parse(window.localStorage.getItem('medicalMessage')) ;
    var isPayment=sessionStorage.getItem('isPayment');
    if(isPayment){
        isPayment=parseInt(isPayment)
    }
    var messObj={}
    if(medicalMessage){
        messObj=medicalMessage
    }
    if(!messObj.clisPrice){
        messObj.clisPrice=0
    }
    super(props);
    const param=GetRequest(this.props.location.search)
    if(param.id){
        var paymoney=parseFloat(param.id)>parseFloat(messObj.clisPrice)?0:parseFloat(parseFloat(messObj.clisPrice)-parseFloat(param.id)).toFixed(2);
    }else{
        var paymoney=parseFloat(messObj.clisPrice).toFixed(2);
    }
    this.state = {
      isPayment:isPayment,//是否可以支付
      disabled: true,
      couponPrice:param.id,
      match: this.props.match.path,
      history: this.props.history,
      messObj:messObj,
      clinicName:'',//预约诊所名称
      date: now,
      time: now,
      couponList:[],
      visible: false,
      price:paymoney,
      couponId:param.couponId?param.couponId:null,
      couponTitle:param.id?param.id+'元':'无优惠券可用',
      modifyUserInfo:modifyUserInfo,
      uploadPicture:uploadPicture,
      getVerifyCode:getVerifyCode,
      getAllMembers:getAllMembers,
      addRelatives:addRelatives,
      btnText: '获取验证码',
　　 　timer: 60,
      verifyMobile:verifyMobile,
　　 　discodeBtn: false,
　 　　clearInterval: false,
      subscriberAppointmentInfo:subscriberAppointmentInfo,
      files:[],
      relationArr:[],
      selectIndex:0,
      isAddMember:false,
      name:null,
      sex:null,
      birthday:null,
      mobile:null,
      relation:null,
      relativesId:null,
      mobileValid:null,
    }
    document.title="确认预约"
  }

  componentDidMount(){
    //获取上个页面本地存储的数据
    var self=this;
    var param=localStorage.getItem('medicalMessage')
    if(param){
      var data=JSON.parse(param)
      //获取选择的时间日期时间端
      this.setState({
        currentChooseDate:data.currentChooseDate,
        currentChooseTime:data.appointmentTime
      })
    }
      this.setState({
          from:this.props.match.params.id
      })
    //获取所有用户
    // this.getMembers();
    this.getClinicName();
    //获取个人信息 confirmMessage
    // var confirmMessage=JSON.parse(window.sessionStorage.getItem('confirmMessage'))
    // if(confirmMessage){
    //     this.setState(
    //         {
    //            name: confirmMessage.name,
    //            mobile:confirmMessage.mobile,
    //            sex:confirmMessage.sex
    //         },function(){
    //             self.canClick();
    //         }
    //     )
    // }else{
        this.getUserBaseinfo();
    // }
    //获取优惠券
    this.getCouponList()

 
  }
  //
  canClick(){
        if(this.state.mobile.length==11&&this.state.name.trim()){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
  }
  getWechat=(time,non,pack,pay)=>{
    var self=this;
    console.log(time,non,pack,pay)
    Toast.loading('Loading...', 0, () => {
        console.log('Load complete !!!');
      });
    getSignature4Js().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              // console.log()
              Toast.hide()
              if(obj.result){
                window.wx.config({
                  debug : false,
                  appId : obj.result.appId,
                  timestamp : obj.result.timestamp,
                  nonceStr : obj.result.noncestr,
                  signature : obj.result.signature,
                  jsApiList : [ 'checkJsApi', 'chooseWXPay']
              });
              window.wx.ready(function() {
                  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                  window.wx.checkJsApi({
                      jsApiList : ['checkJsApi','chooseWXPay'],
                      success : function(res) {
                          // 以键值对的形式返回，可用的api值true，不可用为false
                          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        //   alert(res)
                      }
                  });
                //   window.wx.hideOptionMenu();
                //   window.wx.hideAllNonBaseMenuItem();
                  // 2. 分享接口
                 
                  window.wx.chooseWXPay({
                    timestamp: time, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: non, // 支付签名随机串，不长于 32 位
                    package: pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: pay, // 支付签名
                    success: function (res) {
                    // 支付成功后的回调函数  成功之后跳转到相应的界面
                            // self.goOrder();
                            self.setState({
                                modal2:true,
                                show2:true
                            })
                    }
                    });
                })
                  window.wx.error(function(res){
                    //   alert(res)
                        Toast.hide()
                  });
              }
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




  //获取优惠券列表
  getCouponList(){
      var self=this;
    var param=(this.state.messObj.clisPrice?"paymentAmount="+this.state.messObj.clisPrice:'')
    queryCanuseCoupon(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){
                self.setState({
                  couponList:obj.result?obj.result:[],
                })
                if(!self.state.couponPrice&&obj.result&&obj.result.length&&obj.result.length>0){
                        self.setState({
                            couponTitle:obj.result[0].couponAmount+'元',
                            couponId:obj.result[0].couponId||obj.result[0].id,
                            price:(parseFloat(self.state.messObj.clisPrice)-parseFloat(obj.result[0].couponAmount)).toFixed(2)
                        })
                }
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
  //获取诊所名称 
  getClinicName=()=>{
      var self=this;
    getClinicBaseinfo().then((res)=>{
        if (res.ok) {

            res.json().then((obj)=> {
                if(obj.resultCode==="1000"){
                        Toast.hide()
                        self.setState({
                            clinicName:obj.result.clinicName
                        })
                }else{
                    Toast.fail(obj.resultCode, 1);
                }
               
    
            })
    
        }
    }
    ).catch((res)=>{
        Toast.fail("网络错误", 1);
    })
  }
  //获取个人用户信息
  getUserBaseinfo(){
    var self=this;
    getUserBaseinfo().then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                Toast.hide()
                   self.setState({
                    name:obj.result.name||obj.result.nickName,
                    sex:obj.result.sex=='2'?'0':obj.result.sex,
                    birthday:obj.result.birthday||"1990-01-01",
                    mobile:obj.result.mobile?obj.result.mobile:'',
                    headUrl:obj.result.headUrl,
                    relativesNum:obj.result.relativesNum,
                    mobileValid:obj.result.mobileValid,
                    files:[{
                      url:obj.result.headUrl
                    }]
                   },function(){
                       //判断是否可以点击
                        self.canClick();
                   })     
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
  //获取用户基本信息
  getMembers=()=>{
    var self=this;
    var param=""
    this.state.getAllMembers(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                self.setState({
                  relationArr : obj.result,
                });
                 self.setState({
                  name: self.state.relationArr[0].name,
                  sex: self.state.relationArr[0].sex,
                  birthday: self.state.relationArr[0].birthday,
                  mobile: self.state.relationArr[0].mobile,
                  relation: self.state.relationArr[0].relation,
                  mobileValid: self.state.relationArr[0].mobileValid,
                  isAddMember:self.state.relationArr.length == 0 ,
                 });
            }else{

                Toast.fail(obj.resultMsg, 1);
            }
        })

    }else{
        Toast.fail("网络错误", 1);
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }




 //选择关系  
 selectRelationShip=() =>{
  if ( !this.state.isAddMember ){
      return;
  }
  ActionSheet.showActionSheetWithOptions({
  options: relationStrArr,
  cancelButtonIndex: relationStrArr.length - 1,
  maskClosable: true,
  'data-seed': 'logId',
  wrapProps,
},
(buttonIndex) => {
  if (buttonIndex == 6){
    return
  }
  this.setState({ relation: relationStrArr[buttonIndex] });
});
}
//选择其他就诊人
  selectOtherPeople=() =>{
    const BUTTONS = [];
      this.state.relationArr.map(function(item,index){
          var b=item.name?item.name:'';
        var a= b + "(" + relationStrArr[item.relativesType - 1] + ")"
        BUTTONS.push(a)
    })
    BUTTONS.push('添加就诊人')
    BUTTONS.push('取消')
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
        var self=this;
      if (buttonIndex === BUTTONS.length - 2){
        self.setState({ 
          isAddMember: true,
          name: null,
          sex: null,
          birthday: null,
          mobile: null,
          relation: "本人",
          mobileValid: "0"
        });
      }else if (buttonIndex < BUTTONS.length - 2&&buttonIndex>=0){
          self.setState({ 
          isAddMember: false,
          selectIndex : buttonIndex,
          relativesId: self.state.relationArr[buttonIndex].relativesId,
          name: self.state.relationArr[buttonIndex].name,
          sex: self.state.relationArr[buttonIndex].sex,
          birthday: self.state.relationArr[buttonIndex].birthday,
          mobile: self.state.relationArr[buttonIndex].mobile,
          relation: relationStrArr[parseInt(self.state.relationArr[buttonIndex].relativesType)-1],
          mobileValid: self.state.relationArr[buttonIndex].mobileValid,
        });
      }
    });
  }
  //修改姓名调用方法
  changeName=() => {

    if ( !this.state.isAddMember ){
      return;
    }
    var self=this;
    ////探矿
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
        //改变的昵称
        self.setState({
            name:value
        })
        resolve()
      }),
    },
  ], 'default', null, ['请输入姓名'])
}

//填写手机号码方法
fillInMobile=()=>{

  if ( !this.state.isAddMember ){
    return;
  }
    if(this.state.mobileValid=='1'){
      return 
    }
    this.setState({
        modal1:true
    })
}
//选择性别方法
chooseSex=(v)=>{
v=v==2?'0':v
  if(v){
    return district.filter(function(item){
      return item.value==v
    })[0].label
  }
}
//修改性别方法
changeSex=(v)=>{

  var param="sex="+v[0]
  this.setState({
      sex:v[0]
  })
}

//修改生日
changeBirthday=(date)=>{
  var newDate=formatDate(date)
  var param="birthday="+newDate;
  this.setState({
    birthday:newDate
  })
}


//提交方法 先修改信息 然后在提交预约信息
toPreservation=()=>{
  if (!this.state.name) {
    Toast.info('请输入姓名', 1);
    return
  }
  if (!this.state.sex) {
    Toast.info('请选择性别', 1);
    return
  }
  if (!this.state.birthday) {
    Toast.info('请选择出生日期', 1);
    return
  }
  if (!this.state.mobile) {
    Toast.info('请填写手机号', 1);
    return
  }
  if (this.state.mobileValid == '0') {
    this.setState({
      modal2: true
    })
  }
  if(this.state.mobileValid=='1'){
      
      //提交预约信息
      this.subscribe()
  }
    return  
}
//下次验证手机方法 先修改信息 然后在提交预约信息
nextSpeck=()=>{
  this.setState({
    model2:false
  })
  this.subscribe()
}
//提交预约信息 添加本人或者是亲属信息
subscribe=()=>{
  var self=this;
  if (self.state.isAddMember){
    //先添加本人的信息
    if(self.state.relation == "本人"){
      var param2="name="+self.state.name+"&sex="+self.state.sex+"&birthday="+self.state.birthday+"&mobile="+self.state.mobile
      self.state.modifyUserInfo(param2).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                self.lastStepsubscriberAppointment()
              
              }else{
              
                  Toast.fail(obj.resultMsg, 1);
              }
          })
      } else{
        Toast.fail("网络错误", 1);
    }
      }).catch(function(err){
        Toast.fail("网络错误呢", 1);
      })
    
    }else{
      var param1="name="+self.state.name+"&sex="+self.state.sex+"&birthday="+self.state.birthday+"&mobile="+self.state.mobile+"&relativesType="+(relationStrArr.indexOf(this.state.relation) + 1)
      self.state.addRelatives(param1).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                self.setState({
                  relativesId : obj.result.relativesId,
                  isAddMember : false,  
                })
                self.lastStepsubscriberAppointment()
            }else{
               Toast.fail(obj.resultMsg, 1);
              }
          })
      }else{
        Toast.fail("网络错误", 1);
    }
      }).catch(function(err){
        Toast.fail("网络错误呢", 1);
      })
    }

   
  }else{
     self.lastStepsubscriberAppointment()
  } 


}
confirmChoose(){
    //判断不需要支付时直接预约成功，有支付时吊起支付
    if(this.state.price&&this.state.price!='0'){
        this.lastStepsubscriberAppointment();
    }else{
        this.lastStepsubscriberAppointment();
    }
}
//真正的提交预约接口信息 申请提交 
lastStepsubscriberAppointment=()=>{
  var self=this;
  var newParam=localStorage.getItem("nextParam")
  if(this.state.isPayment==1){
    var data="&appointmentName="+this.state.name+"&appointmentMobile="+this.state.mobile+"&appointmentSex="+this.state.sex+"&appointmentBirthday="+this.state.birthday+(this.state.couponId?"&couponId="+this.state.couponId:'')+"&paymentAmount="+(this.state.price?this.state.price:'');
  }else{
    var data="&appointmentName="+this.state.name+"&appointmentMobile="+this.state.mobile+"&appointmentSex="+this.state.sex+"&appointmentBirthday="+this.state.birthday;
  }

  this.state.subscriberAppointmentInfo(newParam+data).then(function(res){
    if (res.ok) {
      res.json().then((obj)=> {
          if(obj.resultCode==="1000"){ 
            //支付成功之后 
            var params=obj.result;
            //清空 存储得选择得数据()
            window.localStorage.removeItem('medicalMessage');
            window.localStorage.removeItem('nextParam');
            if(params&&params.timeStamp){
                self.getWechat(params.timeStamp,params.nonceStr,params.package,params.sign)
                return
            }
             self.setState({
              show2:true,
              modal2:true
             })
             //小程序判断成功之后跳转到 预约记录界面



          }else{
            self.setState({
              modal2:false
             })
              Toast.fail(obj.resultMsg, 1);
          }
      })
    }else{
        Toast.fail("网络错误", 1);
    }
  }).catch(function(){
    Toast.fail("网络错误", 1);
  })



}
//绑定成功方法  先修改信息 然后在提交预约信息
success=()=>{

  if(this.state.mobile.length<11){
    Toast.info('手机号格式不正确', 1);
    return
  }
  var self=this;
  var param="mobile="+this.phoneNumber.state.value.replace(/ /g,'')+"&verifyCode="+this.codeNumber.state.value.replace(/ /g,'')
  this.state.verifyMobile(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.info("绑定成功");
              self.setState({
                modal2:false
              })
              self.subscribe()
            }else{
          
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }else{
        Toast.fail("网络错误", 1);
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
}
  //获取code 
  getCode=()=>{
    if(this.state.btnText=="获取验证码"||this.state.btnText=="重新发送"){

        var value=this.phoneNumber.state.value.replace(/ /g,'');
        if(!value){
            Toast.info('请输入手机号!!!', 1);
            return 
        }
        var param="mobile="+value
        this.toGetCode(param)
      
    }
 }
 //获取验证码之后倒计时操作
count = () => {
            
  var timer=this.state.timer
  
  let siv = setInterval(() => {
      this.setState({ timer: (timer--), btnText: timer+'s', discodeBtn: true }, () => {
          if (timer === 0) {
              clearInterval(siv);
              this.setState({ btnText: '重新发送',timer:60, discodeBtn: false })
          }
      });
  }, 1000);
  }

 //获取验证码方法调用getVerifyCode接口
 toGetCode=(param)=>{
    var self=this;
    Toast.loading('Loading...', 0, () => {
        console.log('Load complete !!!');
      });
    this.state.getVerifyCode(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
          
              if(obj.resultCode==="1000"){ 
                   
                  self.setState({
                    remainpoint:obj.result.remainpoint
                  })
                    self.count()
                    Toast.hide()

              }else{
                    Toast.hide()
                  Toast.fail(obj.resultMsg, 1);
              }
          })
      }else{
        Toast.fail("网络错误", 1);
    }
      }).catch(function(){
        Toast.hide()
        Toast.fail("网络错误", 1);
      })
}
//验证码输入框内值的变化
handlechange=(v)=>{
    console.log(v)
    if(v.length==6){
        this.setState({
            disabled:false
        })
    }else{
        this.setState({
            disabled:true
        })
    }
}
//改变手机号码方法
phoneChange=(value)=>{
    console.log(value)
        if (value.replace(/\s/g, '').length < 11) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            hasError: false,
          });
        }
        this.setState({
          value,
        }); 
}
//确定手机号
mobileConfirm=()=>{
  if(!this.state.value){
    Toast.info('请输入内容!!!', 1, null, false);
    return
  }
  if(!this.state.value.trim()){
    Toast.info('请输入内容!!!', 1, null, false);
    return
  }
  if(this.state.value.replace(/\s/g, '').length < 11){
    Toast.info('请输入正确的手机号!!!', 1, null, false);
    return 
  }
   this.setState({
    modal1:false,
    mobile:this.state.value.replace(/\s/g, '')
   })
}
//跳转到订单页面
goOrder=()=>{
    var comeFrom=window.sessionStorage.getItem('comeFrom');
    console.log("页面来源"+comeFrom)
    if(comeFrom){
        //判断如果来源是小程序 则跳转到主程序界面;
        console.log("跳转到小程序")

        var clinicConfigInfo= JSON.parse(window.sessionStorage.getItem('clinicConfigInfo'));  
        if(clinicConfigInfo&&clinicConfigInfo.isMainClinic==1&&clinicConfigInfo.isManyClinics==1){
          this.props.history.push('/subrecord')
        }else{
            this.props.history.push('/appointment');
        }
        window.wx.miniProgram.switchTab({url: '/pages/person/registerList/registerList'})
        return 
    }
    console.log("跳转到公众号")
    this.props.history.push('/appointment')
}

onClose = key => () => {
  this.setState({
    [key]: false,
  });
}
//姓名修改
nameChange(val){
    console.log(val);
    this.setState({
        name:val
    },()=>{
        this.canClick()
    })
}
//电话号码修改
mobileChange(val){
    //清除空格  this.state.value.replace(/\s/g, '')
  
    this.setState({
        mobile:val.replace(/\s/g, '')
    },()=>{
        this.canClick()
    })
}
sexChange(e){
    var sex=null;
    if(this.state.sex==1){
        if(e==1){
            return 
        }
        this.setState({
            sex:2
        })
    }else{
        if(e!=1){
            return 
        }
        this.setState({
            sex:1
        })
    }
}
//手机号输入框获取焦点事件
phoneFocus(){
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
        document.getElementById("inputRef").blur();
        window.wx.miniProgram.navigateTo({url: '/pages/getNumber/index?source=2&sonSettingCode='+sonSettingCode+"&code="+code+'&openId='+openId})
    }
}
//优惠券列表
goCoupon(){
    if(this.state.couponList.length==0){
        Toast.info('暂无可用优惠券')
        return
    }
    var obj={
        mobile:this.state.mobile,
        sex:this.state.sex,
        name:this.state.name
    }
    window.sessionStorage.setItem('confirmMessage',JSON.stringify(obj))
    this.props.history.push('/coupon?id='+this.state.messObj.clisPrice)
}
//渲染 页面设置
  render() {
    return (
      <div style={{height:'100%'}} className="medical">
        <div style={{padding:'0 10px', }}>
            <div className="flex_column" style={{padding:'20px 18px',boxShadow:'1px 1px 2px 1px rgba(0,38,90,0.25)',background:'#fff',borderTop:'none',borderBottomRightRadius:'10px',borderBottomLeftRadius:"10PX" }}>
                    <div className="commonCol" style={{fontSize:'13px',color:"#0381FF",marginBottom:'15px'}}>{this.state.clinicName}</div>
                    <div className="flex_row" style={{paddingBottom:'14px',borderBottom:'1px solid #f4f3f7'}}>
                        <div style={{width:'60px',height:'60px',marginRight:'13px'}}>
                            <img src={hospital} style={{width:'100%',height:'100%'}} />
                        </div>
                        <div className="flex_1 flex_column" style={{lineHeight:'20px',fontSize:'12px'}}>
                            <span>预约项目：{this.state.messObj.appointmentServeritem}</span>
                            <span>预约医生：{this.state.messObj.doctorName||'到店安排'}</span>
                            <span>症状：{this.state.messObj.symptomStr||'暂无'}</span>
                        </div>
                    </div>
                    <div className="flex_row" style={{paddingTop:'12px',lineHeight:'18px',fontSize:'12px'}}>
                            <span>备注：</span>
                            <span>{this.state.messObj.textAreaValue||'暂无'}</span>
                    </div>
            </div>
        </div>
        {/* 判断是否需要支付 */}
        {
            (this.state.messObj.clisPrice!='0'&&this.state.isPayment==1) &&
            <div style={{paddingLeft:'18px',marginTop:'25px',marginBottom:'20px',fontSize:'15px'}}>
                待支付：<span style={{fontSize:'17px',color:'#ff8000'}}>{this.state.price}元</span>
            </div>
        }
        {
            (this.state.messObj.clisPrice!='0'&&this.state.isPayment==1) &&
            <List className="my-list" style={{borderTop:'1px solid #e7e6ed',borderBottom:'1px solid #e7e6ed'}}>
            <Item  
                arrow="horizontal" 
                extra={this.state.couponTitle}
                thumb={car}
                onClick={this.goCoupon.bind(this)}
            >优惠</Item>
            </List>
        }   
        <List  className="input_right_show"  style={{borderTop:'1px solid #e7e6ed',borderBottom:'1px solid #e7e6ed',marginBottom:'12px',marginTop:'12px'}}>
          <InputItem
            placeholder="请输入姓名"
            value={this.state.name}
            onChange={this.nameChange.bind(this)}
          >
            <div className="flex_row">
                <div style={{ backgroundImage: 'url('+nameUrl+')', backgroundSize: 'cover', height: '22px', width: '22px' }}></div>
                <span style={{marginLeft:'20px'}}>姓名</span>
            </div>
          </InputItem>
            <Item 
            className="sex_no_content"
            >
            <div className="flex_row al_center">
                <img  src={sexUrl} style={{width:'22px',height:'22px'}}  />
                <span style={{marginLeft:'20px'}}>性别</span>
                <div className="flex_1 flex_row just_content_end">
                        <div onClick={this.sexChange.bind(this,1)} className={this.state.sex==1?'sex_circle checked':'sex_circle'}>男</div>
                        <div onClick={this.sexChange.bind(this,2)} className={this.state.sex&&this.state.sex!=1?'sex_circle checked':'sex_circle'} style={{marginLeft:'20px'}}>女</div>
                </div>
            </div>
            </Item>
         <InputItem
            placeholder="请输入您的手机号码"
            type="phone"
            id="inputRef"
            ref={el => this.inputRef = el}
            value={this.state.mobile}
            onFocus={this.phoneFocus.bind(this)}
            onChange={this.mobileChange.bind(this)}
       
          >
            <div className="flex_row al_center">
                <div style={{ backgroundImage: "url("+phoneUrl+")", backgroundSize: 'cover', height: '22px', width: '22px' }}></div>
                <span style={{marginLeft:'20px'}}>手机</span>
            </div>
          </InputItem>
           
        </List>

        <div style={{padding:'30px 10px'}}>
                <Button onClick={this.confirmChoose.bind(this)} disabled={this.state.disabled} type="primary">确定</Button>
        </div>





        {/* 验证手机号弹框 */}
        <Modal

          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="请输入手机号"
          footer={ [
            { text: '取消', onPress: () => this.setState({modal1:false}), style: 'default' },
            { text: '确定', onPress: this.mobileConfirm.bind(this) },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}>
          <div style={{border:'1px solid #dbdbdb'}}>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            onChange={this.phoneChange.bind(this)}
            value={this.state.value}
          ></InputItem>
          </div>

        </Modal>
          {/* 预约成功 */}
       <Modal

          popup
          visible={this.state.modal2}
          maskClosable={false}
          onClose={this.onClose('modal2')}
          animationType="slide-up">
          <List className="popup-list">

          {this.state.show2 ? (
          <div>
             <div className="alertContent">
               <img src={success} />
               <div style={{color:"#000000",fontSize:'15px'}}>您已成功预约</div>
               <div className="chooseTimeshow">就诊时间 
            
                {this.state.currentChooseDate &&
                   <span> {this.state.currentChooseDate.label}号 </span>
                 }
                 {this.state.currentChooseTime}
               </div>
                </div>
                 <Button type="primary" onClick={this.goOrder.bind(this)}   style={{marginBottom:'30px'}}>确定</Button>
           </div>) : (
            <div className="bind_box" style={{
              background:'#f7f7f7',
              paddingLeft:'10px',
              paddingRight:'10px',
              height:'100%'
            }}>
            <div className="bindnotice">
               为了更及时准确的为您提供服务 我们将短信验证您的手机
            </div>
            
            <div className="phone_box" style={{width:"100%"}}>
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号"
                        extra="发送验证码"
                        value={this.state.mobile}
                        ref={el => this.phoneNumber = el}> 
                        <img src={phoneUrl} />
                    </InputItem>
            </div>
           
         
            <div
                className="code_box"
                style={{
                    marginTop:'14px',
                    width:'100%'
                  }}>

            <InputItem
                placeholder="请输入验证码"
                extra={this.state.btnText}
                ref={el => this.codeNumber = el}
                maxLength={6}
                onChange={v=>{this.handlechange(v)}}
                onExtraClick={this.getCode.bind(this)} >
            <img src={codeUrl} />
            </InputItem>
            </div>

            <Flex   style={{marginBottom:'25px'}}>
                    <Flex.Item>

                         <Button className="nextSpeck" style={{width:'100%',marginTop:'30px'}} onClick={this.nextSpeck.bind(this)}   type="primary">下次再说</Button>
                    </Flex.Item>
                    <Flex.Item>
                    <Button className="bind_btn" style={{width:'100%',marginTop:'30px'}}  onClick={this.success.bind(this)}   type="primary">立即验证</Button>

                    
                    </Flex.Item>
            </Flex>
          </div>)}
         </List>
        </Modal>
      </div>);
  }
}

export default  ListExample