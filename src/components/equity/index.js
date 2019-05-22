import React from 'react';
import equity from '../../static/images/equity/equity.png'
import huiyuan from '../../static/images/equity/huiyuan.png'
import v from '../../static/images/equity/v.png'
import small_v from '../../static/images/equity/small_v.png'
import xingxing from '../../static/images/equity/xingxing.png'
import qual from '../../static/images/equity/qual.png'


import support3 from '../../static/images/home/support_bg.png'
import support2 from '../../static/images/home/type3/concatUs.png'
import support4 from '../../static/images/toothType2/common/support.png'
import goSubject from '../../static/images/common/goSubject.png'
import {getClinicBanner,getUserMemberBenefits} from '../../api/api'
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
class technicalSupport  extends React.Component {
    constructor(props) {
        var sonSettingCode=window.sessionStorage.getItem('sonSettingCode');
        var showTabBar=true;
        if(sonSettingCode){
            showTabBar=false
        }
        super(props);
        var clinicShowType=sessionStorage.getItem('clinicShowType')
          this.state = {
            clinicShowType:clinicShowType,
            showTabBar:showTabBar,
            data:[],
            currentUrl:'',
            clinicClassEquity:[],
            nextGradeName:null,
            discount:null,
            cost_money_unit:null,
            addIntegral:null,
            max_increase_bonus:null,
            cost_bonus_unit:null,
            reduce_money:null,
            least_money_to_use_bonus:null,
            max_reduce_bonus:null,
            init_increase_bonus:null,
            gradeName:null,
            getanother:null,
          }
  } 
    componentDidMount(){
        document.title="会员权益";
        this.getDetail();
    }
    goWeb=()=>{
        this.props.history.push('/concatUs')
    }
    gotoSubject=()=>{
        var comeFrom=window.sessionStorage.getItem('comeFrom');
        console.log("页面来源"+comeFrom)
        if(comeFrom){
            //判断如果来源是小程序 则跳转到主程序界面;
            window.wx.miniProgram.switchTab({url: '/pages/subject/home'})
            return 
        }
        this.props.history.replace('/subject')
    }
    getDetail(){
        var self=this;
        getUserMemberBenefits().then((res) => {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                            if(!obj.result){
                                return 
                            }
                         
                            var discount=null;

                            if(obj.result.discount){
                                if(obj.result.discount==10){
                                    discount=9
                                }else{
                                    discount=(100-obj.result.discount)/10
                                }
                            }
                            var getanother=null;
                            if(obj.result.nextIntegralStart&&obj.result.integral){
                                    self.setState({
                                        getanother:obj.result.nextIntegralStart-obj.result.integral
                                    })
                            }
                            self.setState({
                                clinicClassEquity:obj.result.clinicClassEquity,
                                nextGradeName:obj.result.nextGradeName,
                                gradeName:obj.result.gradeName,
                                discount:discount,
                                cost_money_unit:obj.result.cost_money_unit?obj.result.cost_money_unit/100:'',
                                addIntegral:obj.result.addIntegral,
                                increase_bonus:obj.result.increase_bonus,
                                max_increase_bonus:obj.result.max_increase_bonus,
                                cost_bonus_unit:obj.result.cost_bonus_unit,
                                reduce_money:obj.result.reduce_money?obj.result.reduce_money/100:'',
                                least_money_to_use_bonus:obj.result.least_money_to_use_bonus?obj.result.least_money_to_use_bonus/100:'',
                                max_reduce_bonus:obj.result.max_reduce_bonus,
                                init_increase_bonus:obj.result.init_increase_bonus

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
    

  render() {
   return (
        <div>
                    <div className="equity_head_box flex_column al_center" style={{background:'rgba(6,128,255,1)'}}>
                        {
                            this.state.discount &&
                            <div className="equity_head_discount">
                                会员折扣{this.state.discount}折
                            </div>
                        }
                        <div className="flex_column just_content_end"  style={{width:'150px',height:'112px',background:'url('+xingxing+') no-repeat center',backgroundSize:'cover'}}>

                            <div style={{color:'#fff',fontSize:'14px',textAlign:'center',lineHeight:'30px'}}>{this.state.gradeName}</div>
                        </div>
                        <img src={qual} style={{width:'200px'}} />
                        {
                            this.state.getanother &&
                            <div className="equity_notice">再获取{this.state.getanother}积分升级为{this.state.nextGradeName}</div>
                        }
                    </div>

                    <div  className="equity_content_box">


                            {
                                 this.state.clinicClassEquity.length>0 &&
                                <div className="equity_content_box_inner flex_column">
                                        <div className="equity_level_top flex_row al_center just_content_center">
                                                <img src={v}  style={{height:'18px',width:'21px',marginRight:'6px'}}  />
                                            <span className="equity_top_text"> 会员等级权益</span>
                                        </div>
                                        {
                                            this.state.clinicClassEquity.map((item,index)=>
                                                <div className="flex_row" key={index} style={{paddingTop:'30px'}}>
                                                    <img src={huiyuan} className="equity_level_top_left"  />
                                                    <div className="flex_column flex_1 equity_level_top_right">
                                                            <div  className="equity_level_top_right_top"> {item.gradeName}</div>
                                                            <div className="equity_level_top_right_bottom"> {item.integralStart}~{item.integralEnd} 积分 {item.integralBenefit}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    
                                </div>
                            }



                                {
                                    this.state.cost_money_unit||this.state.increase_bonus||this.state.max_increase_bonus||this.state.cost_bonus_unit||this.state.reduce_money||this.state.least_money_to_use_bonus||this.state.max_reduce_bonus||this.state.init_increase_bonus &&
                             
                              <div className="equity_content_box_inner flex_column" style={{marginTop:'23px'}}>
                                    {
                                         this.state.cost_money_unit||this.state.increase_bonus||this.state.max_increase_bonus||this.state.cost_bonus_unit||this.state.reduce_money||this.state.least_money_to_use_bonus||this.state.max_reduce_bonus||this.state.init_increase_bonus    &&
                                         <div className="equity_level_top flex_row al_center just_content_center">
                                         <img src={small_v}  style={{height:'18px',width:'21px',marginRight:'6px'}}  />
                                        <span  className="equity_top_text"> 会员专享</span>
                                        </div>
                                    }
                                  
                                    {
                                        (this.state.cost_money_unit&&this.state.increase_bonus) &&
                                        <div className="flex_row al_center" style={{paddingTop:'10px'}}>
                                            <div className="equity_bule"></div>
                                            <div className="equity_bule_right_text">每消费{this.state.cost_money_unit}元，赠送{this.state.increase_bonus}积分</div>
                                        </div>
                                    }
                                   {
                                       this.state.max_increase_bonus &&
                                       <div className="flex_row al_center" style={{paddingTop:'10px'}}>
                                            <div className="equity_bule"></div>
                                            <div className="equity_bule_right_text">单次赠送上限{this.state.max_increase_bonus}积分</div>
                                        </div>
                                   }
                                    {
                                        (this.state.cost_bonus_unit&&this.state.reduce_money) &&
                                        <div className="flex_row al_center" style={{paddingTop:'10px'}}>
                                            <div className="equity_bule"></div>
                                            <div className="equity_bule_right_text">每使用{this.state.cost_bonus_unit}积分，抵扣{this.state.reduce_money}元</div>
                                        </div>
                                    }
                                    {
                                        (this.state.least_money_to_use_bonus&&this.state.max_reduce_bonus) &&
                                        <div className="flex_row al_center" style={{paddingTop:'10px'}}>
                                        <div className="equity_bule"></div>
                                        <div className="equity_bule_right_text">订单满{this.state.least_money_to_use_bonus}元可用，单笔上限{this.state.max_reduce_bonus}积分</div>
                                        </div>
                                    }
                                    {
                                        this.state.init_increase_bonus &&
                                        <div className="flex_row al_center" style={{paddingTop:'10px'}}>
                                            <div className="equity_bule"></div>
                                            <div className="equity_bule_right_text">激活赠送{this.state.init_increase_bonus}积分</div>
                                        </div>
                                    }
                                   


                            </div>
                            }



                    </div>
                   
        </div>
   )  
        
  }
}
export default technicalSupport