import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {findDOMNode} from 'react-dom'
import { TabBar, ListView ,Toast,SegmentedControl,Modal,PullToRefresh,List,Button} from 'antd-mobile';
import {GetRequest} from '../../util/index'
import {queryAppointmentList,modifyAppointmentStatus,getchainClinicList,getSignature4Js,getClinicConfig,getUserCouponList} from '../../api/api'
import home from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import home_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import department from '../../static/images/subject/toobar/department.png'
import department_checked from '../../static/images/subject/toobar/department_checked.png'
import book from '../../static/images/subject/toobar/homepage_preconditioning_1@3x.png'
import book_checked from '../../static/images/subject/toobar/homepage_preconditioning@3x.png'
import personIcon from '../../static/images/subject/toobar/homepage_home_1@3x.png'
import personIcon_checked from '../../static/images/subject/toobar/homepage_home@3x.png'
import bigHospital from '../../static/images/subject/index/bigHospital.png'
import small from '../../static/images/subject/index/small.png'
import {getDay} from '../../util/index'
import hospital from '../../static/svg/make_an_appointment_hospital.svg'
import hospital1 from '../../static/images/make_appointment.png'
import img1 from '../../static/svg/weidao.svg'
import img2 from '../../static/svg/cancle.svg'
import img3 from '../../static/svg/jiuzhen.svg'
import phone from '../../static/images/subject/index/phone.png'
import time from '../../static/images/subject/index/time.png'
import success from '../../static/svg/online_booking_time_fail.svg'
import address from '../../static/images/subject/index/address.png'
import {getDate} from '../../util/index'
import './index.scss'
const alert = Modal.alert;
class ListViewExample extends React.Component {
  constructor(props) {
    super(props);
    document.title="预约记录"
    window.sessionStorage.removeItem('sonSettingCode')
    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      data:[],
      show:false,
      modal2:false,
      lon:'',
      lat:'',
      currentIndex:0,
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }
//   shouldComponentUpdate(){
//     //   return false
//   }
  componentDidMount() {


    
    this.genDataList(0,6,1,1,1)
    // this.getWhere();    
  }
 

  genDataList = (pos=0,count=6,status=1,fresh,getclinic) =>{
    var self=this;
    this.setState({
        isLoading:true,
        show:false
    })
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop-50;
  
    var param="position="+pos+"&count="+count+'&type='+status
    getUserCouponList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 

              //判断是否是刷新操作
              if(fresh){
                var newData=obj.result;
              }else{
                var newData=self.state.data.concat(obj.result);
              }
             
            
                 self.setState({
                   data:newData,
                   dataSource: self.state.dataSource.cloneWithRows(newData),
                   height: hei,
                   refreshing: false,
                   isLoading: false,
                 })    
               

            }else{
                Toast.fail(obj.resultMsg, 1);
            }
        
        })

    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }
 
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      this.setState({ isLoading: true });
      var index=this.state.currentIndex;
    if(index==1){
        this.genDataList(this.state.data.length,6,0,0,1)
    }else if(index==2){
        this.genDataList(this.state.data.length,6,2,0,1)
    }else{
        this.genDataList(this.state.data.length,6,1,0,1)
    }
    //   this.genDataList(this.state.data.length)
  }
  onChange(e){
    var index=e.nativeEvent.selectedSegmentIndex
    //切换之前将数据置为空
    this.setState({
        data:[],
        dataSource: this.state.dataSource.cloneWithRows([]),
      //   show:!this.state.show
    }) 
    this.setState({
        currentIndex:index
    },()=>{
        if(index==1){
            this.genDataList(0,6,0,1,1)
        }else if(index==2){
            this.genDataList(0,6,2,1,1)
        }else{
            this.genDataList(0,6,1,1,1)
        }
    })  
}
canCel=(id,money,payId)=>{
    var self=this;
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
  changeStatus=(id)=>{
    var self=this;
    var param="id="+id+"&appointmentStatus="+4
    modifyAppointmentStatus(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.info('取消预约成功!!!', 1);
                // self.genDataList(0,5,1,1)
             
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
//   valueChange(e){
//     if(e.nativeEvent.value=="等待就诊"){
//         this.genDataList(0,6,0,1)
//     }else{
//         this.genDataList(0,6,1,1)
//     }
//     this.setState({
//         show:!this.state.show
//     })
//   }


call(mobile){
    if (!mobile) {
        Toast.info('暂无联系方式 !!!', 1);
        return
    }
    window.location.href = 'tel://' + mobile;
  }
  openMap = (lat,lon,name) => {
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
goSingle=(id)=>{
    var self=this;
    window.sessionStorage.setItem('sonSettingCode',`wxc_${id}`)
    getClinicConfig().then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){
                  //存储类型
                   //存储诊所配置相关信息字段
                //    sessionStorage.setItem('clinicConfigInfo', JSON.stringify(obj.result));
                    // sessionStorage.setItem('clinicConfigInfo', JSON.stringify(obj.result));
                   sessionStorage.setItem('isPayment', obj.result.isPayment);
                  if (obj.result&&obj.result.clinicShowType&&obj.result.clinicShowType!="0"){
                        //存储 门诊样式类型  todo 注释
                        sessionStorage.setItem("clinicShowType",obj.result.clinicShowType)
                        if(obj.result.clinicShowType==2){
                            document.getElementById('root').className="gynaecology"
                        }else if(obj.result.clinicShowType=='02002'){
                            document.getElementById('root').className="ChineseMedicineType2"
                        }else if(obj.result.clinicShowType=='03001'){
                        // sessionStorage.setItem("clinicShowType","02002")
                        document.getElementById('root').className="acne"
                        }else if(obj.result.clinicShowType=='1'){
                            document.getElementById('root').className="ChineseMedicine"
                        }else if(obj.result.clinicShowType=='01002'){
                            document.getElementById('root').className="toothType2"
                        }else{
                            sessionStorage.setItem("clinicShowType",'');
                            document.getElementById('root').className="otherType"
                        }
                        

                  }else{
                      //存储 门诊样式类型
                      sessionStorage.setItem("clinicShowType",'');
                      document.getElementById('root').className="otherType"
                }
            
                self.props.history.push('/single')
                // sessionStorage.setItem("clinicShowType",2)
                // sessionStorage.setItem("clinicShowType","1")
                // document.getElementById('root').className="ChineseMedicine"
              }else{
                  Toast.fail(obj.resultMsg,1)
              }
              // 给元素添加好 外层类名  todo  加上判断
             
        
          })
      }
      }).catch(function(){
        self.props.history.push('/single')
      })    
}
bindOrYuyue = (id) => {
    window.sessionStorage.setItem('sonSettingCode',`wxc_${id}`)
    localStorage.removeItem("medicalMessage")
    this.props.history.push('/onlineBook')
}
onRefresh = () => {
    // this.setState({ refreshing: true, isLoading: true });
}
onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  goConfirm(){
    this.setState({
        modal2: false,
      });
  }
  goDetail=(item)=>{
    window.sessionStorage.setItem('couponMessage',JSON.stringify(item))
    this.props.history.push('/couponDetail')
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 18
        }}
      />
    );
    const row = (val, sectionID, index) => {
        var row=val;
    
      return (
        <div style={{paddingLeft:'12px',paddingRight:'12px',background:'#fff'}}>
        <div className="flex_row coupon_box"   key={index}  style={{alignItems:'stretch',height:'100px',marginBottom:'10px'}}>
        <div className={row.canUse!='1'&&this.state.currentIndex!=1?'disabled coupon_left flex_column just_content_sb ' : 'coupon_left flex_column just_content_sb'} style={{width:'106px'}}>
            <span >￥
            
                <span style={{fontSize:'23px'}}>{row.couponAmount}</span> 
            </span>
            <span style={{marginTop:'16px'}}>满{row.enableAmount}可用</span>
            <div className="coupon_center flex_column al_center just_content_sb">
                <div className="half_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="whole_circle"></div>
                <div className="half_circle2"></div>
            </div>
        </div>
        <div className={ (row.canUse!='1'&&this.state.currentIndex!=1?'disabled flex_1 coupon_right flex_column just_content_sb': 'flex_1 coupon_right flex_column just_content_sb') +   (this.state.currentIndex==1?" haveUse":'') } >
            <span style={{fontSize:'15px'}}>{row.couponName}</span>
            <span className="over_two_ellipsis" style={{fontSize:'10px',color:'#bebebe',WebkitBoxOrient:'vertical',lineHeight:'16px'}}>{row.couponRemark}</span>
            <span style={{color:"#a6a6a6"}}>于{getDate(row.endDate)}日到期</span>
            {
                row.couponType==1 &&
                <div className="text_right" onClick={this.goDetail.bind(this,row)} style={{color:"#a6a6a6"}}>详情>></div>
            }
           
        </div>
    </div>
    </div>
      );
    };
   

    return (
        <div className="flex_column">
            <div style={{padding:'18px 10px 10px 10px',top:'0',zIndex:'2',background:'#f5f5f9'}}> <SegmentedControl tintColor={'#356bb3'} selectedIndex={this.state.currentIndex}  onChange={this.onChange.bind(this)} values={['未使用', '已使用','已过期']} /> </div>
      {/* 谈框 */}


         <Modal

popup
visible={this.state.modal2}
maskClosable={false}
onClose={this.onClose('modal2')}
animationType="slide-up">
<List className="popup-list">

<div>
   <div className="alertContent">
     <img src={success} />
     <div style={{color:"#000000",fontSize:'15px',padding: '0 70px',lineHeight:'21px'}}>
        抱歉，该订单暂不支持线上取消 您可联系客服取消订单或前往门店
     </div>
     {/* <div className="chooseTimeshow">就诊时间 
  
      {this.state.currentChooseDate &&
         <span> {this.state.currentChooseDate.label}号 </span>
       }
       {this.state.currentChooseTime}
     </div> */}
      </div>
       <Button type="primary" onClick={this.goConfirm.bind(this)}   style={{marginBottom:'30px'}}>确定</Button>
 </div>
 </List>
</Modal>

     
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <div style={{padding:'18px 10px 10px 10px',position:'fixed',top:'0',width:"100%",zIndex:'2',background:'#f5f5f9'}}> <SegmentedControl tintColor={'#356bb3'} selectedIndex={this.state.currentIndex}  onChange={this.onChange.bind(this)} values={['等待就诊', '就诊记录']} /> </div>}
        renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '暂无更多数据'}
        </div>)}
        renderSectionHeader={() => (
            <div>
                {
                    this.state.show &&
                    <div style={{textAlign:'center',padding:'5px 0px',background:'#f5f5f9'}}>暂无相关预约数据</div>
                }
            </div>
        )}
        renderRow={row}
        className="bgf5f5f9 flex_1"
        // renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
          background:'#f5f5f9'
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        pullToRefresh={<PullToRefresh
            // refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={20}
      />
         </div>
    );
  }
}

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'greenTab',
      hidden: false,
    };
  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
      </div>
    );
  }


  render() {
    return (
        // <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
             <ListViewExample  history={this.props.history}/>
        // </div>
    );
  }
}

export default TabBarExample 