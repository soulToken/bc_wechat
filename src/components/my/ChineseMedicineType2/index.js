import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
import xingbie1 from '../../../static/images/my/ChineseMedicineType2/sex_bg.png'
import riqi1 from '../../../static/images/my/ChineseMedicineType2/time_bg.png'
import haoma1 from '../../../static/images/my/ChineseMedicineType2/phone_bg.png'
import jilu from '../../../static/images/my/ChineseMedicineType2/jilu.png'
import baogao from '../../../static/images/my/ChineseMedicineType2/baogao.png'
import yuyue from '../../../static/images/my/ChineseMedicineType2/yuyue.png'
import chengyuan from '../../../static/images/my/ChineseMedicineType2/chengyuan.png'
import youhuiquan from '../../../static/images/my/ChineseMedicineType2/youhuiquan.png'
import dingdan from '../../../static/images/my/ChineseMedicineType2/dingdan.png'
import gouwuche from '../../../static/images/my/ChineseMedicineType2/gouwuche.png'
import dizhi from '../../../static/images/my/ChineseMedicineType2/dizhi.png'
import jifen from '../../../static/images/my/ChineseMedicineType2/jifen.png'
import shangpin from '../../../static/images/my/ChineseMedicineType2/shangpin.png'
import pintuan from '../../../static/images/my/ChineseMedicineType2/pintuan.png'
import {checkIsHaveMemberCard} from '../../../api/api'
import Mynumber from '../memberCenter/index'
import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast,ImagePicker,Radio ,Checkbox} from 'antd-mobile';
import './index.css'
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
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    var type=sessionStorage.getItem("clinicShowType")
    this.state = {
        isHaveMemberCard:null,
        showMember:false
    }
    document.title="个人中心"
  }
  componentDidMount(){
   console.log(this);
   var clinicConfigInfo= JSON.parse(window.sessionStorage.getItem('clinicConfigInfo'));  
    this.setState({
        isHaveMemberCard:clinicConfigInfo.isHaveMemberCard
    })
    if(clinicConfigInfo.isHaveMemberCard==1){
        checkIsHaveMemberCard().then((res)=>{
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                                            
                            if(obj.result&&obj.result.isHaveMemberCard==1){
                                this.setState({
                                    isHaveMemberCard:1
                                })
                            }else{
                                this.setState({
                                    isHaveMemberCard:0
                                })
                            }
                    } else {
                        Toast.fail(obj.resultCode, 1);
                    }
                })

            }           
        }).catch(()=>{

        })
    }
  





  }
  onChange=(files)=>{
        this.props.method.onChange(files)
  }
  changeSex=(v)=>{
    this.props.method.changeSex(v)
  }
  chooseSex=()=>{
      this.props.method.chooseSex()
  }
  changeBirthday=(date)=>{
      this.props.method.changeBirthday(date)
  }
  goBind=()=>{
      this.props.method.goBind()
  }
  develop=()=>{
    this.props.history.push("/developed")
  }
  signIn=()=>{
    Toast.success('签到成功 !!!', 1);
  }
  checkMemberList=()=>{
      this.props.method.checkMemberList()
  }
  changeName(){
      this.props.method.changeName()
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
  render() {
    return (
        
       <div>
         {this.state.isHaveMemberCard==1 ? (
        <Mynumber   history={this.props.history}  state={this.props.state} method={this.props.method}></Mynumber>
      ) : (
      
    
           
    





<div className="current3" >
    <div className="box">
        <div className="my_head_box commonBg">
        <div className="head_content_box">
        <div className="flex_column">
        <ImagePicker
        files={this.props.state.files}
        onChange={this.onChange.bind(this)}
        />
        </div> 
        </div>
        <div style={{position:'absolute',bottom:'0',width:'100%',justifyContent:'flex-end'}} className="name_box flex_column commonBg">
        <div className="flex_row just_content_center" style={{color:'#fff'}}>
        <span onClick={this.changeName.bind(this)}>{this.props.state.name}</span>
        </div>
        </div> 
        </div>
        <div className="header_down commonBg"></div>
        <div className="flex_row signIn al_center">
            <div className="flex_1" onClick={this.doctorBind.bind(this)}>{this.props.state.clinicName}</div>
            <div className="signIn_box" onClick={this.signIn.bind(this)}>签到</div>
        </div>
    </div>
    <div>
    <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'10px' }}>
               <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.props.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.props.state.sex)}
            >
              <Item 
               thumb={xingbie1}
              arrow="horizontal">性别</Item>
            </Picker>  
            <DatePicker
              mode="date"
              title="选择日期"
              extra="未填写"
              minDate={new Date("1900-01-01")}
              maxDate={this.props.state.time}
              value={this.props.state.birthday?new Date(this.props.state.birthday):null}
              onChange={this.changeBirthday.bind(this)}
            >
              <List.Item 
               thumb={riqi1}
              arrow="horizontal">出生日期</List.Item>
            </DatePicker> 
            <Item
              thumb={haoma1}
              extra={this.props.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机号码
              </Item>
          
    </List>
    </div>
    <div className="flex_wrap" style={{paddingTop:'15px',background:'white',marginTop:'10px'}}>
                    <div className="width_25 flex_column al_center" >
                            <img src={jilu} style={{width:'30%'}} onClick={this.develop.bind(this)} /> 
                            <span  onClick={this.develop.bind(this)}>诊疗记录</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={baogao} style={{width:'30%'}}  onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>我的报告</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={yuyue} style={{width:'30%'}}  onClick={this.goYuyue.bind(this)}/> 
                            <span onClick={this.goYuyue.bind(this)}>我的预约</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={chengyuan} style={{width:'30%'}}  onClick={this.checkMemberList.bind(this)}  /> 
                            <span onClick={this.checkMemberList.bind(this)}>家庭成员</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={youhuiquan} style={{width:'30%'}}  onClick={this.goCoupon.bind(this)} /> 
                            <span onClick={this.goCoupon.bind(this)}>我的优惠券</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={dingdan} style={{width:'30%'}} onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>我的订单</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={gouwuche} style={{width:'30%'}}  onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>购物车</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={dizhi} style={{width:'30%'}} onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>我的地址</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={jifen} style={{width:'30%'}}  onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>我的积分</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={shangpin} style={{width:'30%'}}  onClick={this.develop.bind(this)} /> 
                            <span onClick={this.develop.bind(this)}>积分商品</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={pintuan} style={{width:'30%'}}   onClick={this.develop.bind(this)}/> 
                            <span onClick={this.develop.bind(this)}>我的拼团</span>
                    </div>          
            </div>
</div>  
   )}
          
</div>   
);
  }
}

// export default withRouter(Iteme) 
export default  ListExample