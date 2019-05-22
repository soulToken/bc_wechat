import React, { Component } from 'react';
import { List, InputItem, Button,Toast } from 'antd-mobile';
import './index.css'
import phoneUrl from '../../static/svg/phone_phone.svg'
import codeUrl from '../../static/svg/phone_verification.svg'
import {getVerifyCode,bindDoctorOpenId} from '../../api/api'
import TechnicalSupport from '../technicalSupport/index'
class App extends React.Component{
        constructor(props) {
            super(props);
            var from =null;
            if(this.props.location&&this.props.location.state&&this.props.location.state.from){
                from=this.props.location.state.from
            }
            if(this.props.location.state&&this.props.location.state.where){
                var where=this.props.location.state.where
            }else{
                var where=null
            }
            if(this.props.location.state&&this.props.location.state.phoneNumber){
                var phoneNumber=this.props.location.state.phoneNumber
            }else{
                var phoneNumber=null
            }
           
            this.state = {
        　　　　tel: 13407163853,
        　　　　btnText: '获取验证码',
        　　　　timer: 60,
        　　　　discodeBtn: false,
        　　　　clearInterval: false,
                getVerifyCode:getVerifyCode,
                from:from,
                newPhoneNumber:phoneNumber,
                where:where
            }
            document.title="绑定手机号"
            console.log(from,this)
          }
          
        //   componentWillReceiveProps(nextProps) {
        //     　　const { props } = this;
        //     　　const { openBox } = nextProps;
        //     　　// console.log('nextProps', nextProps);
        //     　　// 获取验证码
        //     　　if (props.openBox.sendBoxMobileCode !== openBox.sendBoxMobileCode) {
        //     　　　　const { code, message } = openBox.sendBoxMobileCode;
        //     　　　　if (code === '0') {
        //     　　　　　　this.count();
        //     　　　　} else {
        //     // 　　　　　　Toast.info(message);
        //     　　　　}
        //     　　}
        //     }
        componentDidMount(){
            
            // if(this.state.newPhoneNumber){
            //     this.phoneNumber.state.value=this.state.newPhoneNumber
            // }
            this.phoneNumber.state.value=""
          
        }
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
        //获取验证码接口
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
              }
              }).catch(function(){
                Toast.hide()
                Toast.fail("网络错误", 1);
              })
        }
        submit=()=>{
            var self=this;
            var param="mobile="+this.phoneNumber.state.value.replace(/ /g,'')+"&verifyCode="+this.codeNumber.state.value.replace(/ /g,'')
            bindDoctorOpenId(param).then(function(res){
                if (res.ok) {
                  res.json().then((obj)=> {
                      if(obj.resultCode==="1000"){ 
                            Toast.success("绑定成功");
                    
                                setTimeout(function(){
                                    self.props.history.push("/my")
                                },1000)
                      }else{
                    
                          Toast.fail(obj.resultMsg, 1);
                      }
                  })
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
          //去注册
          gotoBind=()=>{
            this.submit()
          }
          render(){
              return (
                  <div className="bind_box" style={
                      {
                          background:'#f7f7f7',
                          paddingLeft:'10px',
                          paddingRight:'10px',
                          height:'100%'
                       }
                  }>
                      <div className="bind_titleName">
                      {this.state.where=='my2' ? (
                         <span>为了更准确的为您提供服务，我们将短信验证您的手机</span>  
                        ) : (
                           <span>医生绑定手机号</span> 
                        )}


                               
                      </div>

                        <div className="phone_box" style={{width:"100%"}}>
                                <InputItem
                                    type="phone"
                                    placeholder="请输入手机号"
                                    extra="发送验证码"
                                    ref={el => this.phoneNumber = el}
                                > <img src={phoneUrl} />
                                </InputItem>
                        </div>
                       
                     
                        <div
                            className="code_box"
                            style={{
                                marginTop:'14px',
                                width:'100%'
                            }}
                        >

                        <InputItem
                            placeholder="请输入验证码"
                            extra={this.state.btnText}
                            ref={el => this.codeNumber = el}
                            maxLength={6}
                            onExtraClick={this.getCode.bind(this)}  
                        >
                        <img src={codeUrl} />
                        </InputItem>
                        </div>
            
                        <Button className="commonBtn" style={{width:'100%',marginTop:'30px',background:"#108ee9!important"}}  onClick={this.gotoBind.bind(this)} type="primary">绑定</Button>
                            <TechnicalSupport history={this.props.history}></TechnicalSupport>
                  </div>
              )
          }
}
export default App