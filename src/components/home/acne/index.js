import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
import timeBg from '../../../static/images/home/time_bg.png'
import addressBg from '../../../static/images/home/toobar/ChineseMedicineType2/home/address.png'
import phoneBg from '../../../static/images/home/toobar/ChineseMedicineType2/home/phone.png'
import quickly from '../../../static/images/home/toobar/ChineseMedicineType2/home/quickly.png'
//引用的图片
import fansHead from "../../../static/images/acne/home/fengsi@3x.png"
import title_bg from "../../../static/images/acne/home/head_title_bg.png"
import yuyue from '../../../static/images/acne/home/yuyue@3x.png'
import huodong from '../../../static/images/acne/home/huodong@3x.png'
import anli from '../../../static/images/acne/home/anli@3x.png'
import jianjie from '../../../static/images/acne/home/women@3x.png'
import dizhi from '../../../static/images/acne/home/daohang@3x.png'
import chanpin from '../../../static/images/acne/home/tuijian@3x.png'
import group from '../../../static/images/acne/home/group_7@3x.png'
import time from '../../../static/images/acne/home/time_bg.png'
import address from '../../../static/images/acne/home/address_bg.png'
//妇科的主页组件
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
            <div className="type444">
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
                <div className="flex_wrap" style={{ paddingTop: '35px'}}>
                  
                    <div className="width_33 flex_column al_center" >
                        <img src={yuyue} style={{ width: '40%' }} onClick={this.bindOrYuyue.bind(this)} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} onClick={this.bindOrYuyue.bind(this)}>一键预约</span>
                    </div>
                    <div className="width_33 flex_column al_center">
                        <img src={huodong} style={{ width: '40%' }} onClick={this.goActivity.bind(this)} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} onClick={this.goActivity.bind(this)}>最新活动</span>
                    </div>
                    <div className="width_33 flex_column al_center" >
                        <img src={anli} style={{ width: '40%' }} onClick={this.goCase.bind(this)} onClick={this.goCase.bind(this)} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} onClick={this.goCase.bind(this)}>变美案例</span>
                    </div>
                    <div className="width_33 flex_column al_center" >
                        <img src={jianjie} style={{ width: '40%' }} onClick={this.goIntroduce.bind(this)} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} onClick={this.goIntroduce.bind(this)}>关于我们</span>
                    </div>
                    <div className="width_33 flex_column al_center" >
                        <img src={dizhi} style={{ width: '40%' }} onClick={this.openMap.bind(this)} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} onClick={this.openMap.bind(this)}>到店导航</span>
                    </div>
              
                    <div className="width_33 flex_column al_center">
                        <img src={chanpin} onClick={this.gotoGoodsList.bind(this)} style={{ width: '40%' }} />
                        <span style={{marginTop:'7px',marginBottom:'35px'}} >产品推荐</span>
                    </div>
                </div>
                
                <img src={fansHead} alt="头部" style={{width:'100%'}} />
                {/* this.props.state.serviceList */}
                {
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
                }
                
                <div className="pos_rel flex_row" style={{marginTop:'40px',background:'url('+group+') no-repeat center',backgroundSize:'95% 100%',paddingTop:'20px',paddingBottom:'20px'}}>
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
            </div>
        );
    }
}
export default Content