import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
import TabBarExample from '../tooBar/tooBar'
import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast,ImagePicker,Radio ,Checkbox} from 'antd-mobile';
import { createForm } from 'rc-form';
import heardUrl from '../../static/images/doctor_team_portrait@3x.png'
import nameUrl from '../../static/svg/personal_name.svg'
import sexUrl from '../../static/svg/personal_sex.svg'
import ageUrl from '../../static/svg/personal_age.svg'
import phoneUrl from '../../static/svg/personal_phone.svg'
import {getUserBaseinfo} from '../../api/api'
import {modifyUserInfo,uploadPicture,getClinicBaseinfo} from '../../api/api'
import edit from '../../static/images/my/edit.png'
import myAppointment from '../../static/images/my/myAppointment.png'
import myAppointment1 from '../../static/images/my/type1/myAppointment1.png'
import myAppointment2 from '../../static/images/my/type2/myAppointment1.png'
import myJilu from '../../static/images/my/myJilu.png'
import myBaogao from '../../static/images/my/myBaogao.png'
import myJilu1 from '../../static/images/my/type1/myJilu1.png'
import myBaogao1 from '../../static/images/my/type1/myBaogao1.png'
import myJilu2 from '../../static/images/my/type2/myJilu1.png'
import myBaogao2 from '../../static/images/my/type2/myBaogao1.png'
import xingbie from '../../static/images/my/xingbie.png'
import riqi from '../../static/images/my/riqi.png'
import haoma from '../../static/images/my/haoma.png'
import chengyuan from '../../static/images/my/chengyuan.png'
import youhuijuan from '../../static/images/my/youhuijuan.png'
import dingdan from '../../static/images/my/dingdan.png'
import gouwuche from '../../static/images/my/gouwuche.png'
import dizhi from '../../static/images/my/dizhi.png'
import jifen from '../../static/images/my/jifen.png'
import pintuan from '../../static/images/my/pintuan.png'
//中医图片样式
import xingbie1 from '../../static/images/my/type1/xingbie.png'
import riqi1 from '../../static/images/my/type1/riqi.png'
import haoma1 from '../../static/images/my/type1/haoma.png'
import chengyuan1 from '../../static/images/my/type1/chengyuan.png'
import youhuijuan1 from '../../static/images/my/type1/youhuijuan.png'
import dingdan1 from '../../static/images/my/type1/dingdan.png'
import gouwuche1 from '../../static/images/my/type1/gouwuche.png'
import dizhi1 from '../../static/images/my/type1/dizhi.png'
import jifen1 from '../../static/images/my/type1/jifen.png'
import pintuan1 from '../../static/images/my/type1/pintuan.png'
import TechnicalSupport from '../technicalSupport/index'

//妇科
import xingbie2 from '../../static/images/my/type2/xingbie.png'
import riqi2 from '../../static/images/my/type2/riqi.png'
import haoma2 from '../../static/images/my/type2/haoma.png'
import chengyuan2 from '../../static/images/my/type2/chengyuan.png'
import youhuijuan2 from '../../static/images/my/type2/youhuijuan.png'
import dingdan2 from '../../static/images/my/type2/dingdan.png'
import gouwuche2 from '../../static/images/my/type2/gouwuche.png'
import dizhi2 from '../../static/images/my/type2/dizhi.png'
import jifen2 from '../../static/images/my/type2/jifen.png'
import pintuan2 from '../../static/images/my/type2/pintuan.png'
import ChineseMedicineType2 from './ChineseMedicineType2/index'
import './index.css'


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
    var clinicConfigInfo= JSON.parse(window.sessionStorage.getItem('clinicConfigInfo'));  
    if(clinicConfigInfo&&clinicConfigInfo.isMainClinic==1&&clinicConfigInfo.isManyClinics==1){
      this.props.history.push('/submy')
      return 
    }
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
                  name:obj.result.name||obj.result.nickName,
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
    }else{
        component=(
            <div>
            <div className="my_head_box">
            <div className="head_content_box">
                <div className="head_content_box_top flex_column">
                    <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange.bind(this)}
                    />
                    <div style={{paddingRight:'30px',paddingLeft:'140px'}} className="head_content_name_box flex_column">
                        <div className="flex_row head_content_name  al_center">
                                <span>{this.state.name}</span>
                                <img src={edit} className='editIcon'  onClick={this.changeName.bind(this)} />
                        </div>
                        {/* <div className="card_number" style={{opacity:'0'}}>会员卡号：1232131231232</div> */}
                    </div>
                    <div className="flex_row just_content_sa" style={{marginTop:'33px'}}>
                            <div className="flex_column al_center" onClick={this.gotoAppointment.bind(this)}>
                                {!this.state.clinicShowType &&
                                <img src={myAppointment} className="my_type_icon"  />
                                }
                                 {this.state.clinicShowType==1 &&
                                <img src={myAppointment1} className="my_type_icon"  />
                                }

                                  {this.state.clinicShowType==2 &&
                                <img src={myAppointment2} className="my_type_icon"  />
                                }
                                <span className="my_type_title">我的预约</span>
                            </div>
                            <div className="flex_column al_center" onClick={this.goDeveloped.bind(this)}>
                            {!this.state.clinicShowType &&
                                <img src={myJilu} className="my_type_icon"   />
                            }
                            {this.state.clinicShowType==1 &&
                                <img src={myJilu1} className="my_type_icon"   />
                            }
                             {this.state.clinicShowType==2 &&
                                <img src={myJilu2} className="my_type_icon"   />
                            }
                                <span className="my_type_title">诊疗记录</span>
                            </div>
                            <div className="flex_column al_center" onClick={this.goDeveloped.bind(this)}>
                            {!this.state.clinicShowType &&
                                <img src={myBaogao} className="my_type_icon"  />
                            }
                              {this.state.clinicShowType==1 &&
                                <img src={myBaogao1} className="my_type_icon"  />
                            }
                              {this.state.clinicShowType==2 &&
                                <img src={myBaogao2} className="my_type_icon"  />
                            }
                                <span className="my_type_title">我的报告</span>
                            </div>

                    </div>
                </div>
                     
            </div>
      

                 {/* <img className="head_url_center" src={this.state.headUrl}/>   */}
        </div>



        {this.state.clinicShowType==1 &&
        <div>
         <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'95px' }}>
                <Item
                thumb={xingbie1}
                onClick={() => {}}
                arrow="horizontal"
                >
                <div className="flex_row al_center">
                <span style={{marginRight:'44px'}}>性别</span>
                 <AgreeItem data-seed="man" checked={this.state.sex==1} onChange={this.changeNewSex.bind(this)}>
                    男
                </AgreeItem>
                <AgreeItem data-seed="woman" checked={this.state.sex==0} onChange={this.changeNewSex.bind(this)}>
                    女
                </AgreeItem>
          </div>
                </Item>
             {/* <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.state.sex)}
            >
              <Item 
               thumb={xingbie1}
              arrow="horizontal">性别</Item>
            </Picker> */}
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
               thumb={riqi1}
              arrow="horizontal">出生日期</List.Item>
            </DatePicker>
            <Item
              thumb={haoma1}
              extra={this.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机号码
              </Item>
              {/* 家庭成员 */}
              <Item
              thumb={chengyuan1}
              extra={`已添加${this.state.relativesNum}位`}
              arrow="horizontal"
              onClick={this.checkMemberList.bind(this)}>
              家庭成员
              </Item>
          </List>
          <List renderHeader={() => ' '}>
        <Item
          thumb={youhuijuan1}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >我的优惠券</Item>
        <Item
          thumb={dingdan1}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
        
          我的订单
        </Item>
        <Item
          thumb={gouwuche1}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >购物车</Item>
        <Item
          thumb={dizhi1}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的地址
        </Item>
        <Item
          thumb={jifen1}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >积分</Item>
        <Item
          thumb={pintuan1}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的拼团
        </Item>
      </List>
      </div>
       }
       {/* 中医类型 */}
       {!this.state.clinicShowType &&
        <div>
         <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'80px' }}>

                <Item
                thumb={xingbie}
                onClick={() => {}}
                arrow="horizontal"
                >
                <div className="flex_row al_center">
                <span style={{marginRight:'44px'}}>性别</span>
                 <AgreeItem data-seed="man" checked={this.state.sex==1} onChange={this.changeNewSex.bind(this)}>
                    男
                </AgreeItem>
                <AgreeItem data-seed="woman" checked={this.state.sex==0} onChange={this.changeNewSex.bind(this)}>
                    女
                </AgreeItem>
          </div>
                </Item>
             {/* <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.state.sex)}
            >
              <Item 
               thumb={xingbie}
              arrow="horizontal">性别</Item>
            </Picker> */}
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
               thumb={riqi}
              arrow="horizontal">出生日期</List.Item>
            </DatePicker>
            <Item
              thumb={haoma}
              extra={this.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机号码
              </Item>
              {/* 家庭成员 */}
              <Item
              thumb={chengyuan}
              extra={`已添加${this.state.relativesNum}位`}
              arrow="horizontal"
              onClick={this.checkMemberList.bind(this)}>
              家庭成员
              </Item>
          </List>
          <List renderHeader={() => ' '}>
        <Item
          thumb={youhuijuan}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >我的优惠券</Item>
        <Item
          thumb={dingdan}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
        
          我的订单
        </Item>
        <Item
          thumb={gouwuche}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >购物车</Item>
        <Item
          thumb={dizhi}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的地址
        </Item>
        <Item
          thumb={jifen}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >积分</Item>
        <Item
          thumb={pintuan}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的拼团
        </Item>
      </List>
      </div>
       }


       {/* 妇科类型 */}
       {this.state.clinicShowType==2 &&
        <div>
         <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'95px' }}>
                <Item
                thumb={xingbie2}
                onClick={() => {}}
                arrow="horizontal"
                >
                <div className="flex_row al_center">
                <span style={{marginRight:'44px'}}>性别</span>
                 <AgreeItem data-seed="man" checked={this.state.sex==1} onChange={this.changeNewSex.bind(this)}>
                    男
                </AgreeItem>
                <AgreeItem data-seed="woman" checked={this.state.sex==0} onChange={this.changeNewSex.bind(this)}>
                    女
                </AgreeItem>
          </div>
                </Item>
             {/* <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.state.sex)}
            >
              <Item 
               thumb={xingbie1}
              arrow="horizontal">性别</Item>
            </Picker> */}
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
               thumb={riqi2}
              arrow="horizontal">出生日期</List.Item>
            </DatePicker>
            <Item
              thumb={haoma2}
              extra={this.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机号码
              </Item>
              {/* 家庭成员 */}
              <Item
              thumb={chengyuan2}
              extra={`已添加${this.state.relativesNum}位`}
              arrow="horizontal"
              onClick={this.checkMemberList.bind(this)}>
              家庭成员
              </Item>
          </List>
          <List renderHeader={() => ' '}>
        <Item
          thumb={youhuijuan2}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >我的优惠券</Item>
        <Item
          thumb={dingdan2}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
        
          我的订单
        </Item>
        <Item
          thumb={gouwuche2}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >购物车</Item>
        <Item
          thumb={dizhi2}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的地址
        </Item>
        <Item
          thumb={jifen2}
          arrow="horizontal"
          onClick={() => {this.props.history.push("/developed")}}
        >积分</Item>
        <Item
          thumb={pintuan2}
          onClick={() => {this.props.history.push("/developed")}}
          arrow="horizontal"
        >
          我的拼团
        </Item>
      </List>
      </div>
       }
       </div>
        )
    }
    return (
      <div style={{height:'100%'}}>

      <div className="scrollTouch" style={{ position: 'absolute', bottom: '50px', top: '0', zIndex: '10',width:'100%' ,background:'#f5f5f5',overflowY: 'auto',paddingBottom:'20px'}}>

              


    {component}



       
    

       <TechnicalSupport history={this.props.history}></TechnicalSupport>
      </div>
        <TabBarExample></TabBarExample>
      </div>);
  }
}

// export default withRouter(Iteme) 
export default  ListExample