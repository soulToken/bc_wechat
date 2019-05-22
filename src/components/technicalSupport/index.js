import React from 'react';
import support3 from '../../static/images/home/support_bg.png'
import support2 from '../../static/images/home/type3/concatUs.png'
import support4 from '../../static/images/toothType2/common/support.png'
import goSubject from '../../static/images/common/goSubject.png'
import {getClinicBanner} from '../../api/api'
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
            currentUrl:''
          }
  } 
    componentDidMount(){
        this.getBanner()
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
    getBanner = () => {
        var self = this;
        var param = "pageType=3"
        getClinicBanner(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        self.setState({
                            data: obj.result,
                            
                        })
                        if(obj.result&&obj.result.length>0){
                       
                            self.setState({
                                currentUrl: obj.result[obj.result.length-1].bannerUrl, 
                            })
                        }

                    } else {
                        Toast.hide()
                        Toast.fail(obj.resultMsg, 1);
                    }
                })

            }
        }).catch(function () {
            Toast.hide()
            Toast.fail("网络错误", 1);
        })
    }
  render() {
    var support;
    if(this.state.clinicShowType==2){
        support=(<img src={support2} style={{width:'70%'}} onClick={this.goWeb.bind(this)} />   )
    }
    // else if(this.state.clinicShowType=='03001'){
    //     support=(
    //         <div>
    //             <div style={{color:"rgba(166,166,166,1)"}}>
    //             <span>一一</span> 
    //             <span style={{marginLeft:'10px',marginRight:'10px'}}>深圳100健康提供技术支持</span>
    //             <span> 一一</span>
    //             </div>
    //             <div className="flex_column al_center" style={{marginTop:'15px'}}>
    //                 <span className="concatUs commonCol commonBor" onClick={this.goWeb.bind(this)}>我也要做小程序</span>
    //             </div>
    //         </div>
    //     )
    // }
    
    else if(this.state.clinicShowType=='01002'){
        support=(<img src={support4} style={{width:'70%'}} onClick={this.goWeb.bind(this)} />   )
    }else{
        support=(<img src={support3} style={{width:'70%'}} onClick={this.goWeb.bind(this)} />   )
    }
    return (
        <div className="flex_column al_center" style={{paddingBottom:'20px',paddingTop:'20px'}}>
                <img  src={this.state.currentUrl} style={{width:'100%',marginBottom:'10px'}}/>

                {
                    !this.state.showTabBar &&
                    <img src={goSubject} onClick={this.gotoSubject.bind(this)} style={{position:'fixed',right:'0',bottom:"50px",width:'50px'}} />
                }
                
                {support}
        </div>
    );
  }
}
export default technicalSupport