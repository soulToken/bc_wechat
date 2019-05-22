import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";


import head from '../../../static/images/my/memberCenter/head.png'
import member_v from '../../../static/images/my/memberCenter/member_v.png'
import head_pic from "../../../static/images/my/memberCenter/head_pic.png"
import jifen2 from '../../../static/images/my/memberCenter/jifen.png'
import yue from "../../../static/images/my/memberCenter/yue.png"
import youhuiquan2 from '../../../static/images/my/memberCenter/youhuiquan.png'
import have_sign from '../../../static/images/my/memberCenter/have_sign.png'
import sign from '../../../static/images/my/memberCenter/sign.png'
import signing from '../../../static/images/my/memberCenter/signing.png'
import yuyue from '../../../static/images/my/memberCenter/yuyue.png'
import baobiao from '../../../static/images/my/memberCenter/baobiao.png'
import jilu from '../../../static/images/my/memberCenter/jilu.png'
import dingdan from '../../../static/images/my/memberCenter/dingdan.png'
import gouwuche from '../../../static/images/my/memberCenter/gouwuche.png'
import pintuan from '../../../static/images/my/memberCenter/pintuan.png'
import dizhi from '../../../static/images/my/memberCenter/dizhi.png'
import not from '../../../static/images/my/memberCenter/not.png'
import {userSignIn,getUserSignInInfo,getActiveMemberCardUrl} from "../../../api/api"

import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast,ImagePicker,Radio ,Checkbox} from 'antd-mobile';
import './index.css'
const Item = List.Item;
const getWeek=function (i)     
{     
    var now = new Date();
    var firstDay=new Date(now - (now .getDay() - 1 ) * 86400000);
     firstDay.setDate(firstDay.getDate() + i);
    var mon = Number(firstDay.getMonth()) + 1;
   var day= mon<10?('0'+mon):mon
    return day+ "." + firstDay.getDate(); 
}


const timestampToTime=function (timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    var D = date.getDate();
  
    return M+D
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
    var type=sessionStorage.getItem("clinicShowType");

    var timeArr=[]
    for(var i=0;i<7;i++){
        timeArr.push({
            day:getWeek(i)
            })
    }
    this.state = {
        gradeName:null,
        countNum:null,
        userCouponNum:null,
        integral:null,
        isSingIn:null,
        headUrl:null,
        canClick:false,
        timeArr:timeArr,
        isActive:null,
        url:null,
        code:null,
    }
    document.title="个人信息"
  }
  componentDidMount(){
   console.log(this);
   
   this.getDetail()
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
  goEquity(){
    this.props.history.push('/equity')
  }
  goPersonMessage(){
    this.props.history.push('/personMessage')
  }

 
  getDetail(){
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
                            countNum:obj.result.countNum,
                            userCouponNum:obj.result.userCouponNum,
                            integral:obj.result.integral,
                            isSingIn:obj.result.isSingIn,
                            headUrl:obj.result.headUrl,
                            isActive:obj.result.isActive,
                            code:obj.result.code||'',
                            canClick:true
                       })
                    self.getUrl(obj.result.cardId)


                       if(obj.result&&obj.result.activateUrl&&obj.result.activateUrl.result&&obj.result.activateUrl.result.url){
                           self.setState({
                               url:obj.result.activateUrl.result.url
                           })
                       }

                     
                       var signInDays=obj.result.signInDays
                      if(signInDays.length>0){
                        var newArr=[]
                        signInDays.forEach(item => {
                             newArr=[]
                            self.state.timeArr.forEach((item2)=>{
                           
                                    if(timestampToTime(item.signinDate)==item2.day){
                                            item2.checked=true;         
                                    }
                                    var date=new Date();
                                    if(timestampToTime(date)==item2.day){
                                        item2.currentChecked=true
                                    }
                                    newArr.push(item2)
                            })

                          
                        });
                        console.log(newArr)
                        self.setState({
                            timeArr:newArr
                        })
                        




                       
                      } 

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
  goCoupon(){
      if(!this.state.userCouponNum&&this.state.userCouponNum!=0){
        Toast.fail("暂无可用优惠券", 1);
        return
      }
      this.props.history.push('/mycouponList')
  }
  jihuo(){

    if(this.state.url){
        window.location.href=this.state.url;
        return 
    }else{
        Toast.fail("暂无激活链接");
    }


   
   



     
  }


  getUrl(id){
    var self=this;
    if(!id){
        return 
    }
    getActiveMemberCardUrl(id).then((res) => {
        if (res.ok) {
            res.json().then((obj) => {
                if (obj.resultCode === "1000") {

                    if(!obj.result||!obj.result||!obj.result.url){
                        self.setState({
                            url:''
                        })
                        return
                    }
                
                    self.setState({
                        url:obj.result.url
                    })
                  
                  
                } else {
                    Toast.fail(obj.resultMsg, 1);
                }
            })

        }
    }
    ).catch((res) => {
        Toast.fail("网络错误", 1);
    })
  }
  sign(){
      var self=this;
      if(!this.state.canClick){
          return
      }
      if(this.state.isSingIn==1){
          return 
      }
    userSignIn().then((res) => {
        if (res.ok) {
            res.json().then((obj) => {
                if (obj.resultCode === "1000") {
                    Toast.success('签到成功 !!!', 1);
                    self.getDetail();
                } else {
                    Toast.fail(obj.resultMsg, 1);
                }
            })

        }
    }
    ).catch((res) => {
        Toast.fail("网络错误", 1);
    })
  }
  render() {
    return (
        

<div>
    <div className="member_head_box flex_column"  style={{background:'#fff url('+head+') no-repeat center',backgroundSize:'100% 100%'}}>

            {
                this.state.isActive &&
                <div className="flex_row just_content_end al_center" style={{marginTop:'10px'}}>
                    <div className="member_v"  onClick={this.goEquity.bind(this)} style={{background:'url('+member_v+') no-repeat center',backgroundSize:'100% 100%'}}></div>
                    <div style={{fontSize:'10px',marginLeft:'5px',marginRight:'35px'}}   onClick={this.goEquity.bind(this)}>我的权益</div>
                </div>
            }
           
            <div className="member_head_pic"  onClick={this.goPersonMessage.bind(this)}  style={{background:'url('+head_pic+') no-repeat center',backgroundSize:'100% 100%'}} >
                    <div className="member_head_pic_inner" style={{background:'url('+this.state.headUrl+') no-repeat center',backgroundSize:'100% 100%'}} ></div>
            </div>

            <div className="flex_row just_content_sb">
                    {
                        !this.state.isActive?(
                            <div className="member_head_not">未激活</div>
                        ):(
                            <div className="member_head_not2">{this.state.gradeName}</div>
                        )
                    }
                     {
                        !this.state.isActive?(
                            <div className="member_head_quickly">快速买单</div>
                        ):(
                            <div onClick={this.jihuo.bind(this)}  className="member_head_quickly  checked" >快速买单</div>
                        )
                    }
                   
            
            </div>
            <div className="dash_line"></div>
            {
                    this.state.isActive?(
                        <div className="member_card">{this.state.code}</div>
                    ):(
                        <div onClick={this.jihuo.bind(this)} className="member_head_oneKey">一键激活</div>
                       
                    )
            }
            
    </div>

    <div className="member_menu flex_row">
        <div className="member_menu_inner flex_1 flex_column al_center">
                <div className="flex_row al_center  member_menu_inner_inner">
                       <img   src={jifen2} style={{width:'11px',height:'14px',marginRight:'8px'}} />
                      <div > 积分</div>
                </div>
                <div className="member_menu_inner_title">{this.state.integral}</div>
        </div>
        <div className="member_menu_inner flex_1 flex_column al_center">
                <div className="flex_row al_center member_menu_inner_inner">
                       <img   src={yue} style={{width:'12px',height:'14px',marginRight:'8px'}} />
                      <div > 金额</div>
                </div>
                <div className="member_menu_inner_title">0.00</div>
        </div>
        <div onClick={this.goCoupon.bind(this)}  className="member_menu_inner flex_1 flex_column al_center">
                 <div  className="flex_row al_center member_menu_inner_inner">
                       <img   src={youhuiquan2} style={{width:'15px',height:'11px',marginRight:'8px'}} />
                      <div > 优惠券</div>
                </div>
                <div className="member_menu_inner_title">{this.state.userCouponNum}</div>
        </div>
    </div>

    <div className="flex_row just_content_center" style={{background:'#fff'}}>
        <div className="member_sign_box"  onClick={this.sign.bind(this)} style={{background:'#fff url('+(this.state.isSingIn==1?have_sign:not)+') no-repeat center',backgroundSize:'contain'}}></div>

    </div>
    <div className="member_sign_title">已连续签到<span className="member_sign_title_inner">{this.state.countNum}</span>天</div>


    <div className="member_sign_time_box flex_row">

          

              {this.state.timeArr.map((item,index) =>
                    <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    {
                            (index!=0) &&
                            <div className="member_sign_time_box_line checked"></div>
                    }
                   

                    {
                       index!=6   &&
                       <div className="member_sign_time_box_line2 checked"></div>
                    }




                 
                    <div className="member_sign_time_box_pic">
                            {
                               item.currentChecked ?(
                        <img className="member_sign_time_box_pic_sign" src={signing} />
                               ):(
                                   <div>
                                    {
                                        item.checked?(
                                            <img className="member_sign_time_box_pic_sign" src={sign} />
                                        ):(
                                                <span>+1</span>
                                        )
                                    }
                                    </div>
                               )
                               
                            }
                            
                    </div>
                    <div className="member_sign_time_box_time">{item.day}</div>
                    </div>
                )}
           
            {/* <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line checked"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1
                            <img className="member_sign_time_box_pic_sign" src={signing} />
                    </div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div>
            <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1</div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div>
            <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1</div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div>
            <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1</div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div>
            <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1</div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div>
            <div className="flex_1 flex_column al_center" style={{position:'relative'}}>
                    <div className="member_sign_time_box_line"></div>
                    <div className="member_sign_time_box_line2"></div>
                    <div className="member_sign_time_box_pic">+1</div>
                    <div className="member_sign_time_box_time">02.28</div>
            </div> */}

           
            
           
    </div>



    <div>
    <List className="date-picker-list  member" style={{ backgroundColor: 'white',marginTop:'10px' }}>
            
            <Item
              thumb={yuyue}
             
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              我的预约
              </Item>
              <Item
              thumb={baobiao}
             
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              我的报告
              </Item>
              <Item
              thumb={jilu}
           
              arrow="horizontal"
              onClick={this.goYuyue.bind(this)}
            >
              服务记录
              </Item>
              <Item
              thumb={dingdan}
             
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              我的订单
              </Item>
              <Item
              thumb={gouwuche}
            
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              购物车
              </Item>
              <Item
              thumb={pintuan}
              
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              我的拼团
              </Item>
              <Item
              thumb={dizhi}
          
              arrow="horizontal"
              onClick={this.develop.bind(this)}
            >
              我的地址
              </Item>
          
    </List>
    </div>
</div>  
  
);
  }
}

// export default withRouter(Iteme) 
export default  ListExample