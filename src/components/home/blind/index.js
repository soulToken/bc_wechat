import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
//盲人按摩主页
import left_bg from '../../../static/images/blind/index/left.png'
import common_top from '../../../static/images/blind/index/common_top.png'
import circle from '../../../static/images/blind/index/circle.png'
import circle_2 from '../../../static/images/blind/index/circle_2.png'
import doctor_bg from '../../../static/images/blind/index/doctor_bg.png'
import title from '../../../static/images/blind/index/title.png'
import money from '../../../static/images/blind/index/money.png'
import introduce from '../../../static/images/blind/index/introduce.png'
import bottom_bg from '../../../static/images/blind/index/bottom_bg.png'
import phone_bg from '../../../static/images/blind/index/phone_bg.png'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            currentIndex: 0
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
    handleClick = (e) => {
       this.props.history.push(`/doctorTeam/${e}`)
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
            <div className="type444" style={{overflowX:'hidden'}}>
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
                <div className="flex_column al_center" style={{background:'url('+left_bg+') no-repeat center',backgroundSize:'cover'}}>
                        <div className="blind_common_top" style={{background:'url('+common_top+') no-repeat center',backgroundSize:'cover'}}>
                            我们的服务
                        </div>
                        <div className="blind_circle_box" style={{background:'url('+circle+')',backgroundSize:'cover'}}></div>
                        {
                            this.props.state.serviceList.map((val,index)=>(
                            <div key={index} style={{marginBottom:'35px',paddingLeft:'15px',paddingRight:'15px'}}   onClick={this.gotoDetail.bind(this,val.id, val.clisName)}>
                                <img src={val.clisPic || val.clisIcon} style={{width:'100%',display:'block'}} />
                            </div>
                            ))
                        }
                         <div className="blind_circle_box" style={{background:'url('+circle_2+')',backgroundSize:'cover'}}></div>
                </div>
                <img src={title} style={{width:'100%',display:'block',marginBottom:'15px'}} />
                {/* this.props.state.serviceList */}
                {this.props.state.doctorList.length > 0 &&
                        <WingBlank>
                            <Carousel className="space-carousel"
                            frameOverflow="visible"
                            cellSpacing={10}
                            slideWidth={0.35}
                            dots={false}
                            autoplay
                            selectedIndex={0}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => this.setState({ slideIndex: index })}
                            >
                            {this.props.state.doctorList.map((val, index) => (
                                <a
                                key={val}
                                onClick={this.handleClick.bind(this, val.doctorId)}
                                style={{
                                    background:'url('+doctor_bg+') no-repeat center',
                                    backgroundSize:'contain',
                                    
                                    display: 'block',
                                    position: 'relative',
                                    // top: this.state.slideIndex === index ? -10 : 0,
                                    // height: '162px',
                                    paddingTop:'140%',
                                    border:'3px solid #b99790',
                                 
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                                >
                                <div   style={{width:'90%',background:'url('+val.headUrl+') no-repeat center',backgroundSize:'cover',position:'absolute',left:'5%',top:'10%',bottom:'10%'}}>
                                    <div style={{paddingTop:'5px',paddingBottom:'5px',position:'absolute',bottom:'12px',width:'100%',alignItems:'baseline',background:'#91746a'}} className="flex_row  just_content_center colorfff">
                                            <span style={{fontSize:'14px'}}>{val.doctorName}</span>
                                            <span style={{fontSize:'12px',marginLeft:'7px'}}>({val.positio})</span>
                                    </div>
                                </div>
                                
                                </a>
                            ))}
                            </Carousel>
                        </WingBlank>
                    }

                    {
                        this.props.state.goodsList.length>0 &&
                        <div style={{paddingTop:'15px',paddingBottom:'15px'}}>
                        {
                            this.props.state.goodsList.map((item,index)=>(
                                <img src={item.goodsImg||item.goodsIcon} key={index} style={{width:'100%',display:'block'}} />
                            ))
                        }
                        </div>
                    }
                    <div style={{paddingTop:'85px',paddingBottom:'225px',background:'url('+introduce+') no-repeat center',backgroundSize:'cover'}}>
                            <div style={{paddingLeft:'15px',paddingRight:'15px'}} className="flex_column al_center">
                                   <span style={{fontSize:'25px',marginBottom:'36px'}}> 品牌故事</span>
                                   <span style={{fontSize:'14px',lineHeight:'25px'}}>{this.props.state.clinicMess.clinicIntroduce}</span>
                            </div>
                    </div>
                    <div style={{ background: "#fff", paddingBottom: '15px' }}>
                    
                        {this.props.state.clinicEnvironmentList.map((val, index) => (
                            <div className="pic_content2" key={index} onClick={this.previewImage.bind(this, val)}>
                                <img style={{ width: '100%', display: 'block' }} src={val.fileUrl} />
                            </div>
                        ))}
                    </div>
                    <div className="flex_column al_center" style={{background:'url('+bottom_bg+') no-repeat center',backgroundSize:'cover',paddingTop:'40px',paddingBottom:'65px'}}>
                            <span style={{fontSize:'25px',marginBottom:'30px'}}>预约热线</span>
                            <div onClick={this.callPhone.bind(this)} style={{height:'65px',fontSize:'18px',width:'218px',lineHeight:'65px',marginBottom:'30px',textAlign:'center',color:'#fff',background:'url('+phone_bg+') no-repeat center',backgroundSize:'contain'}}>
                                    {this.props.state.edtPhone}
                            </div>
                            <div className="flex_row" style={{width:'218px',marginBottom:'15px'}}> 
                                <span style={{marginBottom:'6px'}}>地址：</span>
                                <span className="flex_1" style={{lineHeight:'20px'}} ><span>{this.props.state.clinicMess.area}</span> <span>{this.props.state.clinicMess.address}</span></span>
                            </div>
                           <div className="commonBg" style={{width:'80px',height:'26px',borderRadius:'8px',color:'#fff',lineHeight:'26px',textAlign:'center',fontSize:'12px'}} onClick={this.openMap.bind(this)}>一键导航</div>
                    </div>
                        
            </div>
        );
    }
}
export default Content