import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card ,Carousel, WingBlank} from 'antd-mobile';
import './index.css'
import timeBg from '../../../static/images/home/type3/time_bg.png'
import phoneBg from '../../../static/images/home/type3/phone_bg.png'
import addressBg from '../../../static/images/home/type3/address_bg.png'
import zhensuo from '../../../static/images/home/type3/zhensuo.png'
import yisheng from '../../../static/images/home/type3/yisheng.png'
import huodong from '../../../static/images/home/type3/huodong.png'
import dizhi from '../../../static/images/home/type3/dizhi.png'
import wifi from '../../../static/images/home/type3/wifi.png'
import yuyue from '../../../static/images/home/type3/yuyue.png'
import xiangmu from '../../../static/images/home/type3/xiangmu.png'
import anli from '../../../static/images/home/type3/anli.png'
import commonHead from '../../../static/images/home/type3/common_head.png'
import serivceTitle from '../../../static/images/home/type3/service_title.png'
import doctorTitle from '../../../static/images/home/type3/doctor_head.png'
import serviceBig from '../../../static/images/home/type3/service_big.png'
import head from '../../../static/images/home/type3/header.png'
import yiyuanIntroduce from "../../../static/images/home/type3/type3_yiyuan_introduce.png"
import yiyuanEnvironment from "../../../static/images/home/type3/type3_environment.png"
import banner from '../../../static/images/home/type3/banner@3x.png'
import cellBg  from '../../../static/images/home/type3/type3_cell_bg.png'
//妇科的主页组件
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: 0};
    
    }
  
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
          console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    componentWillUpdate(nextProps, nextState) {
          console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
    click(){
        console.log("惦记我")
    }
    callPhone(){
        this.props.method.callPhone()
    }
    openMap(){
        this.props.method.openMap()
    }
    goIntroduce(){
        this.props.method.goIntroduce()
    }
    goMoreDoctor(){
        this.props.method.goMoreDoctor()
    }
    goActivity(){
        this.props.method.goActivity()
    }
    wifi(){
        this.props.method.wifi()
    }
    bindOrYuyue(id,name){
        if(id&&name){
            sessionStorage.setItem("doctorId",id);
            sessionStorage.setItem("doctorName",name);
        }else{
            sessionStorage.removeItem("doctorId");
            sessionStorage.removeItem("doctorName");
        }
        sessionStorage.removeItem("clisName")
        sessionStorage.removeItem("serverId")
        this.props.method.bindOrYuyue()
    }
    goServiceItem(){
        // this.props.method.goServiceItem()
        document.getElementById("scroller").scrollIntoView();
    }
    call(val){
        if (!val) {
            Toast.info('暂无联系方式 !!!', 1);
            return
        }
        window.location.href = 'tel://' + val;
    }
    handleClick(e){
        this.props.method.handleClick(e)
    }
    previewImage(index){
        this.props.method.previewImage(index)
    }
    //跳转到案例
    goCase(){
        this.props.history.push("/case")
    }
    gotoDetail(id,name){
        sessionStorage.setItem("clisName",name)
        sessionStorage.setItem("serverId",id)
        this.props.method.gotoDetail(id)  
    }
    gotoDetail2(id,e,name){
        sessionStorage.setItem("clisName",name)
        sessionStorage.setItem("serverId",e)
        this.props.history.push('/serviceItems/' + id+"?type=1") 
    }
      render() {
        var userMessage;
        if (this.props.myNumber) {
          userMessage = (
            <span>
           
              <p onClick={this.click.bind(this)}>You can visit settings to reset your password</p>
            </span>
          )
        } else {
          userMessage = (
            <h2 onClick={this.click.bind(this)}>Hey man! Sign in to see this section</h2>
          )
        }
        return (
          <div>
              <div className="type3BannerContainer">
              {this.props.bannerList.length > 0 &&
              <WingBlank>
                            <Carousel
                                infinite
                                autoplay
                                // dots={false}
                                dragging={false}
                            // swiping={false}
                            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            //   afterChange={index => console.log('slide to', index)}
                            >
                                {this.props.bannerList.map((val, index) => (
                                    <div
                                        key={index}

                                        // href="http://www.alipay.com"  height:'228px'
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={val.bannerUrl}
                                            alt={index}
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </WingBlank>
              }
              </div>
              <div className="type3AddressContainer flex_column">
                        <div className="type3padd borderBottom1 flex_row al_center">
                                <img src={timeBg} style={{width:'25px',marginLeft:'10px',marginRight:'10px'}}  />
                                <span>营业时间：</span>
                                <span className="flex_1">  上午 <span>{this.props.state.clinicMess.amStartWork}</span>-<span>{this.props.state.clinicMess.amEndWork}</span> 下午 <span>{this.props.state.clinicMess.pmStartWork}</span>-<span>{this.props.state.clinicMess.pmEndWork}</span></span>
                        </div>
                        <div className="type3padd borderBottom1 flex_row al_center">
                                <img src={phoneBg} style={{width:'25px',marginLeft:'10px',marginRight:'10px'}}  />
                                <span className="flex_1 width_0" >{this.props.state.edtPhone}</span>
                                <Button type="primary" className="type3_btn" onClick={this.callPhone.bind(this)} >拨打</Button>
                        </div>
                        <div className="type3padd borderBottom1 flex_row al_center">
                                <img src={addressBg} style={{width:'25px',marginLeft:'10px',marginRight:'10px'}}  />
                                <span className="flex_1 width_0" ><span>{this.props.state.clinicMess.area}</span> <span>{this.props.state.clinicMess.address}</span></span>
                                <Button type="primary" className="type3_btn" onClick={this.openMap.bind(this)} >导航</Button>
                        </div>
              </div>
              <div className="flex_wrap" style={{paddingTop:'35px',paddingBottom:'15px'}}>
                    <div className="width_25 flex_column al_center" >
                            <img src={zhensuo} style={{width:'50%'}} onClick={this.goIntroduce.bind(this)} /> 
                            <span onClick={this.goIntroduce.bind(this)}>门诊</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={yisheng} style={{width:'50%'}} onClick={this.goMoreDoctor.bind(this)}  /> 
                            <span onClick={this.goMoreDoctor.bind(this)}>医生</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={huodong} style={{width:'50%'}} onClick={this.goActivity.bind(this)} /> 
                            <span onClick={this.goActivity.bind(this)}>活动</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={dizhi} style={{width:'50%'}}  onClick={this.openMap.bind(this)} /> 
                            <span onClick={this.openMap.bind(this)}>地址</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={wifi} style={{width:'50%'}} onClick={this.wifi.bind(this)}  /> 
                            <span onClick={this.wifi.bind(this)}>WIFI</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                            <img src={yuyue} style={{width:'50%'}}  onClick={this.bindOrYuyue.bind(this)} /> 
                            <span onClick={this.bindOrYuyue.bind(this)}>预约</span>
                    </div>
                    <div className="width_25 flex_column al_center">
                            <img src={xiangmu} style={{width:'50%'}}  onClick={this.goServiceItem.bind(this)}  /> 
                            <span onClick={this.goServiceItem.bind(this)}>项目</span>
                    </div>
                    <div className="width_25 flex_column al_center">
                            <img src={anli} style={{width:'50%'}}  onClick={this.goCase.bind(this)} /> 
                            <span onClick={this.goCase.bind(this)}>案例</span>
                    </div>
              </div>
              <div className="pos_rel" id="scroller" >
                    <img src={commonHead} style={{width:'100%'}} />
                    <img src={serivceTitle} className="pos_abs" style={{left:'50%',top:'50%',width:'80px',height:'24px',marginLeft:'-40px',marginTop:'-12px'}} />
              </div>
              <div className="type3_sercive_box">
                      {this.props.state.serviceList.map((val,index)=>(
                            <div className="flex_row" style={{marginBottom:'8px'}} key={index}>
                                <div className="flex_column" onClick={this.gotoDetail.bind(this,val.id,val.clisName)} >
                                    <img src={val.clisIcon||val.clisPic} style={{width:'74px',height:'88px'}} />
                                </div>
                                <div className="flex_1 flex_wrap "  >
                                        {val.subServerIteamList.map((val2,index2)=>(
                                            <div className="flex_wrap al_stretch width_0   al_content_stretch " style={{width:'33%'}} key={index2}>
                                                { val.subServerIteamList.length<=3 &&
                                                    <div  onClick={this.gotoDetail2.bind(this,val2.id,val.id,val.clisName)} className={val2.isHot==1?'type3_srvice_small2    flex_row al_center just_content_center  checked':"type3_srvice_small2  flex_row al_center just_content_center "}>{val2.serverName}</div>
                                                }
                                                { val.subServerIteamList.length>3 &&
                                                <div onClick={this.gotoDetail2.bind(this,val2.id,val.id,val.clisName)} className={val2.isHot==1?'type3_srvice_small flex_row al_center just_content_center checked ':'type3_srvice_small flex_row al_center just_content_center  '} style={{ WebkitBoxOrient: 'vertical'}}>{val2.serverName}</div>
                                                }
                                            </div>
                                        ))}
                                </div>
                            </div>
                      ))}


                   
                    {/* <div className="flex_row" style={{marginBottom:'8px'}}>
                        <div className="flex_column">
                            <img src={serviceBig} style={{width:'74px',height:'88px'}} />
                        </div>
                        <div className="flex_1 flex_wrap">
                                <div className=" flex_wrap al_stretch width_0 al_content_stretch " style={{width:'33%'}}> 
                                    <div className="type3_srvice_small  flex_row al_center just_content_center checked">阴道肿瘤</div>    
                                </div>
                                <div className=" flex_wrap al_stretch width_0 al_content_stretch " style={{width:'33%'}}> 
                                    <div className="type3_srvice_small  flex_row al_center just_content_center checked">阴道肿瘤</div>    
                                </div>
                                <div className=" flex_wrap al_stretch width_0 al_content_stretch " style={{width:'33%'}}> 
                                    <div className="type3_srvice_small  flex_row al_center just_content_center checked">阴道肿瘤</div>    
                                </div>
                                <div className=" flex_wrap al_stretch width_0 al_content_stretch " style={{width:'33%'}}> 
                                    <div className="type3_srvice_small  flex_row al_center just_content_center checked">阴道肿瘤</div>    
                                </div>
                        </div>
                        
                    </div> */}
                  


              </div>
              
              <div className="pos_rel" >
                    <img src={commonHead} style={{width:'100%'}} />
                    <img src={doctorTitle} className="pos_abs" style={{left:'50%',top:'50%',width:'80px',height:'24px',marginLeft:'-40px',marginTop:'-12px'}} />
              </div>
              <div className="type3_doctor_box">
                {this.props.state.doctorList.map((val,index)=>(
                         <div className="flex_row" key={index} style={{marginBottom:'20px'}}>
                            <div style={{width:'145px',marginRight:'18px',position:'relative'}} onClick={this.handleClick.bind(this,val.doctorId)}>
                                    <img src={val.headUrl} style={{width:'145px'}} />
                                    <div className="type3_watch_detail">查看详情</div>
                            </div>
                            <div className="flex_1 flex_column">
                                    <span className="type3_doctor_name">{val.doctorName}</span>
                                    <span className="type3_doctor_type">{val.positio}</span>
                                    <span className="type3_doctor_intro" style={{WebkitBoxOrient:"vertical"}}>
                                            {val.selfDescription}
                                    </span>
                                    <div className="flex_row" style={{marginTop:'10px'}}>
                                        <div className="width_45 type3_zixun_btn" onClick={this.call.bind(this,val.mobile)}  style={{marginRight:'10%'}}>咨询</div>
                                        <div className="width_45 type3_yuyue_btn" onClick={this.bindOrYuyue.bind(this,val.doctorId,val.doctorName)}>预约</div>
                                    </div>
                            </div>
                         
                     </div>
                ))}
                   
              </div>
              { this.props.state.doctorList.length<this.props.state.total &&
                     <div className="type3_showMore" onClick={this.goMoreDoctor.bind(this)}>点击查看更多</div>
              }
             

                 <div className="pos_rel">
                    <img src={commonHead} style={{width:'100%'}} />
                    <img src={yiyuanIntroduce} className="pos_abs" style={{left:'50%',top:'50%',width:'80px',height:'24px',marginLeft:'-40px',marginTop:'-12px'}} />
                </div>
                <div className="type3_doctor_box">
                        <div className="flex_column">
                                <div className="type3_introduce_content">
                                        {this.props.state.clinicMess.clinicIntroduce}
                                </div>
                        </div>
                </div>
                {/* <div className="pic_content2" >
                                <img style={{ width: '100%', display: 'block' }} src={banner} />
                </div> */}

                <div className="pos_rel">
                    <img src={commonHead} style={{width:'100%'}} />
                    <img src={yiyuanEnvironment} className="pos_abs" style={{left:'50%',top:'50%',width:'80px',height:'24px',marginLeft:'-40px',marginTop:'-12px'}} />
                </div>
                {this.props.state.clinicEnvironmentList.map((val, index) => (
                <div className="pic_content2" key={index} onClick={this.previewImage.bind(this,index)}>
                                <img style={{ width: '100%', display: 'block' }} src={val.fileUrl} />
                </div>
                ))}
              
                <div className="type3_concat_box" >
                        <div style={{paddingLeft:'13px',paddingRight:'15px'}}>
                         <img style={{ width: '100%', display: 'block' }} src={cellBg} />
                        </div>
                        <div style={{position:'absolute',width:'100%',top:'75px'}}>
                            <div style={{textAlign:'center'}}>{this.props.state.clinicName}</div>
                            <div style={{textAlign:'center',marginTop:'10px',marginBottom:'15px'}} className="type3_call_phone">{this.props.state.edtPhone}</div>
                            <div className="type3_call_btn" onClick={this.callPhone.bind(this)}>拨打</div>
                        </div> 
                </div>

          </div>
        );
      }
  }
  export default Content