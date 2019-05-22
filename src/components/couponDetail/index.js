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
        document.title="详情"
        if(window.sessionStorage.getItem('couponMessage')){
            message=JSON.parse(window.sessionStorage.getItem('couponMessage')) 
             code={
                userCouponId: message.id,
                couponId:message.couponId,
                writeOffCode:message.writeOffCode
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
      bindOrYuyue = () => {
        localStorage.removeItem("medicalMessage")
        this.props.history.push('/onlineBook')
      }
  render() {
    return (
        <div  >
        {
            this.state.message &&
        <div className="flex_column al_center"  style={{height:'100%',background:'rgba(215,183,117,1)',position:'fixed',top:0,bottom:0,left:0,right:0}}>
                <div style={{paddingLeft:'23px',paddingRight:'23px',width:'100%'}} className="box_sizing flex_column al_center">
                        <div style={{width:'100%',background:'#fff',marginTop:'55px'}} className="flex_column al_center  coupon_detail_box">
                                <span className="coupon_detail_title">{this.state.message.clinicName}</span>
                                <div className="coupon_center_center flex_row al_center just_content_sb"  style={{position: 'relative',zIndex:3}}>
                                    <div className="coupon_line">
                                    </div>
                                    <div className="half_circle22s"></div>
                                    <div class="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div class="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle22"></div>
                                    <div className="whole_circle2222"></div>
                                    <div className="half_circle22"></div>
                                </div>

                                <div className="coupon_detail_money">{this.state.message.couponAmount}元优惠券</div>
                               
                                <QRCode value={this.state.code} />
                                <span style={{fontSize:'18px',marginTop:'5px'}}>{this.state.message.writeOffCode}</span>
                                <span style={{fontSize:'10px',color:'color:rgba(0,0,0,0.5)',marginBottom:'22px',marginTop:'10px'}}>请收银员使用100健康管家验</span>
                        </div>
                        <div className="coupon_detail_date">与{getDate(this.state.message.endDate)}到期</div>
                </div>
                <div style={{paddingLeft:"12px",paddingRight:'12px',marginTop:'40px',width:'100%'}} className="box_sizing">
                        <div className='coupon_detail_btn' onClick={this.bindOrYuyue.bind(this)}>立即预约</div>
                </div>

        </div>
        }
    </div>
    );
  }
}
export default technicalSupport