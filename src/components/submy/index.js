import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
import { TabBar, ListView } from 'antd-mobile';
import home from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import home_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import department from '../../static/images/subject/toobar/department.png'
import department_checked from '../../static/images/subject/toobar/department_checked.png'
import book from '../../static/images/subject/toobar/homepage_preconditioning_1@3x.png'
import book_checked from '../../static/images/subject/toobar/homepage_preconditioning@3x.png'
import personIcon from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import personIcon_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import medicine from '../../static/images/subject/index/medicine.png'
import surgery from '../../static/images/subject/index/surgery.png'
import stomatology from '../../static/images/subject/index/stomatology.png'
import chineseMedicine from '../../static/images/subject/index/chineseMedicine.png'
import gynaecology from '../../static/images/subject/index/gynaecology.png'
import pediatrics from '../../static/images/subject/index/pediatrics.png'
import service_box_bg from '../../static/images/subject/index/service_box_bg.png'
import radio from '../../static/images/subject/index/radio.png'
import question from '../../static/images/subject/index/question.png'
import online from '../../static/images/subject/index/online.png'
import common_title_bg from '../../static/images/subject/index/common_title_bg.png'
import banner from '../../static/images/subject/index/banner@3x.png'
import doctor_head from "../../static/images/subject/index/doctor_head.png"
import hospital from '../../static/images/subject/index/hospital.png'
import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast,ImagePicker,Radio ,Checkbox} from 'antd-mobile';

import {getUserBaseinfo} from '../../api/api'
import {modifyUserInfo,uploadPicture,getClinicBaseinfo} from '../../api/api'
import TechnicalSupport from '../technicalSupport/index'
import ChineseMedicineType2 from '../my/ChineseMedicineType2/index'
import './index.scss'


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

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);

const Item = List.Item;

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

// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }];





class ListExample extends React.Component {
  constructor(props) {
    super(props);
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
      clinicName:'',
      getUserBaseinfo:getUserBaseinfo,
      modifyUserInfo:modifyUserInfo,
      uploadPicture:uploadPicture,
      files:[]
    }
    document.title="个人中心"
  }
  componentDidMount(){
    console.log(minDate,new Date("1900-1-1"),this.state.time)
   
    this.getDetail();
    this.getClicicName();
  }
  getDetail=()=>{
    var self=this;
    var param=""
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    this.state.getUserBaseinfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
                 self.setState({
                  name:obj.result.name,
                  sex:obj.result.sex=='2'?'0':obj.result.sex,
                  birthday:obj.result.birthday||"1990-01-01",
                  mobile:obj.result.mobile,
                  headUrl:obj.result.headUrl,
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
    this.state.modifyUserInfo(param).then(function(res){
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
        const param="name="+value;
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
onChange = (files, type, index) => {
  // if(files.length>0){
  //  
  // }
  var self=this;
  var files=files[files.length-1]
  let formData = new FormData()
  formData.append('image', files.file)
  Toast.loading('Loading...', 0, () => {
    console.log('Load complete !!!');
  });
  this.state.uploadPicture(formData).then(function(res){
    if (res.ok) {
      res.json().then((obj)=> {
          if(obj.resultCode==="1000"){ 
              Toast.hide()
              if(obj.result&&obj.result.url){
                var param="headUrl="+obj.result.url
                self.changeMessage(param)
              }
          }else{
              Toast.hide()
              Toast.fail(obj.resultMsg, 1);
          }
      })
  }else{
    Toast.fail("图片过大",1)
  }
  }).catch(function(){
    Toast.hide()
    Toast.fail("网络错误", 1);
  })


}
showBrithday=()=>{

  
  if(this.state.birthday){
    return  
  }else{
    return null
  }
}

checkMemberList=()=>{

  this.props.history.push('/memberList')
}
gotoAppointment=()=>{
    this.props.history.push("/appointment")
}
goDeveloped=()=>{
    this.props.history.push('/developed')
}
getClicicName = () => {
    var self = this;
   getClinicBaseinfo().then((res) => {
        if (res.ok) {
            res.json().then((obj) => {
                if (obj.resultCode === "1000") {
                    Toast.hide()
                    this.setState({
                        clinicName:obj.result.clinicName
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


    var component;
    //this.state.clinicShowType=="02002"
    if(true){
        component= <ChineseMedicineType2 myNumber="harryBABA"  history={this.props.history}  state={this.state} method={this}></ChineseMedicineType2>
    }
    return (
      <div style={{height:'100%'}} className="subject">
    {component}
   
       <TechnicalSupport history={this.props.history}></TechnicalSupport>
   
      </div>);
  }
}

class TabBarExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'yellowTab',
        hidden: false,
      };
    }
    renderContent(pageText) {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
          <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                hidden: !this.state.hidden,
              });
            }}
          >
            Click to show/hide tab-bar
          </a>
        </div>
      );
    }
  
    render() {
      return (
          <div className="fixed" style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#356bb3"
            barTintColor="white"
            tabBarPosition="bottom"
            hidden={this.state.hidden}
            prerenderingSiblingsNumber={0}
          >
            <TabBar.Item
              title="首页"
              key="首页"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url('+home+') center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url('+home_checked+') center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
                this.props.history.push('/subject')
              }}
              data-seed="logId"
            >
            
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url('+department+') center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url('+department_checked+') center center /  21px 21px no-repeat' }}
                />
              }
              title="门诊"
              key="门诊"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
                this.props.history.push('/outpatient')
              }}
              data-seed="logId1"
            >
              {/* {this.renderContent('Koubei')} */}
              {/* <ListViewExample /> */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url('+book+') center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url('+book_checked+') center center /  21px 21px no-repeat' }}
                />
              }
              title="预约"
              key="预约"
      
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
                this.props.history.push('/subrecord')
              }}
            >
              {/* {this.renderContent('Friend')} */}
              {/* <ListViewExample /> */}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: personIcon }}
              selectedIcon={{ uri:personIcon_checked }}
              title="我的"
              key="我的"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              {/* {this.renderContent('My')} */}
              <ListExample  history={this.props.history}  />
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }
  
  export default TabBarExample 