
import React, { Component } from 'react';
import { DatePicker, List, InputItem,Picker , Modal, Button, Toast,Flex,ActionSheet } from 'antd-mobile';
import nameUrl from '../../static/svg/personal_name.svg'
import sexUrl from '../../static/svg/personal_sex.svg'
import ageUrl from '../../static/svg/personal_age.svg'
import phoneUrl from '../../static/svg/personal_phone.svg'
import success from '../../static/svg/online_booking_time_success.svg'
import codeUrl from '../../static/svg/phone_verification.svg'
import {modifyUserInfo,uploadPicture,getVerifyCode,verifyMobile,subscriberAppointmentInfo,getAllMembers,addRelatives} from '../../api/api'
import './index.css'
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
  //初始化state数据
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      match: this.props.match.path,
      history: this.props.history,
      date: now,
      time: now,
      visible: false,
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
    document.title="就诊信息"
  }

  componentDidMount(){
    //获取上个页面本地存储的数据
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
    this.getMembers()
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
          // debugger;
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
//真正的提交预约接口信息 申请提交
lastStepsubscriberAppointment=()=>{
  var self=this;
  var newParam=localStorage.getItem("nextParam")
  if(this.state.relativesId){
    var data="&appointmentName="+this.state.name+"&appointmentMobile="+this.state.mobile+"&appointmentSex="+this.state.sex+"&appointmentBirthday="+this.state.birthday+"&relativesId="+this.state.relativesId
  }else{
    var data="&appointmentName="+this.state.name+"&appointmentMobile="+this.state.mobile+"&appointmentSex="+this.state.sex+"&appointmentBirthday="+this.state.birthday
  }

  this.state.subscriberAppointmentInfo(newParam+data).then(function(res){
    if (res.ok) {
      res.json().then((obj)=> {
          if(obj.resultCode==="1000"){ 
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

//渲染 页面设置
  render() {
    return (
      <div style={{height:'100%'}} className="medical">
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
                    <Button className="bind_btn" style={{width:'100%',marginTop:'30px'}} disabled={this.state.disabled} onClick={this.success.bind(this)}   type="primary">立即验证</Button>
                    </Flex.Item>
            </Flex>
          </div>)}
         </List>
        </Modal>
        <div style={{ position: 'absolute', bottom: '50px', top: '0', zIndex: '10',width:'100%' ,background:'#f5f5f5'}}>
          { this.state.relationArr.length == 0 &&
          <div style={{backgroundColor:'#F9A038',height:'75px'}}>
              <p style={{paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',textAlign:'left',color:'white'}}
              >请填写您的基本信息以确保证就诊时验证，也可以为您的亲友进行预约</p>
          </div>
          }    
         <List className="date-picker-list" style={{ backgroundColor: 'white'}}>
          {/***修改姓名的或者选择其他就诊人**/}
         { this.state.isAddMember ? (
            <Item
              thumb={nameUrl}
              arrow="horizontal"
              extra={this.state.name || "填写姓名"}
              onClick={this.changeName.bind(this)}>
              姓名
            </Item>
          ) : (
           <Item
             thumb={nameUrl}
             arrow="horizontal"
             extra={this.state.name}
             onClick={this.selectOtherPeople.bind(this)}>
             选择就诊人
          </Item>
         )}
           {/***性别**/}
           { this.state.isAddMember ? (
            <Picker data={district} cols={1}  
          className="forss"
          value={[this.state.sex]}
          onChange={this.changeSex.bind(this)}
          onOk={v =>this.setState({sex:v[0]})}
          extra={this.chooseSex(this.state.sex)}>
         <Item 
          thumb={sexUrl}
          arrow="horizontal">
          性别
         </Item>
        </Picker>
           ):(
            <Item 
            thumb={sexUrl}
            arrow="horizontal"
            extra={this.chooseSex(this.state.sex)}
            >性别</Item>
           )}
          

      {/***生日选择**/}
      { this.state.isAddMember ? (
             <DatePicker
               mode="date"
               title="选择日期"
               extra="未填写"
               minDate={new Date("1900-01-01")}
               maxDate={this.state.time}
               value={this.state.birthday?new Date(this.state.birthday):null}
               onChange={this.changeBirthday.bind(this)} >
               <List.Item 
                thumb={ageUrl}
               arrow="horizontal">生日
               </List.Item>
             </DatePicker>
      ) : (
        <List.Item 
        thumb={ageUrl}
        extra={this.state.birthday}>
        生日
       </List.Item>
      )}

      {/***电话号码**/}
    {this.state.mobileValid == '1' ? ( <
        Item thumb = {
          phoneUrl
        }
        extra = {
          this.state.mobile || "填写手机"
        }
        onClick = {
          this.fillInMobile.bind(this)
        } >
        手机 
        </Item>
      ) : ( <
        Item thumb = {
          phoneUrl
        }
        extra = {
          this.state.mobile || "填写手机"
        }
        arrow = "horizontal"
        onClick = {
          this.fillInMobile.bind(this)
        } >
        手机 </Item>
      )
    }
     {/***关系**/}
     <Item 
     thumb={sexUrl}
     extra={this.state.relation ? this.state.relation : "本人"}
     onClick = {this.selectRelationShip.bind(this)}
     arrow="horizontal"
     >关系</Item>

    </List> 
      <Button type="primary"   onClick={this.toPreservation.bind(this)} inline style={{ marginRight: '4px',width:'94%',marginLeft:'3%',marginTop:'40px' }}>提交</Button>
        <TechnicalSupport history={this.props.history}></TechnicalSupport>
      </div>
        
      </div>);
  }
}

export default  ListExample