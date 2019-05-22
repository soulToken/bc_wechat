
import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import TabBarExample from '../tooBar/tooBar';
import { Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import banner from '../../static/images/homepage_banner@3x.png';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card } from 'antd-mobile';
import ReactSVG from 'react-svg'
//引入图片
import serviceTest from '../../static/images/doctor_team_background@3x.png'
import clinic from '../../static/svg/homepage_clinic.svg'
import location from '../../static/svg/homepage_location.svg'
import locationBg from '../../static/images/home/location_bg.png'
import locationBg2 from '../../static/images/home/location_bg2.png'
import daohang from '../../static/images/home/daohang_bg.png'
import daohang2 from '../../static/images/home/daohang_bg2.png'
import timeBg from '../../static/images/home/time_bg.png'
import doctor from '../../static/svg/hompage_doctor.svg'
import activity from '../../static/svg/homepage_activity.svg'
import wifi from '../../static/svg/homepage_wifi.svg'
import mall from '../../static/svg/homepage_mall.svg'
import oneKey from '../../static/images/home/one_key_bg.png'
import oneKey2 from '../../static/images/home/on_communicate_bg.png'
import oneKey1 from '../../static/images/home/one_key_bg1.png'
import oneKey21 from '../../static/images/home/on_communicate_bg1.png'
//默认样式图片
import clinicIntroduce from '../../static/images/home/clinic_introduce_bg.png'
import freeWifi from '../../static/images/home/free_wifi_bg.png'
import newActivity from '../../static/images/home/new_activity_bg.png'
import clinicMall from '../../static/images/home/clinic_mall.png'
//中医默认图片
import clinicIntroduce1 from '../../static/images/home/clinic_introduce_bg1.png'
import freeWifi1 from '../../static/images/home/free_wifi_bg1.png'
import newActivity1 from '../../static/images/home/new_activity_bg1.png'
import clinicMall1 from '../../static/images/home/clinic_mall1.png'
import rightArrow from '../../static/images/home/arrow_bg.png'
import phone from '../../static/images/home/phone_bg.png'
import phone1 from '../../static/images/home/phone_bg1.png'
import { getClinicWIFI, getClinicBanner, getSignature4Js, receiveCoupon,getClinicBaseinfo,getValidCouponInfo, getClinicServerIteamList, getClinicDoctorList,getClinicGoodsList } from '../../api/api'
import { GetRequest } from '../../util/index'
import TechnicalSupport from '../technicalSupport/index'
//组件引入
import GynacIndex from './gynaecology/index'
import ChineseMedicineType2 from './ChineseMedicineType2/index'
import Acne from './acne/index'
import ToothType2 from './toothType2/index'
//牙科第三个版本组件
import ToothType3 from './toothType3/index'
import Blind from './blind/index'
import gold_bg from '../../static/images/subject/index/gold_bg.png'
import gold_top from '../../static/images/subject/index/gold_top.png'
import gold_center from '../../static/images/subject/index/gold_center.png'

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div onClick={(e) => {
        var a = { ...restProps };
        const name = e.currentTarget.getAttribute('name2');
        //根据不同情况跳转到 不同路由
        if (name == '预约') {
            // a.prop.history.push('/F')
        } else if (name == '门诊介绍') {
            a.prop.history.push('/clinicIntroduce')
        } else if (name == '门诊地址') {
            console.log('跳转到门诊地址路由')
        } else if (name == '服务项目') {
            a.prop.history.push('/serviceItems')
        } else if (name == '医生团队') {
            a.prop.history.push('/doctorTeam')
        } else if (name == '门诊活动') {
            a.prop.history.push('/activity')
        } else if (name == '免费无线') {
            console.log('免费无线')
        } else if (name == '门诊商城') {
            console.log('门诊商城')
        }
    }} className={`${className} placeholder`} {...restProps} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', color: '#808080' }}>

        <ReactSVG
            path={`${restProps.url}`}
            evalScripts="always"
            onInjected={svg => {
                console.log('onInjected', svg)
            }}
            renumerateIRIElements={false}
            svgClassName="svg-class-name"
            svgStyle={{ width: 34, height: 34 }}
            className="wrapper-class-name"
        // onClick={() => {
        //   console.log('wrapper onClick')
        // }}
        />

        <span style={{ fontSize: '18px' }}>
            {`${restProps.name}`}

        </span>
    </div>
);

class FlexExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            GetRequest: GetRequest,
            modal1: false,
            getClinicWIFI: getClinicWIFI,
            getSignature4Js: getSignature4Js,
            getClinicBaseinfo: getClinicBaseinfo,
            wifiImg: null,
            lat: null,
            lon: null,
        }
        document.title = "门诊主页"
        console.log(this.state.GetRequest(this.props.prop.location.search).settingCode)
    }
    componentDidMount() {
        // this.state.mock('',{settingCode:1010100010})
        this.getClicicName()
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    getClicicName = () => {
        var self = this;
        this.state.getClinicBaseinfo().then((res) => {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        document.title = obj.result.clinicName
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
    getPosition = () => {
        var self = this;
        this.state.getClinicBaseinfo().then((res) => {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        self.setState({
                            lat: obj.result.lat,
                            lon: obj.result.lon
                        })
                        self.getMap(obj.result.lat, obj.result.lon, obj.result.clinicName)

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
    wifi = () => {
        // this.setState({
        //   modal1:true
        // })
        if (this.state.wifiImg) {
            this.setState({
                modal1: true
            })
        } else {
            this.getWifi()
        }

    }
    getWifi = () => {
        var self = this;
        this.state.getClinicWIFI().then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        if (obj.result && obj.result.wifiImg) {
                            self.setState({
                                wifiImg: obj.result.wifiImg
                            })
                            if(obj.result.wifiImg){
                                self.setState({
                                    modal1: true
                                })
                            }else{
                                Toast.info('暂未开放WiFi');
                            }
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
    getMap = (lat, lon, name) => {
        var self = this;
        this.state.getSignature4Js().then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        // console.log()
                        if (obj.result) {
                            window.wx.config({
                                debug: false,
                                appId: obj.result.appId,
                                timestamp: obj.result.timestamp,
                                nonceStr: obj.result.noncestr,
                                signature: obj.result.signature,
                                jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                                    'onMenuShareAppMessage', 'getLocation', 'openLocation',
                                    'hideOptionMenu']
                            });
                            window.wx.ready(function () {
                                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                                window.wx.checkJsApi({
                                    jsApiList: ['getNetworkType', 'previewImage', 'openLocation', 'getLocation'],
                                    success: function (res) {
                                        // 以键值对的形式返回，可用的api值true，不可用为false
                                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                    }
                                });
                                window.wx.hideOptionMenu();
                                // 2. 分享接口
                                window.wx.getLocation({
                                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                                    success: function (res) {
                                        // alert(JSON.stringify(res));
                                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                        // $("#latitude").val(latitude);
                                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                        // $("#longitude").val(longitude);
                                        var speed = res.speed; // 速度，以米/每秒计
                                        // $("#speed").val(speed);
                                        var accuracy = res.accuracy; // 位置精度
                                        // alert(latitude,longitude)
                                        // $("#accuracy").val(accuracy);
                                    },
                                    cancel: function (res) {
                                        alert('用户拒绝授权获取地理位置');
                                    }
                                });
                                window.wx.openLocation({
                                    latitude: lat, // 纬度，浮点数，范围为90 ~ -90
                                    longitude: lon, // 经度，浮点数，范围为180 ~ -180。
                                    name: name, // 位置名
                                    address: '', // 地址详情说明
                                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                                });
                            })
                            window.wx.error(function (res) {
                                // alert(res)
                            });
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
    //判断去绑定还是去 预约
    bindOrYuyue = () => {
        // var loginInfo=JSON.parse(localStorage.getItem("loginInfo")) 
        //     if(loginInfo&&loginInfo.mobile){
        //       this.props.prop.history.push('/onlineBook')
        //     }else{
        //       this.props.prop.history.push('/bind')
        //     }
        localStorage.removeItem("medicalMessage")
        this.props.prop.history.push('/onlineBook')
    }
    //跳转到商城
    goToBuy = () => {
        // window.location.href="http://ijoou.cn:8210/Business/index"
        Toast.info('商城产品敬请期待!!!', 2, null, false);
    }
    render() {
        return (
            <div className="flex-container" style={{ marginTop: '15px' }}>
                <Flex>
                    <Flex.Item><PlaceHolder prop={this.props.prop} onClick={this.bindOrYuyue.bind(this)} className="good" name=" " name2="预约" /></Flex.Item>
                    <Flex.Item>
                        <PlaceHolder prop={this.props.prop} url={clinic} name="门诊介绍" name2="门诊介绍" />
                        <PlaceHolder prop={this.props.prop} onClick={this.getPosition.bind(this)} url={location} name="门诊地址" name2="门诊地址" />
                    </Flex.Item>
                </Flex>
                <WhiteSpace style={{ marginBottom: '5px' }}></WhiteSpace>
                <Flex>
                    <Flex.Item><PlaceHolder prop={this.props.prop} className="good2" name=" " name2="服务项目" /></Flex.Item>
                    <Flex.Item>
                        <PlaceHolder prop={this.props.prop} url={doctor} name="医生团队" name2="医生团队" />
                        <PlaceHolder prop={this.props.prop} url={activity} name="门诊活动" name2="门诊活动" />
                    </Flex.Item>
                </Flex>
                <WhiteSpace></WhiteSpace>
                <Flex>
                    <Flex.Item><PlaceHolder prop={this.props.prop} url={wifi} onClick={this.wifi.bind(this)} name="免费无线" name2="免费无线" /></Flex.Item>
                    <Flex.Item>
                        <PlaceHolder prop={this.props.prop} url={mall} onClick={this.goToBuy.bind(this)} name="门诊商城" name2="门诊商城" />
                    </Flex.Item>
                </Flex>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="长按识别二维码"
                    footer={[{ text: 'OK', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 140 }}>
                        <img style={{ height: "100%" }} src={this.state.wifiImg} />
                    </div>
                </Modal>



            </div>
        )
    }
}

class Lunbo extends React.Component {
    constructor(props) {
        super(props);
        var clinicShowType = sessionStorage.getItem("clinicShowType");
        var sonSettingCode=window.sessionStorage.getItem('sonSettingCode');
        var showTabBar=true;
        if(sonSettingCode){
            showTabBar=false
        }
        this.state = {
            disabled: false,
            match: this.props.match.path,
            history: this.props.history,
            data: [],
            modal1: false,
            showTabBar:showTabBar,
            imgHeight: 176,
            clinicMess: {},
            serviceList: [],//服务项目数据
            doctorList: [],
            goodsList:[],
            total:0,
            goodsTotal:0,
            couponList:[],
            couponShow:false,
            edtPhone:null,
            modelHeight:0,
            clinicName:'',
            totalAmount:0,
            clinicEnvironmentList: [],
            clinicShowType: clinicShowType||'',
            getClinicBanner: getClinicBanner
        }
    }
    componentDidMount() {
        // simulate img loading
        var clinicShowType = sessionStorage.getItem("clinicShowType");
        this.setState({
            clinicShowType: clinicShowType
        })
        this.getBanner();
        this.getClicicName();
        this.getList();
        this.getDataList();
        this.getGoodsList();
        this.getCouponList();
        //获取门诊模板类型
       

    }
    openMap = () => {
        console.log('openMap')
        var self = this;
        getSignature4Js().then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        if (obj.result) {
                            // console.log()
                            window.wx.config({
                                debug: false,
                                appId: obj.result.appId,
                                timestamp: obj.result.timestamp,
                                nonceStr: obj.result.noncestr,
                                signature: obj.result.signature,
                                jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                                    'onMenuShareAppMessage', 'getLocation', 'openLocation',
                                    'hideOptionMenu']
                            });
                            window.wx.ready(function () {
                                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                                window.wx.checkJsApi({
                                    jsApiList: ['getNetworkType', 'previewImage', 'openLocation', 'getLocation'],
                                    success: function (res) {
                                        // 以键值对的形式返回，可用的api值true，不可用为false
                                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                    }
                                });
                                window.wx.hideOptionMenu();
                                // 2. 分享接口
                                window.wx.getLocation({
                                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                                    success: function (res) {
                                        // alert(JSON.stringify(res));
                                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                        // $("#latitude").val(latitude);
                                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                        // $("#longitude").val(longitude);
                                        var speed = res.speed; // 速度，以米/每秒计
                                        // $("#speed").val(speed);
                                        var accuracy = res.accuracy; // 位置精度
                                        // alert(latitude,longitude)
                                        // $("#accuracy").val(accuracy);
                                    },
                                    cancel: function (res) {
                                        alert('用户拒绝授权获取地理位置');
                                    }
                                });
                                window.wx.openLocation({
                                    latitude: self.state.lat, // 纬度，浮点数，范围为90 ~ -90
                                    longitude: self.state.lon, // 经度，浮点数，范围为180 ~ -180。
                                    name: self.state.clinicName, // 位置名
                                    address: '', // 地址详情说明
                                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                                });
                            })
                            window.wx.error(function (res) {
                                // alert(res)
                            });
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
    getClicicName = () => {
        var self = this;
        getClinicBaseinfo().then((res) => {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        document.title = obj.result.clinicName;
                        self.setState({
                            clinicMess: obj.result,
                            clinicEnvironmentList: obj.result.clinicEnvironmentList,
                            lat: obj.result.lat,
                            clinicName: obj.result.clinicName,
                            lon: obj.result.lon,
                            edtPhone: obj.result.edtPhone
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
    getBanner = () => {
        var self = this;
        var param = "pageType=1"
        this.state.getClinicBanner(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        self.setState({
                            data: obj.result
                        })

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
    //跳转到预约
    bindOrYuyue = () => {
        // var loginInfo=JSON.parse(localStorage.getItem("loginInfo")) 
        //     if(loginInfo&&loginInfo.mobile){
        //       this.props.prop.history.push('/onlineBook')
        //     }else{
        //       this.props.prop.history.push('/bind')
        //     }
        localStorage.removeItem("medicalMessage")
        this.props.history.push('/onlineBook')
    }
    //拨打电话
    callPhone = () => {
        if (!this.state.edtPhone) {
            Toast.info('暂无联系方式 !!!', 1);
            return
        }
        window.location.href = 'tel://' + this.state.edtPhone;
    }
    //门诊介绍
    goIntroduce = () => {
        this.props.history.push('/clinicIntroduce')
    }
    //wifi
    wifi = () => {
        // this.setState({
        //   modal1:true
        // })
        if (this.state.wifiImg) {
            this.setState({
                modal1: true
            })
        } else {
            this.getWifi()
        }

    }
    //wifi接口
    getWifi = () => {
        var self = this;
        getClinicWIFI().then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        Toast.hide()
                        if (obj.result && obj.result.wifiImg) {
                            self.setState({
                                wifiImg: obj.result.wifiImg,
                                modal1: true
                            })
                        }else{
                            Toast.info('暂无wifi')
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
    //关机弹框方法
    onClose = key => () => {
        this.setState({
            couponShow:false
        })
    }
    //跳转活动
    goActivity = () => {
        this.props.history.push('/activity')
    }
    //跳转商城
    goToBuy = () => {
        // window.location.href="http://ijoou.cn:8210/Business/index"
        Toast.info('商城产品敬请期待!!!', 2, null, false);
    }
    //服务项目列表
    getList = (pos = 0, count = 4) => {
        var self = this;
        var clinicShowType = sessionStorage.getItem("clinicShowType");
        if(clinicShowType&&clinicShowType==2){
            count=8;
        }
        if(clinicShowType&&clinicShowType=='03001'){
            count=100;
        }
        if(clinicShowType&&clinicShowType=='01002'){
            count=100;
        }
        if(clinicShowType&&clinicShowType=='01003'){
            count=100;
        }
        if(clinicShowType&&clinicShowType=='04001'){
            count=100;
        }
        var param = "position=" + pos + "&count=" + count;

        getClinicServerIteamList(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        //判断是否是刷新操作
                        self.setState({
                            serviceList: obj.result,
                        })

                    } else {
                        Toast.fail(obj.resultMsg, 1);
                    }


                })

            }
        }).catch(function () {
            Toast.fail("网络错误", 1);
        })
    }
    //更多服务项目
    goServiceItem = () => {
        this.props.history.push('/serviceItems')
    }
    //跳转到详情
    gotoDetail = (id) => {
        this.props.history.push('/serviceItems/' + id)
    }
    gotoGoodsList(){
        this.props.history.push('/goodsList')
    }
    gotoGoodsDetail = (id) => {
        this.props.history.push('/goodsList/' + id)
    }
    //商品列表   getClinicGoodsList
    getGoodsList =(pos = 0, count = 4)=>{
        var self = this;
        var param = "position=" + pos + "&count=" + count
        getClinicGoodsList(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        self.setState({
                          goodsList:obj.result.goodsList||[],
                          goodsTotal:obj.result.num
                        })

                    } else {
                        Toast.fail(obj.resultMsg, 1);
                    }


                })

            }
        }).catch(function () {
            Toast.fail("网络错误", 1);
        })
    }
    //获取医生列表
    //获取列表数据决口
    getDataList = (pos = 0, count = 6) => {
        var self = this;
        var clinicShowType = sessionStorage.getItem("clinicShowType");
        if(clinicShowType==='01002'){
            count=100
        }
        if(clinicShowType==='01003'){
            count=100
        }
        var param = "position=" + pos + "&count=" + count;
        getClinicDoctorList(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        self.setState({
                            doctorList: obj.result.doctorList,
                            total:obj.result.doctorNum
                        })

                    } else {
                        Toast.fail(obj.resultMsg, 1);
                    }


                })

            }
        }).catch(function () {
            Toast.fail("网络错误", 1);
        })
    }
    //图片预览功能
    previewImage = (index) => {
        var self = this;
        getSignature4Js().then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        if (obj.result) {
                            // console.log()
                            window.wx.config({
                                debug: false,
                                appId: obj.result.appId,
                                timestamp: obj.result.timestamp,
                                nonceStr: obj.result.noncestr,
                                signature: obj.result.signature,
                                jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                                    'onMenuShareAppMessage', 'getLocation', 'openLocation',
                                    'hideOptionMenu', 'previewImage']
                            });
                            window.wx.ready(function () {
                                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                                window.wx.checkJsApi({
                                    jsApiList: ['getNetworkType', 'previewImage', 'openLocation', 'getLocation', 'previewImage'],
                                    success: function (res) {
                                        // 以键值对的形式返回，可用的api值true，不可用为false
                                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                    }
                                });
                                window.wx.hideOptionMenu();
                                var urls = []
                                self.state.clinicEnvironmentList.forEach(function (item) {
                                    urls.push(item.fileUrl)
                                })
                                window.wx.previewImage({
                                    current: index.fileUrl, // 当前显示图片的http链接
                                    urls: urls // 需要预览的图片http链接列表
                                });
                            })
                            window.wx.error(function (res) {
                                // alert(res)
                            });
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
    //执行的一个点击事件 判断跳转到 医生详情页面
    handleClick = (e) => {
        this.props.history.push(`/doctorTeam/${e}`)
    }
    goMoreDoctor=()=>{
        this.props.history.push('/doctorTeam')
    }
    goDeveloped=()=>{
        this.props.history.push('/developed')
    }
    getCouponList(){
        var self=this;
      getValidCouponInfo().then(function (res) {
          if (res.ok) {
              res.json().then((obj) => {
                  if (obj.resultCode === "1000") {
                      Toast.hide()
                      if(!obj.result.couponList||obj.result.couponList.length==0){
                          self.setState({
                              couponShow:false
                          })
                          return
                      }
                      self.setState({
                          couponList: obj.result.couponList,
                          clinicName:obj.result.clinicName,
                          totalAmount:obj.result.totalAmount,
                          couponShow:true
                      })
                  
                      var height=document.getElementsByClassName('bottom_50')[0].offsetHeight;
                      var h=0
                      if(height){
                         h=-height/2
                      }
                      self.setState({
                        modelHeight:h
                      })
  
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
    hideCoupon(){
        var self=this;
        var arr=[];
        this.state.couponList.map((item)=>{
                arr.push(item.id)
        })
        var param="couponId="+arr
        receiveCoupon(param).then(function (res) {
            if (res.ok) {
                res.json().then((obj) => {
                    if (obj.resultCode === "1000") {
                        self.setState({
                            couponShow:false,      
                        })
                        Toast.success('领取成功',1)
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
        var component;
        if(this.state.clinicShowType===2||this.state.clinicShowType==='2'){
            component=(
                <GynacIndex myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></GynacIndex>
            )
        }else if(this.state.clinicShowType=='02002'){
            component=(<ChineseMedicineType2 myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></ChineseMedicineType2>)
        }else if(this.state.clinicShowType=="03001") {
            component=(<Acne myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></Acne>)
        }else if(this.state.clinicShowType=="01002"){
            component=(<ToothType2 myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></ToothType2>)
        }else if(this.state.clinicShowType=="01003"){
            component=(<ToothType3 myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></ToothType3>)
        }
        else if(this.state.clinicShowType=="04001"){
            component=(<Blind myNumber="harryBABA" history={this.props.history} bannerList={this.state.data} state={this.state} method={this}></Blind>) 
        }
        else{
            component=(  
               <div>
               {this.state.data.length > 0 &&


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
                           {this.state.data.map((val, index) => (
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
               <WhiteSpace size="xl" />
               {/* <FlexExample prop={this.props}></FlexExample> */}
               {/* 类型为1展示中医类型 */}
               {this.state.clinicShowType == 1 &&
                   <div className="flex_0">
                       <Card full>
                           <Card.Header
                               title={<div><span>{this.state.clinicMess.area}</span> <span>{this.state.clinicMess.address}</span></div>}
                               thumb={locationBg2}
                               thumbStyle={{
                                   width: '15px'
                               }}
                               extra={<div onClick={this.openMap.bind(this)} className="flex_row al_center"><img src={daohang2} style={{ width: '18px', marginLeft: '10px' }} /><span className="right_text" style={{ whiteSpace: 'nowrap', marginLeft: '9px' }}>导航</span></div>}
                           />
                       </Card>
                       <Card full>
                           <Card.Header
                               className="f_14"
                               title={<div style={{ paddingTop: '5px', paddingBottom: '5px' }}>营业时间：上午 <span>{this.state.clinicMess.amStartWork}</span>-<span>{this.state.clinicMess.amEndWork}</span> 下午 <span>{this.state.clinicMess.pmStartWork}</span>-<span>{this.state.clinicMess.pmEndWork}</span></div>}
                               thumb={timeBg}
                               thumbStyle={{
                                   width: '15px'
                               }}
                           />
                       </Card>
                   </div>
               }
               {!this.state.clinicShowType &&
                   <div className="flex_0">
                       <Card full>
                           <Card.Header
                               title={<div><span>{this.state.clinicMess.area}</span> <span>{this.state.clinicMess.address}</span></div>}
                               thumb={locationBg}
                               thumbStyle={{
                                   width: '15px'
                               }}
                               extra={<div onClick={this.openMap.bind(this)} className="flex_row al_center"><img src={daohang} style={{ width: '18px', marginLeft: '10px' }} /><span className="right_text" style={{ whiteSpace: 'nowrap', marginLeft: '9px' }}>导航</span></div>}
                           />
                       </Card>
                       <Card full>
                           <Card.Header
                               className="f_14"
                               title={<div style={{ paddingTop: '5px', paddingBottom: '5px' }}>营业时间：上午 <span>{this.state.clinicMess.amStartWork}</span>-<span>{this.state.clinicMess.amEndWork}</span> 下午 <span>{this.state.clinicMess.pmStartWork}</span>-<span>{this.state.clinicMess.pmEndWork}</span></div>}
                               thumb={timeBg}
                               thumbStyle={{
                                   width: '15px'
                               }}
                           />
                       </Card>
                   </div>
               }


               <WhiteSpace size="xl" />
               { !this.state.clinicShowType &&
               <div className="flex_row" style={{ width: '100%' }}>
                   <div className="flex_1" onClick={this.bindOrYuyue.bind(this)}>
                       <img style={{ width: '100%' }} src={oneKey} />
                   </div>
                   <div className="center_center"></div>
                   <div className="flex_1" onClick={this.callPhone.bind(this)}>
                       <img style={{ width: '100%' }} src={oneKey2} />
                   </div>
               </div>
               }
               { this.state.clinicShowType==1 &&
               <div className="flex_row" style={{ width: '100%' }}>
                   <div className="flex_1" onClick={this.bindOrYuyue.bind(this)}>
                       <img style={{ width: '100%' }} src={oneKey1} />
                   </div>
                   <div className="center_center"></div>
                   <div className="flex_1" onClick={this.callPhone.bind(this)}>
                       <img style={{ width: '100%' }} src={oneKey21} />
                   </div>
               </div>
               }
               <WhiteSpace size="xl" />
               { !this.state.clinicShowType &&
               <div className="around_box flex_row">
                 
                   <div className="flex_1 flex_column al_center" onClick={this.goIntroduce.bind(this)}>
                       <img src={clinicIntroduce} className="wid_80" />
                       <span>门诊介绍</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.wifi.bind(this)}>
                       <img src={freeWifi} className="wid_80" />
                       <span>免费WIFI</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.goActivity.bind(this)}>
                       <img src={newActivity} className="wid_80" />
                       <span>最新活动</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.goToBuy.bind(this)}>
                       <img src={clinicMall} className="wid_80" />
                       <span>门诊商城</span>
                   </div>
               </div>
                }
                {/* 中医类型 */}
                 { this.state.clinicShowType==1 &&
               <div className="around_box flex_row">
                 
                   <div className="flex_1 flex_column al_center" onClick={this.goIntroduce.bind(this)}>
                       <img src={clinicIntroduce1} className="wid_80" />
                       <span>门诊介绍</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.wifi.bind(this)}>
                       <img src={freeWifi1} className="wid_80" />
                       <span>免费WIFI</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.goActivity.bind(this)}>
                       <img src={newActivity1} className="wid_80" />
                       <span>最新活动</span>
                   </div>
                   <div className="flex_1 flex_column al_center" onClick={this.goDeveloped.bind(this)}>
                       <img src={clinicMall1} className="wid_80" />
                       <span>门诊荣誉</span>
                   </div>
               </div>
                }




               {this.state.serviceList.length > 0 &&
                   <div className="flex_row notice_box al_center">
                       <div className="line_left"></div>
                       <span className="text_center flex_1">特色项目</span>
                       {this.state.serviceList.length >= 4 &&
                           <div className="more_right flex_row al_center" onClick={this.goServiceItem.bind(this)}>
                               <span>更多</span>
                               <img src={rightArrow} style={{ width: '8px', marginLeft: '6px' }} />
                           </div>
                       }

                   </div>
               }
               <div className="service_box">
                   {this.state.serviceList.map((val, index) => (
                       <div onClick={this.gotoDetail.bind(this, val.id)} key={index}>
                           <div className="service_pic_box">
                               <img style={{ width: '100%', display: 'block' }} src={val.clisPic} />
                               <div className="service_name">{val.clisName}</div>
                           </div>
                           {val.clisPrice ?(
                               <div className="service_price">
                                   ￥{val.clisPrice}
                               </div>
                               ):(
                                   <div className="service_price">
                                   </div>
                               )
                            }
                       </div>
                   ))}

               </div>
               {this.state.doctorList.length > 0 &&
                   <div className="flex_row notice_box al_center">
                       <div className="line_left"></div>
                       <span className="text_center flex_1">专家团队</span>
                       {this.state.doctorList.length >= 7 &&
                           <div className="more_right flex_row al_center" onClick={this.goMoreDoctor.bind(this)}>
                               <span>更多</span>
                               <img src={rightArrow} style={{ width: '8px', marginLeft: '6px' }} />
                           </div>
                       }
                   </div>
               }
               <div className="team_box">
                   {this.state.doctorList.map((val, index) => (
                       <div className="team_content flex_row" key={index} onClick={this.handleClick.bind(this, val.doctorId)}>
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
               {this.state.clinicMess.clinicIntroduce &&
                   <div className="flex_row notice_box al_center">
                       <div className="line_left"></div>
                       <span className="text_center flex_1">门诊介绍</span>
                   </div>
               }
               <div className="introduce_box">
                   {this.state.clinicMess.clinicIntroduce}
               </div>
               {this.state.clinicEnvironmentList.length > 0 &&
                   <div className="flex_row notice_box al_center">
                       <div className="line_left"></div>
                       <span className="text_center flex_1">门诊环境</span>
                   </div>
               }
               <div className="pic_box">
                   {this.state.clinicEnvironmentList.map((val, index) => (
                       <div className="pic_content" key={index} onClick={this.previewImage.bind(this, val)}>
                           <img style={{ width: '100%', display: 'block' }} src={val.fileUrl} />
                       </div>
                   ))}
               </div>

               <div className="phone_box_call" onClick={this.callPhone.bind(this)}>
                   {!this.state.clinicShowType &&
                   <img src={phone} style={{ width: '100%' }} />
                    }
                    {this.state.clinicShowType==1 &&
                   <img src={phone1} style={{ width: '100%' }} />
                    }
               </div>
             
               </div>
   
            )
        }
        return (

            <div>
                <div className="top_zindex" style={{ position: 'absolute', top: '0', bottom: this.state.showTabBar?'50px':'0px', right: '0', left: '0', overflowY: 'scroll', WebkitOverflowScrolling: 'touch' }}>
            <div className='small-nav-inner'>

                {component}
                <Modal
          popup
          visible={this.state.couponShow}
          className="bottom_50"
        //   maskClosable={false}
        closable={true}
          style={{marginBottom:this.state.modelHeight}}
          wrapClassName='wrapClassName'
          transitionName="half"
          ref={el => this.model = el}
          onClose={this.onClose()}
          animationType="slide-up"
        >
          <div className='prop_container flex_column al_center' style={{borderRadius:'20px',width:'80%',background:'url('+gold_bg+') no-repeat center',backgroundSize:'cover',marginLeft:'10%'}}>
                    <div className="just_content_center flex_column al_center" style={{height:'110px',width:'100%',background:'url('+gold_top+') no-repeat center',backgroundSize:'contain'}}>
                            <span > <span style={{fontSize:'26px',color:"#f31a31"}}>{this.state.totalAmount} </span> <span style={{fontSize:'26px',fontWeight:'700',color:"#000"}}>元现金券</span></span>
                            <span style={{color:'#000',marginTop:'5px'}}>{this.state.clinicName}  专属豪礼 先到先得</span>
                    </div>


                    {
                        this.state.couponList.length<=3 &&

                        this.state.couponList.map((item,index)=>(
                            <div key={index}  className="just_content_center flex_column al_center"  style={{width:'90%',background:'url('+gold_center+') no-repeat center',backgroundSize:'100% 100%',paddingTop:'17px',paddingBottom:'20px',marginTop:'5px'}}>
                                <span><span style={{fontSize:'25px',color:'#c4902d'}}>{item.couponAmount}</span>  <span  style={{color:'#c4902d'}}></span>  元现金券</span>
                                <span style={{color:'#c4902d'}}>--满{item.enableAmount}元可用--</span>
                            </div>
                        ))

                    }
                  
                 { this.state.couponList.length>=4 &&
                     <div className="flex_wrap" style={{width:'100%',maxHeight:'300px',overflowY:'scroll'}}>
                        {
                            this.state.couponList.map((item,index)=>(
                                <div key={index} className="just_content_center flex_column al_center" style={{width:'50%',background:'url('+gold_center+') no-repeat center',backgroundSize:'100% 100%',paddingTop:'10px',paddingBottom:'15px',marginTop:'9px'}}>
                                <span><span style={{fontSize:'13px',color:'#c4902d'}}>{item.couponAmount}</span> <span style={{color:'#c4902d',fontSize:'8px'}}> 元现金券</span> </span>
                                <span style={{color:'#c4902d',fontSize:'8px'}}>--满{item.enableAmount}元可用--</span>
                                </div>
                            ))
                        }
                       
                       
                    </div>
                     }
                
                   
                    <div className="onkeygetCoupon" onClick={this.hideCoupon.bind(this)}>一键领取</div>
          </div>
        </Modal>





              {/* wifi组件 */}
              <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('modal1')}
                        title="长按识别二维码"
                        footer={[{ text: 'OK', onPress: () => { console.log('ok'); this.setState({modal1:false}) } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div style={{ height: 140 }}>
                            <img style={{ height: "100%" }} src={this.state.wifiImg} />
                        </div>
               </Modal>
                    <TechnicalSupport history={this.props.history} ></TechnicalSupport>
            </div>
                </div>
                {
                    this.state.showTabBar &&
                    <TabBarExample  ></TabBarExample>
                }
                    
            </div>
        );
    }
}



const Topic = ({ match }) => (
    <div>
        <h3>我是2222</h3>
    </div>
);
class Iteme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            match: this.props.match.path,
            history: this.props.history
        }
    }
    render() {
        return (
            <div>

                {/* <Switch> */}

                <Route exact path={`${this.state.match}`} component={Lunbo} />
                <Route path={`${this.state.match}/detail`} component={Topic} />
                {/* </Switch> */}


            </div>);
    }
}
export default Iteme
