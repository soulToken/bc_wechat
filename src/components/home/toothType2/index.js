import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
//引用的图片

import group from '../../../static/images/acne/home/group_7@3x.png'
//有用的图片
import time from '../../../static/images/toothType2/home/time_bg.png'
import address from '../../../static/images/toothType2/home/address_bg.png'
import classify from '../../../static/images/toothType2/home/classify.png'
import oneKey from '../../../static/images/toothType2/home/onekey.png'
import doctorTeam from '../../../static/images/toothType2/home/doctorTeam.png'
import wifi from '../../../static/images/toothType2/home/wifi.png'
import introduce from '../../../static/images/toothType2/home/introduce.png'
import first from '../../../static/images/toothType2/home/first.png'
import second from '../../../static/images/toothType2/home/second.png'
import third from '../../../static/images/toothType2/home/third.png'
import four from '../../../static/images/toothType2/home/four.png'
import tongmei from '../../../static/images/common/tongmei.jpg'

//牙科第二个模板的主页组件
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            currentIndex: 0,
            showModel:false
        };
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
        //   console.log(this.props.state.goodsList.length<this.props.state.goodsTotal)


    }
    componentWillUnmount() {


    }
    click() {
        console.log("惦记我")
    }
    callPhone() {
        this.props.method.callPhone()
    }
    openMap() {
        this.props.method.openMap()
    }
    goIntroduce() {
        this.props.method.goIntroduce()
    }
    goMoreDoctor() {
        this.props.method.goMoreDoctor()
    }
    goActivity() {
        this.props.method.goActivity()
    }
    wifi() {
        this.props.method.wifi()
    }
    bindOrYuyue(id, name) {
        if(this.props.state.clinicMess&&this.props.state.clinicMess.clinicId=="78996"){
            this.setState({
                showModel:true
            })
            return
        }
        if (id && name) {
            sessionStorage.setItem("doctorId", id);
            sessionStorage.setItem("doctorName", name);
        } else {
            sessionStorage.removeItem("doctorId");
            sessionStorage.removeItem("doctorName");
        }
        sessionStorage.removeItem("clisName")
        sessionStorage.removeItem("serverId")
        this.props.method.bindOrYuyue()
    }
    goServiceItem() {
        this.props.method.goServiceItem()
        // document.getElementById("scroller").scrollIntoView();
    }
    call(val) {
        debugger;
        if (!val) {
            Toast.info('暂无联系方式 !!!', 1);
            return
        }
        window.location.href = 'tel://' + val;
    }
    handleClick(e) {
        this.props.method.handleClick(e)
    }
    previewImage(index) {
        this.props.method.previewImage(index)
    }
    //跳转到案例
    goCase() {
        this.props.history.push("/case")
    }
    gotoDetail(id, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", id)
        this.props.method.gotoDetail(id)
    }
    gotoDetail2(id, e, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", e)
        this.props.history.push('/serviceItems/' + id + "?type=1")
    }
    gotoGoodsDetail(id) {
        this.props.method.gotoGoodsDetail(id)
    }
    gotoGoodsList() {
        this.props.method.gotoGoodsList()
    }
    zhankai = (index) => {
        // this.props.state.serviceList[index].clisPrice=1;
        // console.log(this.props.state.serviceList[index].show) 
        this.setState({
            currentIndex: index
        })
    }
    bihe = (index) => {
        this.setState({
            currentIndex: index
        })
    }
    bihe2=(index)=>{
        if(index==this.state.currentIndex){
            this.setState({
                currentIndex: -1
            })
        }else{
            this.setState({
                currentIndex: index
            })
        }
    }
    render() {
        if (this.props.state.serviceList && this.props.state.serviceList.length && this.props.state.serviceList.length > 0) {
            this.props.state.serviceList.forEach(function (item) {
                item.show = true
            })
        } 2
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
            <div className="type444" style={{width:'100%',overflowX:'hidden'}}>
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
                <div className="flex_wrap" style={{ paddingTop: '40px',paddingBottom:'40px'}}>
                  
                    <div className="width_50 flex_column al_center"  style={{marginBottom:'10px'}}>
                        <img src={oneKey} style={{ width: '90%' }} onClick={this.bindOrYuyue.bind(this)} />
                    </div>
                    <div className="width_50 flex_column al_center" style={{marginBottom:'10px'}} >
                        <img src={doctorTeam} style={{ width: '90%' }} onClick={this.goMoreDoctor.bind(this)} />
                    </div>
                    <div className="width_50 flex_column al_center" style={{marginBottom:'10px'}}>
                        <img src={wifi} style={{ width: '90%' }} onClick={this.wifi.bind(this)} />
                    </div>
                    <div className="width_50 flex_column al_center" style={{marginBottom:'10px'}}>
                        <img src={introduce} style={{ width: '90%' }} onClick={this.goIntroduce.bind(this)} />
                    </div>
                </div>
                {
                    this.props.state.serviceList.length>0 && 
               
                 <div className="flex_row  al_center just_content_center" style={{background:'url('+classify+') no-repeat center',paddingBottom:'25px',paddingTop:'17px',backgroundSize:'87% 100%',fontSize:'20px',color:'#fff',marginBottom:'30px'}}>
                                                          服务项目
                 </div>
                }  
                 <div className="flex_wrap">
                 {
                        this.props.state.serviceList.map((val,index)=>( 
                                <div   style={{width:'50%'}}   data-index={index+1}  key={index}>
                            {(index+1)%4==1 && (
                                <div className="width_100 flex_column al_center pos_rel"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                                   
                                    <div style={{width:'20%',paddingTop:'20%',borderRadius:'50%',position:'absolute',left:'13%',top:'8%',border:'4px solid #fde004'}}></div>
                                    <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'6%',top:'14%'}}></div>
                                    <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'7%',top:'17%'}}></div>
                                    <div style={{textAlign:'center'}} className="clisName_box">{val.clisName}</div>
                                </div>
                            )
                        }
                            {(index+1)%4==2 && (
                                <div className="width_100 flex_column al_center pos_rel"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                              
                                <div className="flex_column pos_abs" style={{right:0,top:0}}>
                                        <div className="flex_row" style={{marginTop:'4px'}}>
                                            <div className="strach">
                                            </div>
                                            <div className="strach">
                                            </div>
                                            <div className="strach">
                                            </div>
                                        </div>
                                        <div className="flex_row" style={{marginTop:'4px'}}>
                                            <div className="strach">
                                            </div>
                                            <div className="strach">
                                            </div>
                                        </div>
                                        <div className="flex_row" style={{marginTop:'4px'}}>
                                            <div className="strach">
                                            </div>
                                        </div>
                                        
                                </div>
                                

                                <div style={{width:'78%',paddingTop:'78%',borderRadius:'50%',position:'absolute',left:'2%',top:'18%',border:'4px solid #fde004'}}></div>
                                <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'13%',top:'20%'}}></div>
                                <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'14%',top:'19%'}}></div>
                                <div style={{textAlign:'center',marginTop:'15px'}} className="clisName_box">{val.clisName}</div>
                            
                        </div>
                            )}
                            {
                            (index+1)%4==3 && (

                          
                            <div className="width_100 flex_column al_center pos_rel"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                                   
                                    <div className="flex_column pos_abs" style={{left:'2%',top:'2%'}}>
                                            <div className="flex_row" style={{marginTop:'4px'}}>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                            </div>
                                            <div className="flex_row" style={{marginTop:'4px'}}>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                            </div>
                                            <div className="flex_row" style={{marginTop:'4px'}}>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                            </div>
                                            <div className="flex_row" style={{marginTop:'4px'}}>
                                                <div className="strach">
                                                </div>
                                                <div className="strach">
                                                </div>
                                            </div>
                                            <div className="flex_row" style={{marginTop:'4px'}}>
                                                <div className="strach">
                                                </div>
                                            </div>
                                            
                                    </div>
                                    

                                    {/* <div style={{width:'78%',paddingTop:'78%',borderRadius:'50%',position:'absolute',left:'10%',top:'10%',border:'4px solid yellow'}}></div> */}
                                    <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'6%',top:'11%'}}></div>
                                    <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'6%',top:'9%'}}></div>      
                                    <div style={{textAlign:'center'}} className="clisName_box">{val.clisName}</div>
                            </div>
                            )
                        }
                        {
                            (index+1)%4==0 && (
                            <div className="width_100 flex_column al_center pos_rel"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                   
                        <div style={{width:'20%',paddingTop:'20%',borderRadius:'50%',position:'absolute',right:'-5%',top:'18%',border:'4px solid #fde004'}}></div>
                        <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',left:'0%',top:'20%'}}></div>
                        <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',left:'0%',top:'25%'}}></div>      
                                <div style={{textAlign:'center',marginTop:'15px'}} className="clisName_box">{val.clisName}</div>
                        </div>
            
                        )
                    }

                    {/* <div style={{textAlign:'center'}}>{val.clisName}</div> */}
                        </div>
                  ))}
                 </div>
               

                {/* {
                    this.props.state.serviceList.map((val,index)=>(
                        <div key={index}>
                            <div  className="head_title flex_column al_center just_content_center"  style={{marginTop:'18px',marginBottom:'18px'}}>
                                    <img src={title_bg} className="head_title_center" style={{width:'100%',}} />
                                    <span className="head_title_title commonCol">{val.clisName}</span>
                            </div>
                            <div style={{paddingLeft:'6px',paddingRight:'6px'}} onClick={this.gotoDetail.bind(this,val.id, val.clisName)}>
                                    <img src={val.clisPic || val.clisIcon} className="head_title_center" style={{width:'100%',}} />
                            </div>
                        </div>
                    ))
                } */}
                
                {this.props.state.doctorList.length > 0 &&
                  <div className="flex_row  al_center just_content_center" style={{background:'url('+classify+') no-repeat center',paddingBottom:'25px',paddingTop:'17px',backgroundSize:'87% 100%',fontSize:'20px',color:'#fff',marginTop:"35px"}}>
                            医生团队
                    </div>
               }
               <div className="team_box" style={{background:'transparent'}}>
                   {this.props.state.doctorList.map((val, index) => (
                       <div className="team_content flex_row" key={index} onClick={this.handleClick.bind(this, val.doctorId)}  style={{border:0}}>
                           <div className="team_content_left flex_1">
                               <img style={{ width: '100%', display: 'block' }} src={val.headUrl} />
                           </div>
                           <div className="team_content_right flex_1 flex_column">
                               <div className="doctor_introduce_box flex_column al_center">
                                   <div className="doctor_name_box">{val.doctorName}</div>
                                   <div className="doctor_classify_box">{val.positio}</div>
                               </div>
                               <div className="doctor_introduce_text" style={{ WebkitBoxOrient: 'vertical' }}>
                                   {val.selfDescription}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
               {this.props.state.clinicMess.clinicIntroduce &&
                   <div className="flex_row  al_center just_content_center" style={{background:'url('+classify+') no-repeat center',paddingBottom:'25px',paddingTop:'17px',backgroundSize:'87% 100%',fontSize:'20px',color:'#fff'}}>
                                                            门诊介绍
                   </div>
               }
               <div className="introduce_box" style={{background:'transparent',lineHeight:'26px',fontSize:'15px'}}>
                   {this.props.state.clinicMess.clinicIntroduce}
               </div>
               {this.props.state.clinicEnvironmentList.length > 0 &&
                    <div className="flex_row  al_center just_content_center" style={{background:'url('+classify+') no-repeat center',paddingBottom:'25px',paddingTop:'17px',backgroundSize:'87% 100%',fontSize:'20px',color:'#fff'}}>
                            门诊环境
                    </div>
               }
               <div className="pic_box" style={{background:'transparent'}}>
                   {this.props.state.clinicEnvironmentList.map((val, index) => (
                       <div className="pic_content" key={index} onClick={this.previewImage.bind(this, val)}>
                           <img style={{ width: '100%', display: 'block' }} src={val.fileUrl} />
                       </div>
                   ))}
               </div>




















                <div className="pos_rel flex_row" style={{marginTop:'30px',background:'url('+group+') no-repeat center',backgroundSize:'95% 100%',paddingTop:'20px',paddingBottom:'20px'}}>
                    {/* <img src={group}  style={{width:'100%',position:'absolute'}} /> */}
                    <div className="width_50" style={{height:'2px'}}></div>
                    <div className="width_50 acne_address_container">
                            <div className="flex_row">
                                <img src={time} style={{width:'16px',height:'16px',marginRight:'8px'}}/>
                                <div className="flex_column">
                                <span style={{marginBottom:'6px'}}>营业时间</span>
                                <span className="flex_1">  上午 <span>{this.props.state.clinicMess.amStartWork}</span>-<span>{this.props.state.clinicMess.amEndWork}</span> </span>
                                <div>
                                下午 <span>{this.props.state.clinicMess.pmStartWork}</span>-<span>{this.props.state.clinicMess.pmEndWork}</span>
                                </div>
                                </div>
                               
                            </div>
                            <div className="flex_row" style={{marginTop:'10px',marginBottom:'5px'}}>
                                <img src={address} style={{width:'16px',height:'18px',marginRight:'8px'}}/>
                                <div className="flex_column">
                                <span style={{marginBottom:'6px'}}>地址</span>
                                <span className="flex_1" style={{lineHeight:'16px'}} ><span>{this.props.state.clinicMess.area}</span> <span>{this.props.state.clinicMess.address}</span></span>
                                </div>
                               
                            </div>
                            <Button className="acne_address_box" type="primary" onClick={this.openMap.bind(this)}>一键导航</Button>
                    </div>
                </div>

                <Modal
                        visible={this.state.showModel}
                        transparent
                        maskClosable={false}
                    
                        title="长按识别二维码"
                        footer={[{ text: 'OK', onPress: () => { this.setState({showModel:false}) } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div style={{ height: 240 }}>
                            <img style={{ height: "100%" }} src={tongmei} />
                        </div>
                </Modal>



            </div>
        );
    }
}
export default Content