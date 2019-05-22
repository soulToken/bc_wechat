import React, { Component } from 'react';
import { List, InputItem, Button,Toast } from 'antd-mobile';
import './index.css'
import headTop from '../../static/images/acne/concatUs/head_top.png'
import center from '../../static/images/acne/concatUs/center.png'
import common_top from '../../static/images/acne/concatUs/common_top.png'
import submit_top from '../../static/images/acne/concatUs/submit.png'
import {intentional} from '../../api/api'

class App extends React.Component{
        constructor(props) {
            super(props);
            this.state={
                phone:"",
                name:'',
                industry:''
            }
          }
        componentDidMount(){
         
          
        }
        submit=(param)=>{
        // todo  调接口
        var self=this;
        
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
          });
          intentional(param).then(function(res){
            if (res.ok) {
              res.json().then((obj)=> {
              
                  if(obj.resultCode==="1000"){ 
                       
                    Toast.success('提交成功 !!!', 1);
                    setTimeout(function(){
                        self.props.history.go(-1)
                    },1000)
                   
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
        phoneChange=()=>{
           this.setState({
                phone:this.refs.phone.value
           })
        }
        nameChange=()=>{
            this.setState({
                name:this.refs.name.value
            })
        }
        industryChange=()=>{
            this.setState({
                industry:this.refs.industry.value
            })
        }

          //去注册
          gotoBind=()=>{
        
            if(!this.state.name.trim()){
            Toast.fail('请先输姓名 !!!', 1);
            return 
            }
           if(!this.state.phone.trim()){
            Toast.fail('请先输入手机号 !!!', 1);
            return 
           }
           if(this.state.phone.trim().length!=11){
            Toast.fail('手机号不合法 !!!', 1);
            return 
           }
           console.log(this.state.name,this.state.phone,this.state.industry)
            // this.submit()
            var param="name="+this.state.name.trim()+"&mobile="+this.state.phone.trim()+"&industry="+this.state.industry.trim()
            this.submit(param)
            
          }
          render(){
              return (
                 <div className="concatUs_box">
                     <img src={headTop} style={{width:'100%',display:'block'}} />
                     <div className="pos_rel flex_row just_content_center" style={{marginBottom:'5px'}}>
                        <img src={center} className="pos_abs" style={{width:'100%',display:'block',marginTop:'-1px'}} />
                        <div className="flex_column al_center" style={{width:'100%'}}>
                        <div className="flex_row al_center" style={{width:'85%',background:'url('+common_top+') no-repeat center',backgroundSize:'contain',height:'40px',zIndex:'2',marginBottom:"5px",paddingTop:'5px',paddingBottom:'5px'}}>
                            <span style={{width:'22%',textAlign:'center',fontWeight:'900'}}>姓名</span>
                            <input className="flex_1 input_box" ref="name" onChange={this.nameChange.bind(this)} placeholder="请输入您的名字" value={this.state.name} maxLength="20"    ></input>    
                        </div>
                        <div className="flex_row al_center" style={{width:'85%',background:'url('+common_top+') no-repeat center',backgroundSize:'contain',height:'40px',zIndex:'2',marginBottom:"5px",paddingTop:'5px',paddingBottom:'5px'}}>
                            <span style={{width:'22%',textAlign:'center',fontWeight:'900'}}>手机</span>
                            <input className="flex_1 input_box" ref="phone" onChange={this.phoneChange.bind(this)} placeholder="请输入您的手机号" value={this.state.phone}  type="tel" maxLength="11"  ></input>    
                        </div>
                        <div className="flex_row al_center" style={{width:'85%',background:'url('+common_top+') no-repeat center',backgroundSize:'contain',height:'40px',zIndex:'2',marginBottom:"5px",paddingTop:'5px',paddingBottom:'5px'}}>
                            <span style={{width:'22%',textAlign:'center',fontWeight:'900'}}>行业</span>
                            <input className="flex_1 input_box" ref="industry" onChange={this.industryChange.bind(this)} placeholder="请输入您的行业" value={this.state.industry}  maxLength="20"  ></input>    
                        </div>
                        </div>
                     </div>
                     <div style={{background:'url('+submit_top+') no-repeat center',backgroundSize:'contain'}} className="submitBtn" onClick={this.gotoBind.bind(this)}></div>          
                 </div>
              )
          }
}
export default App