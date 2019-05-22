import React from 'react';
import nodata from '../../static/images/common/no_data.png'
import { List, InputItem, Button ,Modal,Toast} from 'antd-mobile';
import { getDate } from '../../util/index'
import {modifyAppointmentStatus} from '../../api/api'
import success from '../../static/svg/online_booking_time_fail.svg'
import './index.css'
import TechnicalSupport from '../technicalSupport/index'
const alert = Modal.alert;
var QRCode = require('qrcode.react');
class technicalSupport  extends React.Component {
    constructor(props) {
        var message=null;
        var code=null;
        if(window.sessionStorage.getItem('appointmentMessage')){
            message=JSON.parse(window.sessionStorage.getItem('appointmentMessage')) 
             code={
                writeOffCode: message.writeOffCode,
                appointmentId:message.id
            } 
        }
        
        super(props);
          this.state = {
            message:message,
            modal2:false,
            code:JSON.stringify(code)
        }
  } 
  //sadas
    componentDidMount(){
            if(!this.state.message){
                this.props.history.go(-1);
            }
    }
    goWeb=()=>{
        
    }
    canCel=()=>{
        var self=this;
        var id=this.state.message.id;
        var money=this.state.message.paymentAmount;
        var payId=this.state.message.paymentId;

        if(money&&payId){
            this.setState({
                modal2:true
            })
            return
        }
        alert('确定要取消预约？', '', [
          { text: '取消', onPress: () =>{
    
          }  },
          { text: '确定', onPress: () =>{
            self.changeStatus(id)
          } },
        ])
      }

      goConfirm(){
        this.setState({
            modal2: false,
          });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }
      changeStatus=(id)=>{
        var self=this;
        var param="id="+id+"&appointmentStatus="+4
        modifyAppointmentStatus(param).then(function(res){
          if (res.ok) {
            res.json().then((obj)=> {
                if(obj.resultCode==="1000"){ 
                  Toast.info('取消预约成功!!!', 1);
                    self.props.history.go(-1)
                }else{
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
  render() {
    return (
        <div>
        {
            this.state.message &&
     
        <div className="flex_column" style={{paddingLeft:'12px',paddingRight:'12px'}}>
              
                <div className="flex_column mess_container">
                        <div className="detail_name">{this.state.message.clinicName}</div>
                        <div className="flex_row">
                                <img style={{width:'49px',height:'45px',marginRight:'20px'}} src="http://100health.oss-cn-hangzhou.aliyuncs.com/100care_manage/clinic/A0372B210C3E4AB287461188C614B609.png"></img>
                                <div className="flex_column">
                                        <div className="line_17">
                                               <span className="line_17_left"> 预约项目：</span>
                                               <span>{this.state.message.appointmentServeritem||'默认项目'}</span>
                                        </div>
                                        <div className="line_17">
                                               <span className="line_17_left"> 预约技师：</span>
                                                <span>{this.state.message.doctorName||'到店安排'}</span>
                                        
                                        </div>
                                        <div className="line_17">
                                               <span className="line_17_left"> 就诊时间：</span>
                                                <span>{getDate(this.state.message.appointmentDate)} {this.state.message.appointmentTime}</span>
                                        </div>
                                        {
                                            this.state.message.paymentAmount &&
                                            <div className="line_17">
                                               <span className="line_17_left"> 支付金额：</span>
                                                <span style={{color:'#FF8000'}}>{this.state.message.paymentAmount}</span>
                                            </div>
                                        }
                                        
                                </div>
                        </div>
                </div>
                {
                    (this.state.message.symptomSelect||this.state.message.symptomDesc) &&
                    <div className="flex_column mess_container" style={{marginTop:'10px'}}>
                       
                                <div className="flex_column">
                                    {this.state.message.symptomSelect &&
                                        <div className="line_17 flex_row">
                                                <span className="line_17_left"> 症 状：</span>
                                                <span>{this.state.message.symptomSelect}</span>
                                        </div>
                                    }
                                        {
                                            this.state.message.symptomDesc &&
                                            <div className="line_17 flex_row">
                                            <span className="line_17_left"> 备注信息：</span>
                                             <span>{this.state.message.symptomDesc}</span>
                                     
                                            </div>
                                        }
                                       
                        
                                </div>
        
                    </div>
                }

                {
                    (this.state.message.discountAmount||this.state.message.paymentOrderId||this.state.message.paymentId) &&

                 <div className="flex_column mess_container" style={{marginTop:'10px'}}>
                       
                       <div className="flex_column">
                           {this.state.message.discountAmount &&
                               <div className="line_17 flex_row">
                                       <span className="line_17_left"> 优惠金额：</span>
                                       <span>{this.state.message.discountAmount}</span>
                               </div>
                           }
                               {
                                   this.state.message.paymentOrderId &&
                                   <div className="line_17 flex_row">
                                   <span className="line_17_left"> 订单编号：</span>
                                    <span>{this.state.message.paymentOrderId}</span>
                            
                                   </div>
                               }

                                 {
                                   this.state.message.paymentId &&
                                   <div className="line_17 flex_row">
                                   <span className="line_17_left"> 支付编号：</span>
                                    <span>{this.state.message.paymentId}</span>
                            
                                   </div>
                               }
                              
               
                       </div>

                    </div>
                }



                {
                    this.state.message.writeOffCode &&
                    <div className="flex_column mess_container al_center" style={{marginTop:'10px'}}>
                        <span className="detail_notice_title">请收银员使用100健康管家验</span>
                        <QRCode value={this.state.code} />
                        <span className="detail_notice_wxcode">{this.state.message.writeOffCode}</span>
                    </div>
                }

                {
                    this.state.message.writeOffCode &&
                    <div className="flex_column mess_container " style={{marginTop:'10px'}}>
                                <div className="line_17 flex_column">
                                       <span className="line_17_left"> 预约订单说明：</span>
                                       <span className="line_17_left">
                                       1.过期未到店核销的订单，请及时联系商家取消并进行退款 
                                        </span>
                                        <span className="line_17_left">
                                        2.若预约时间冲突，商家会联系您协商
                                        </span>
                               </div>
                    </div>
                }
                {
                    this.state.message.appointmentStatus==1 &&
                    <Button className="commonBtn" style={{width:'100%',marginTop:'30px'}}  onClick={this.canCel.bind()}   type="primary">取消预约</Button>
                }
                <Modal

popup
visible={this.state.modal2}
maskClosable={false}
onClose={this.onClose('modal2')}
animationType="slide-up">
<List className="popup-list">

<div>
   <div className="alertContent">
     <img src={success} />
     <div style={{color:"#000000",fontSize:'15px',padding: '0 70px',lineHeight:'21px'}}>
        抱歉，该订单暂不支持线上取消 您可联系客服取消订单或前往门店
     </div>
     {/* <div className="chooseTimeshow">就诊时间 
  
      {this.state.currentChooseDate &&
         <span> {this.state.currentChooseDate.label}号 </span>
       }
       {this.state.currentChooseTime}
     </div> */}
      </div>
       <Button type="primary" onClick={this.goConfirm.bind(this)}   style={{marginBottom:'30px'}}>确定</Button>
 </div>
 </List>
</Modal>
        </div>
    }
    </div>
    );
  }
}
export default technicalSupport