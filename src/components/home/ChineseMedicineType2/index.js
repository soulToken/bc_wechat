import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
//引用的图片
import timeBg from '../../../static/images/home/time_bg.png'
import zixun from '../../../static/images/home/toobar/ChineseMedicineType2/home/zixun.png'
import jianjie from '../../../static/images/home/toobar/ChineseMedicineType2/home/jianjie.png'
import huodong from '../../../static/images/home/toobar/ChineseMedicineType2/home/huodong.png'
import dizhi from '../../../static/images/home/toobar/ChineseMedicineType2/home/dizhi.png'
import wifi from '../../../static/images/home/toobar/ChineseMedicineType2/home/wifi.png'
import yuyue from '../../../static/images/home/toobar/ChineseMedicineType2/home/yuyue.png'
import chanpin from '../../../static/images/home/toobar/ChineseMedicineType2/home/chanpin.png'
import anli from '../../../static/images/home/toobar/ChineseMedicineType2/home/anli.png'
import service_head from '../../../static/images/home/toobar/ChineseMedicineType2/home/service.png'
import yangsheng from '../../../static/images/home/toobar/ChineseMedicineType2/home/yangsheng.png'
import doctor_team_head from '../../../static/images/home/toobar/ChineseMedicineType2/home/doctor_team.png'
import introduce_head from '../../../static/images/home/toobar/ChineseMedicineType2/home/introduce_head.png'
import addressBg from '../../../static/images/home/toobar/ChineseMedicineType2/home/address.png'
import phoneBg from '../../../static/images/home/toobar/ChineseMedicineType2/home/phone.png'
import nameBox from '../../../static/images/home/toobar/ChineseMedicineType2/home/name_box.png'
import quickly from '../../../static/images/home/toobar/ChineseMedicineType2/home/quickly.png'
import right_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/right_arrow.png'
import bottom_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_bottom.png'
import top_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_top.png'
import more from "../../../static/images/home/toobar/ChineseMedicineType2/home/more.png"
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
                <div className="flex_wrap" style={{ paddingTop: '15px', marginTop: '15px', background: "white" }}>
                    <div className="width_25 flex_column al_center" >
                        <img src={zixun} style={{ width: '70%' }} onClick={this.callPhone.bind(this)} />
                        <span onClick={this.callPhone.bind(this)}>一键咨询</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                        <img src={yuyue} style={{ width: '70%' }} onClick={this.bindOrYuyue.bind(this)} />
                        <span onClick={this.bindOrYuyue.bind(this)}>一键预约</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                        <img src={anli} style={{ width: '70%' }} onClick={this.goCase.bind(this)} onClick={this.goActivity.bind(this)} />
                        <span onClick={this.goCase.bind(this)}>经典案例</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                        <img src={dizhi} style={{ width: '70%' }} onClick={this.openMap.bind(this)} />
                        <span onClick={this.openMap.bind(this)}>门诊地址</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                        <img src={jianjie} style={{ width: '70%' }} onClick={this.goIntroduce.bind(this)} />
                        <span onClick={this.goIntroduce.bind(this)}>医馆简介</span>
                    </div>
                    <div className="width_25 flex_column al_center" >
                        <img src={wifi} style={{ width: '70%' }} onClick={this.wifi.bind(this)} />
                        <span onClick={this.wifi.bind(this)}>免费WIFI</span>
                    </div>
                    <div className="width_25 flex_column al_center">
                        <img src={huodong} style={{ width: '70%' }} onClick={this.goActivity.bind(this)} />
                        <span onClick={this.goActivity.bind(this)}>最新活动</span>
                    </div>
                    {
                        this.props.state.goodsList.length>0 &&
                    <div className="width_25 flex_column al_center">
                        <img src={chanpin} onClick={this.gotoGoodsList.bind(this)} style={{ width: '70%' }} />
                        <span >养生产品</span>
                    </div>
                    }
                </div>
                {
                    this.props.state.serviceList.length > 0 &&
                    <div className="pos_rel flex_row al_center" id="scroller" style={{ marginTop: '15px' }}>
                        <img src={service_head} style={{ width: '100%' }} />
                        {
                            this.props.state.serviceList.length >= 4 &&
                            <span onClick={this.goServiceItem.bind(this)} style={{ width: '30px', position: 'absolute', right: '0', height: '100%' }} className="flex_row al_center">
                                <img src={more} style={{ width: '10px' }} />
                            </span>
                        }
                    </div>
                }
                {
                    this.props.state.serviceList.map((val, index) => (

                        <div key={index}>
                            <Card full>
                                     <div style={{paddingBottom:'0'}}>
                                        <Card.Body>
                                            <div style={{position:'relative'}}>
                                            <img src={val.clisPic || val.clisIcon} onClick={this.gotoDetail.bind(this, val.id, val.clisName)} style={{ width: '100%' }} />
                                            <div style={{paddingTop:'13px',width:'100%',paddingBottom:'13px',background:'#093c4d',opacity:'0.8',position:'absolute',bottom:'0'}} className="flex_row al_center">
                                            <span className="flex_1" style={{ color: "#fff", fontWeight: '600',marginLeft:'15px' }}>{val.clisName}</span> 
                                            {
                                                val.subServerIteamList.length>0 &&
                                                <div>
                                                {
                                                    this.state.currentIndex==index ?(
                                                        <img  onClick={this.bihe2.bind(this, index)} style={{ width: '16px',marginRight:'15px' }} src={top_arrow}   />
                                                    ):(
                                                        <img onClick={this.bihe.bind(this, index)} style={{ width: '16px',marginRight:'15px' }} src={bottom_arrow} />
                                                    )
                                                }
                                                </div>
                                            }
                                            </div>
                                            </div>
                                        </Card.Body>
                                        {/* <Card.Footer content={<span style={{ color: "#000", fontWeight: '600' }}>{val.clisName}</span>} extra={
                                        <div>
                                            {
                                                 this.state.currentIndex==index ?(
                                                    <img onClick={this.bihe2.bind(this, index)} style={{ width: '16px' }} src={bottom_arrow} />
                                                 ):(
                                                    <img onClick={this.bihe.bind(this, index)} style={{ width: '16px' }} src={top_arrow} />
                                                 )
                                            }
                                           
                                            
                                        </div>} /> */}
                                    </div>
                                    {
                                        this.state.currentIndex==index &&
                                        <div>
                                        {
                                            val.subServerIteamList.map((item,index2)=>(
                                                        <div key={index2}>
                                                            {
                                                                index2!=0 &&
                                                                <div className="flex_row">
                                                                    <div style={{height:'1px',width:'15px'}}></div>
                                                                    <div className="flex_1" style={{height:'1px',background:'#dfdfdf'}}></div>
                                                                </div>
                                                            }  
                                                        <div  style={{paddingLeft:'15px',paddingRight:'15px'}}>
                                                        <Card.Header
                                                            title={ <span className="flex_1 over_two_ellipsis" style={{width:'0',WebkitBoxOrient:'vertical'}}>{item.serverName}</span>  }
                                                            onClick={this.gotoDetail2.bind(this, item.id,val.id,val.clisName)}
                                                            thumb={item.serverIcon || item.serverImg}
                                                            thumbStyle={{ width: '61px', borderRadius: '5px' }}
                                                            extra={<span><img style={{ width: '9px' }} src={right_arrow} /></span>}
                                                        />
                                                        </div>
                                                        </div>
                                            ))
                                        }
                                        </div>
                                    }
                              
                            </Card>

                        </div>
                    ))}


                {/* 商品模块 */}

                {
                    this.props.state.goodsList.length>0 &&
              
                <div className="pos_rel flex_row al_center" style={{ marginTop: '15px' }} >
                    <img src={yangsheng} style={{ width: '100%' }} />
                    {
                        this.props.state.goodsList.length < this.props.state.goodsTotal &&
                        <span onClick={this.gotoGoodsList.bind(this)} style={{ width: '30px', position: 'absolute', right: '0', height: '100%' }} className="flex_row al_center">
                            <img src={more} style={{ width: '10px' }} />
                        </span>
                    }
                </div>
                }
                <div className="type3_doctor_box flex_wrap" style={{ background: "#fff" }}>

                    {
                        this.props.state.goodsList.map((val, index) => (
                            <div className="wid_50 flex_column goods_box" key={index} onClick={this.gotoGoodsDetail.bind(this, val.id)}>
                                <img src={val.goodsIcon || val.goodsImg} style={{ width: '100%' }} />
                                <span style={{ marginTop: '5px' }}>{val.goodsName}</span>

                            </div>
                        ))
                    }
                </div>












                {
                    this.props.state.doctorList.length > 0 &&
                    <div className="pos_rel" style={{ marginTop: '15px' }}>
                        <img src={doctor_team_head} style={{ width: '100%' }} />
                    </div>
                }
                <div style={{ background: '#fff', paddingBottom: '20px' }}>
                    {this.props.state.doctorList.map((val, index) => (
                        <div className="haveLine type3_doctor_box" style={{ paddingTop: '10px' }} key={index}>
                            <div className="flex_row" key={index} style={{ marginBottom: '20px' }} onClick={this.handleClick.bind(this, val.doctorId)}>
                                <div style={{ width: '145px', marginRight: '18px', position: 'relative' }} >
                                    <img src={val.headUrl} style={{ width: '145px', marginTop: '25px' }} />
                                </div>
                                <div className="flex_1 flex_column al_center">
                                    <span className="type3_doctor_name" style={{ color: '#074155' }}>{val.doctorName}</span>
                                    <span className="pos_rel" style={{ background: 'url(' + nameBox + ') no-repeat center', height: '40px', width: '90%', backgroundSize: 'contain', textAlign: 'center', lineHeight: '40px', fontSize: '16px', color: '#fff', fontWeight: '700' }}>
                                        {val.positio}
                                    </span>
                                    <span className="type3_doctor_intro" style={{ WebkitBoxOrient: "vertical" }}>
                                        {val.selfDescription}
                                    </span>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {this.props.state.doctorList.length < this.props.state.total &&
                    <div className="type3_showMore commonBg" onClick={this.goMoreDoctor.bind(this)}>点击查看更多</div>
                }

                {/* 门诊介绍模块 */}

                {
                    this.props.state.clinicMess.clinicIntroduce &&
                    <div className="pos_rel" style={{ marginTop: '15px' }}>
                        <img src={introduce_head} style={{ width: '100%' }} />
                    </div>
                }
                <div className="type3_doctor_box" style={{ background: '#fff', paddingBottom: '20px', paddingTop: '15px' }}>
                    <div className="flex_column">
                        <div className="type3_introduce_content">
                            {this.props.state.clinicMess.clinicIntroduce}
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                {/* 门诊环境模块 */}
                <div style={{ background: "#fff", paddingTop: '15px', paddingBottom: '15px' }}>
                    <div className="pos_rel" style={{ marginBottom: '10px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '700', marginLeft: '15px' }}> 门诊环境</span>
                    </div>
                    {this.props.state.clinicEnvironmentList.map((val, index) => (
                        <div className="pic_content2" key={index} onClick={this.previewImage.bind(this, val)}>
                            <img style={{ width: '100%', display: 'block' }} src={val.fileUrl} />
                        </div>
                    ))}
                </div>
                {/* 门诊联系方式模块 */}
                <div className="flex_column" style={{ background: '#fff', marginTop: '15px', paddingTop: '20px' }}>
                    <div style={{ marginLeft: '15px', fontSize: '16px', fontWeight: '800' }}>{this.props.state.clinicName}</div>
                    <div className="type3padd borderBottom1 flex_row al_center">
                        <img src={timeBg} style={{ width: '20px', marginLeft: '10px', marginRight: '10px' }} />
                        <span>营业时间：</span>
                        <span className="flex_1" style={{ color: '#666666' }}>  上午 <span>{this.props.state.clinicMess.amStartWork}</span>-<span>{this.props.state.clinicMess.amEndWork}</span> 下午 <span>{this.props.state.clinicMess.pmStartWork}</span>-<span>{this.props.state.clinicMess.pmEndWork}</span></span>
                    </div>
                    <div className="type3padd borderBottom1 flex_row al_center">
                        <img src={addressBg} style={{ width: '20px', marginLeft: '10px', marginRight: '10px' }} />
                        <span className="flex_1 width_0" ><span>{this.props.state.clinicMess.area}</span> <span>{this.props.state.clinicMess.address}</span></span>
                        <div className="signIn_box" style={{ marginRight: '15px' }} onClick={this.openMap.bind(this)}>导航</div>

                    </div>
                    <div className="type3padd borderBottom1 flex_row al_center" onClick={this.callPhone.bind(this)}>
                        <img src={phoneBg} style={{ width: '20px', marginLeft: '10px', marginRight: '10px' }} />
                        <span className="flex_1 width_0" style={{ color: "#087393" }}>{this.props.state.edtPhone}</span>

                    </div>
                </div>
                <img src={quickly} style={{ position: 'fixed', bottom: '20%', width: '105px', right: '0', zIndex: '2' }} onClick={this.callPhone.bind(this)} />
            </div>
        );
    }
}
export default Content