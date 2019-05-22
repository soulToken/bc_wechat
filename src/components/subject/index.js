import React, { Component } from 'react';
import { findDomNode } from 'react-dom';
import ReactDOM from 'react-dom';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank ,Icon,PullToRefresh} from 'antd-mobile';
import { getClinicWIFI, getClinicBanner,getchainClinicList,receiveCoupon, getValidCouponInfo,getSignature4Js, getClinicBaseinfo, getClinicServerIteamList, getClinicDoctorList,getClinicGoodsList } from '../../api/api'
import { TabBar, ListView } from 'antd-mobile';
import home from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import home_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import department from '../../static/images/subject/toobar/department.png'
import department_checked from '../../static/images/subject/toobar/department_checked.png'
import book from '../../static/images/subject/toobar/homepage_preconditioning_1@3x.png'
import book_checked from '../../static/images/subject/toobar/homepage_preconditioning@3x.png'
import personIcon from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import personIcon_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import medicine from '../../static/images/subject/index/medicine.png'
import surgery from '../../static/images/subject/index/surgery.png'
import stomatology from '../../static/images/subject/index/stomatology.png'
import chineseMedicine from '../../static/images/subject/index/chineseMedicine.png'
import gynaecology from '../../static/images/subject/index/gynaecology.png'
import pediatrics from '../../static/images/subject/index/pediatrics.png'
import service_box_bg from '../../static/images/subject/index/service_box_bg.png'
import radio from '../../static/images/subject/index/radio.png'
import question from '../../static/images/subject/index/question.png'
import online from '../../static/images/subject/index/online.png'
import common_title_bg from '../../static/images/subject/index/common_title_bg.png'
import banner from '../../static/images/subject/index/banner@3x.png'
import doctor_head from "../../static/images/subject/index/doctor_head.png"
import hospital from '../../static/images/subject/index/hospital.png'
import TechnicalSupport from '../technicalSupport/index'
import gold_bg from '../../static/images/subject/index/gold_bg.png'
import gold_top from '../../static/images/subject/index/gold_top.png'
import gold_center from '../../static/images/subject/index/gold_center.png'
import './index.scss'
const operation = Modal.operation;
const arr=[
    medicine,surgery,stomatology,chineseMedicine,gynaecology,pediatrics
]
class ListViewExample extends React.Component {
  constructor(props) {
    super(props);
    window.sessionStorage.removeItem('sonSettingCode');
    this.state = {
      isLoading: true,
      bannerList:[],
      data: [],
      clinicMess:null,
      clinicEnvironmentList:[],
      lat:null,
      clinicNum:0,
      clinicList:[],
      lng:null,
      doctorList:[],
      total:0,
      couponList:[],
      couponShow:false,
      edtPhone:null,
      modelHeight:0,
      clinicName:'',
      totalAmount:0,
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight-50,
    };
  }

  componentDidMount() {
    this.getBanner();
    this.getCouponList();
    this.getClicicName();
    this.getDataList();
    // this.getClinicList();
    this.getWhere()
  }

  getWhere = () => {
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
                                    self.getClinicList(res.longitude,res.latitude)
                                    // $("#accuracy").val(accuracy);
                                },
                                cancel: function (res) {
                                    // alert('用户拒绝授权获取地理位置');
                                    self.getClinicList()
                                }
                            });
                        })
                        window.wx.error(function (res) {
                            // alert(res)
                            self.getClinicList()
                        });
                    }
                } else {
                    Toast.hide()
                    Toast.fail(obj.resultMsg, 1);
                    self.getClinicList()
                }
            })
        }
    }).catch(function () {
        Toast.hide()
        self.getClinicList()
        Toast.fail("网络错误", 1);
    })
}
callPhone = () => {
    if (!this.state.edtPhone) {
        Toast.info('暂无联系方式 !!!', 1);
        return
    }
    window.location.href = 'tel://' + this.state.edtPhone;
}
bindOrYuyue = (id,name) => {
    // var loginInfo=JSON.parse(localStorage.getItem("loginInfo")) 
    //     if(loginInfo&&loginInfo.mobile){
    //       this.props.prop.history.push('/onlineBook')
    //     }else{
    //       this.props.prop.history.push('/bind')
    //     }
    localStorage.removeItem("medicalMessage")

    if(id&&name){
        sessionStorage.setItem("doctorId",id);
        sessionStorage.setItem("doctorName",name);
    }else{
        sessionStorage.removeItem("doctorId");
        sessionStorage.removeItem("doctorName");
    }
    this.props.history.push('/onlineBook')
}
//lon=113.94679,lat=22.556374
getClinicList(lon='',lat='',pos = 0, count = 5){
    var self=this;
    var param = "position=" + pos + "&count=" + count+'&lonNowStr='+lon+'&latNowStr='+lat;
    getchainClinicList(param).then(function (res) {
        if (res.ok) {
            res.json().then((obj) => {
                if (obj.resultCode === "1000") {
                    if(obj.result){
                        self.setState({
                            clinicList:obj.result.clinicList||[],
                            clinicNum:obj.result.clinicNum||obj.result.total
                        })
                    }else{
                        self.setState({
                            clinicList:[],
                            clinicNum:0
                        })
                    }
                    

                } else {
                    Toast.fail(obj.resultMsg, 1);
                }


            })

        }
    }).catch(function () {
        Toast.fail("网络错误", 1);
    })
}
  //获取医师列表
  getDataList = (pos = 0, count = 6) => {
    var self = this;
    count=100
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
  getCoupon(){
      Toast.info('harry',1)
  }
  getBanner = () => {
    var self = this;
    var param = "pageType=1"
   getClinicBanner(param).then(function (res) {
        if (res.ok) {
            res.json().then((obj) => {
                if (obj.resultCode === "1000") {
                    Toast.hide()
                    self.setState({
                        bannerList: obj.result
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
goSearch(){
    // Toast.info('搜索跳转!!!', 1);
    window.sessionStorage.removeItem('searchObj');
    this.props.history.push('/search')
}
goChooseClinic(index){
    this.props.history.push(`/department?source=${index}`)
}
gotoDoctorDetail(index){
    Toast.info('第!!!'+(index+1)+'个医生详情', 1);
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
     //重置相关诊所配置
    document.getElementById('root').className="otherType"
    this.props.history.push(`/doctorTeam/${e}`)
}
//react 组织事件 冒泡
openMap = (lat,lon,name,e) => {
    e.stopPropagation();
    var self = this;
    console.log(lat,lon)
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
                            Toast(res)
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
//跳转到门诊界面
goOutpatient(){
    this.props.history.push('/outpatient')
}
//微信文章浏览界面
goArtical(){
    this.props.history.push('/article')
}
//我的预约界面
goRecord(){
    this.props.history.push('/subRecord')
}
 //关机弹框方法
 onClose = key => () => {
    this.setState({
        couponShow:false
    })
}
onRefresh = () => {
    // this.setState({ refreshing: true, isLoading: true });
  };
  render() {
    return (
        <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={'down'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
      <div className="width_100  bgfff"  style={{position:'static'}}> 
            {this.state.bannerList.length > 0 &&
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
                                {this.state.bannerList.map((val, index) => (
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
                    <div className="subject_index_search">
                        <div onClick={this.goSearch.bind(this)} className="width_100 flex_row al_center" style={{background:"#fff",height:'100%',color:'#808080',paddingLeft:'12px'}}>
                                <Icon type="search" size="sm" />
                                <span style={{marginLeft:'12px'}}>搜索</span>
                        </div>
                    </div>
                    <div className="flex_wrap pt_20 pb_20">
                        {arr.map((item,index)=>(
                                  <div className="width_50 mb_4"  onClick={this.goChooseClinic.bind(this,index)} key={index}>
                                    <img src={item} className="width_100" />
                                </div>
                        ))}
                    </div>
                    <div className="subject_service_box flex_column colorfff" style={{height:'122px',background:'url('+service_box_bg+') no-repeat center',backgroundSize:'cover',paddingTop:'28px',paddingLeft:'20px'}}>
                            <span style={{fontSize:'17px',lineHeight:'26px'}}>会员服务</span>
                            <span style={{fontSize:'14px'}}>Membership service</span>
                    </div>
                    <div className="flex_row" style={{paddingLeft:'10px',paddingRight:'10px',marginTop:'-35px'}}>
                            <div className="flex_1 subject_option_box al_center flex_column" onClick={this.goArtical.bind(this)}>
                                    <img src={radio} style={{width:'50%'}} />
                                    <span style={{marginTop:'5px'}}>名医讲堂</span>
                            </div>
                            <div style={{width:'10px',height:'2px'}}></div>
                            <div className="flex_1 subject_option_box al_center flex_column " onClick={this.callPhone.bind(this)}>
                                    <img src={question} style={{width:'50%'}}  />
                                    <span style={{marginTop:'5px'}}>医生问答</span>
                            </div>
                            <div style={{width:'10px',height:'2px'}}></div>
                            <div className="flex_1 subject_option_box al_center flex_column"  onClick={this.goRecord.bind(this)}>
                                    <img src={online} style={{width:'50%'}} />
                                    <span style={{marginTop:'5px'}}>我的预约</span>
                            </div>
                    </div>
                    <div className="subject_index_story flex_column colorfff" style={{marginTop:'38px',background:'url('+common_title_bg+') no-repeat center',backgroundSize:'cover',paddingTop:'16px',paddingLeft:'20px'}}>
                            <span style={{fontSize:'17px',lineHeight:'26px'}}>品牌故事</span>
                            <span style={{fontSize:'14px'}}>Brand story</span>
                    </div>
                    {
                        this.state.clinicMess&&this.state.clinicMess.clinicIntroduce &&
                        <div className="subject_index_story_detail">
                          {this.state.clinicMess.clinicIntroduce}
                        </div>
                    }
                    
                    <div className="subject_index_honor_box flex_wrap">
                        {this.state.clinicEnvironmentList.map((item,index)=>(
                             <div onClick={this.previewImage.bind(this,item)} key={index} className="subject_honor_container  width_50">
                                <div className="children" style={{background:'url('+item.fileUrl+') no-repeat center',backgroundSize:'cover'}}></div>
                             </div>
                        ))}
                           
                          
                    </div>
                    {this.state.doctorList.length > 0 &&
                    <div className="subject_index_story flex_column colorfff" style={{marginTop:'20px',background:'url('+common_title_bg+') no-repeat center',backgroundSize:'cover',paddingTop:'16px',paddingLeft:'20px'}}>
                            <span style={{fontSize:'17px',lineHeight:'26px'}}>医疗团队</span>
                            <span style={{fontSize:'14px'}}>Medical team</span>
                    </div>
                    }
                    <div style={{marginTop:'27px',marginBottom:'38px'}}>
                    {this.state.doctorList.length > 0 &&
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
                            {this.state.doctorList.map((val, index) => (
                                <a
                                key={val}
                                onClick={this.handleClick.bind(this, val.doctorId)}
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    // top: this.state.slideIndex === index ? -10 : 0,
                                    // height: '220px',
                                    paddingTop:'140%',
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                                >
                                <div   style={{height:'100%',background:'url('+val.headUrl+') no-repeat center',backgroundSize:'cover',width:'100%',position:'absolute',left:0,right:'0',top:0}}>
                                    <div style={{paddingTop:'5px',paddingBottom:'5px',position:'absolute',bottom:'12px',width:'100%',alignItems:'baseline'}} className="flex_row bg356 just_content_center colorfff">
                                            <span style={{fontSize:'14px'}}>{val.doctorName}</span>
                                            <span style={{fontSize:'12px',marginLeft:'7px'}}>({val.positio})</span>
                                    </div>
                                </div>
                                
                                </a>
                            ))}
                            </Carousel>
                        </WingBlank>
                    }
                        </div>
                        <div className="subject_index_story flex_column colorfff" style={{marginTop:'20px',background:'url('+common_title_bg+') no-repeat center',backgroundSize:'cover',paddingTop:'16px',paddingLeft:'20px'}}>
                            <span style={{fontSize:'17px',lineHeight:'26px'}}>诊所列表</span>
                            <span style={{fontSize:'14px'}}>Clinics list</span>
                        </div>
                        <div className="subject_clinic_box">
                            {this.state.clinicList.map((item,index)=>(
                                      <div key={index} className="subject_clinic_container flex_row" style={{marginBottom:'10px'}} onClick={this.goOutpatient.bind(this)}>
                                                <div style={{width:'80px',marginRight:'20px',background:'url('+hospital+') no-repeat center',backgroundSize:'cover'}}>
                                                        {/* <img src={hospital} className="width_100 block" style={{height:'100%'}} /> */}
                                                </div>
                                                <div className="flex_1 flex_column" style={{height:'100%',paddingTop:'15px',paddingBottom:'15px',lineHeight:'18px',paddingRight:'22px'}}>
                                                        <div className="flex_row just_content_sb">
                                                                <span className="flex_row">
                                                                 <span style={{whiteSpace:'nowrap'}}>名称：</span> 
                                                                    <span>{item.clinicName}</span>    
                                                                </span>
                                                                <div className="subject_address_box flex_row al_center" style={{position:'relative',zIndex:'10'}} onClick={(e)=>this.openMap(item.lat,item.lon,item.clinicName,e)}>导航</div>
                                                        </div>
                                                        <span>电话：{item.edtPhone}</span>
                                                        <span className="flex_row">
                                                           <span style={{whiteSpace:'nowrap'}}>地址：</span> 
                                                            <span>
                                                            {item.provice||''} {item.city||""} {item.area||''} {item.address||''}
                                                            </span>
                                                        </span>                               
                                                </div>
                                       </div>
                            ))}
                          
                           
                        </div>
                        {
                            this.state.clinicNum>5 &&
                            <div className="subject_index_getMore">
                                    <div className="subject_getMore" onClick={this.goOutpatient.bind(this)}>查看更多</div>
                            </div>
                        }
                        <TechnicalSupport history={this.props.history}></TechnicalSupport>

                         <Modal
          popup
        
          visible={this.state.couponShow}
          className="bottom_50"
          style={{marginBottom:this.state.modelHeight}}
          wrapClassName='wrapClassName'
          transitionName="half"
          closable={true}
          ref={el => this.model = el}
          onClose={this.onClose('modal2')}
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


      </div>
    </PullToRefresh>
    );
  }
}

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#356bb3"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="首页"
            key="首页"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+home+') center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+home_checked+') center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
    
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <ListViewExample  history={this.props.history} />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+department+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+department_checked+') center center /  21px 21px no-repeat' }}
              />
            }
            title="门诊"
            key="门诊"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
              this.props.history.push('/outpatient')
            }}
            data-seed="logId1"
          >
            {/* {this.renderContent('Koubei')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+book+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+book_checked+') center center /  21px 21px no-repeat' }}
              />
            }
            title="预约"
            key="预约"
    
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
              this.props.history.push('/subrecord')
            }}
          >
            {/* {this.renderContent('Friend')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: personIcon }}
            selectedIcon={{ uri:personIcon_checked }}
            title="我的"
            key="我的"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
              this.props.history.push('/submy')
            }}
          >
            {/* {this.renderContent('My')} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample 