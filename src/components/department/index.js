import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import {chainClinicSearch,getSignature4Js,getClinicConfig} from '../../api/api'
import {Toast} from 'antd-mobile'
import { Route } from "react-router-dom";
import {GetRequest} from '../../util/index'
import bigHospital from '../../static/images/subject/index/bigHospital.png'
import phone from '../../static/images/subject/index/phone.png'
import time from '../../static/images/subject/index/time.png'
import address from '../../static/images/subject/index/address.png'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';
const typeArr=['内科','外科','牙科','中医','妇科','儿科']
class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    //移除 之前存储的 子诊所code
    window.sessionStorage.removeItem('sonSettingCode');
    //移除存储的 服务相关数据
    window.sessionStorage.removeItem("serverId");
    window.sessionStorage.removeItem("clisName");
    window.sessionStorage.removeItem('clisPrice');
  var keyWord=typeArr[GetRequest(this.props.location.search).source]
    document.title=keyWord
    this.state = {
      dataSource,
      keyWord:keyWord,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      lon:'113.94679',
      lat:'22.556374',
      data:[]
    };
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentDidMount() {
    this.getList()
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
                                    self.setState({
                                        lon:res.longitude,
                                        lat:res.latitude
                                    },function(){

                                    })
                                    // alert(latitude,longitude)
                                    // $("#accuracy").val(accuracy);


                                },
                                cancel: function (res) {
                                    alert('用户拒绝授权获取地理位置');
                                }
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

  getList=(pos=0,count=5,fresh)=>{
    var self=this;
    var  hei=this.state.height
    if(ReactDOM.findDOMNode(this.lv)){
      var hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    }
    var param="position="+pos+"&count="+count+'&searchType='+3+'&keyWord='+this.state.keyWord+'&lonNowStr='+this.state.lon+'&latNowStr='+this.state.lat
    chainClinicSearch(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
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
                Toast.hide()
                Toast.fail(obj.resultMsg, 1);
            }
        })

    }
    }).catch(function(){
      Toast.hide()
      Toast.fail("网络错误", 1);
    })
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax

    this.getList(0,5,1)
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log(this.state.data.length)
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
  
    this.getList(this.state.data.length)
  };
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
              }
              // 给元素添加好 外层类名  todo  加上判断
             
        
          })
      }
      }).catch(function(){
        self.props.history.push('/single')
      })     
}
bindOrYuyue = (id) => {
    var self=this;
    window.sessionStorage.setItem('sonSettingCode',`wxc_${id}`)
    getClinicConfig().then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){
                  //存储类型
                   //存储诊所配置相关信息字段
                //    sessionStorage.setItem('clinicConfigInfo', JSON.stringify(obj.result));
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
                localStorage.removeItem("medicalMessage")
                self.props.history.push('/onlineBook')
            
                // self.props.history.push('/single')
                // sessionStorage.setItem("clinicShowType",2)
                // sessionStorage.setItem("clinicShowType","1")
                // document.getElementById('root').className="ChineseMedicine"
              }
              // 给元素添加好 外层类名  todo  加上判断
             
        
          })
      }
      }).catch(function(){
        // self.props.history.push('/single')
        localStorage.removeItem("medicalMessage")
        self.props.history.push('/onlineBook')
      })     







   
}
  _renderRow(row, sectionId, index) {
    return (
        <div key={index} style={{ padding: '0 10px',background:'#F5F5F9' }}>
        <div className="outpatient_clinic_box flex_column">
                <div className={index==0?'flex_column outpatient_clinic_box_top small':'flex_column outpatient_clinic_box_top'}>
                    <div className=" flex_row">
                                <div className="outpatient_clinic_box_top_left">
                                    <img src={bigHospital} className="width_100" />
                                </div>
                                <div className="flex_1 flex_column just_content_sb" style={{color:'#fff'}}>
                                        <span style={{fontSize:'23px',marginTop:'15px'}}>{row.clinicName}</span>
                                        <span style={{lineHeight:'24px'}}>{row.mainClinicName}</span>
                                </div>
                            
                    </div>
                    <div><span style={{float:'right',color:'#fff'}}>{row.distance>1000?row.distance/1000+'km':row.distance+'m'}</span></div>
                </div>
                <div style={{paddingLeft:'13px',paddingRight:'13px'}}>
                        <div className="flex_column" >
                            <div className="flex_row al_center" style={{padding:'22px 12px 10px 12px',borderBottom:'1px solid #f1f1f4'}}>
                                   <img className="block" src={time} style={{width:'20px',marginLeft:'10px',marginRight:'10px'}} />
                                   <span className="flex_1">
                                   营业时间：{row.amStartWork}-{row.amEndWork}  {row.pmStartWork}-{row.pmEndWork}</span>
                            </div>
                            <div className="flex_row al_center" style={{padding:'10px 12px',borderBottom:'1px solid #f1f1f4'}}>
                            <img className="block"  src={phone} style={{width:'20px',marginLeft:'10px',marginRight:'10px'}} />
                                    <span className="flex_1">{row.edtPhone}</span>
                                    <span className="subject_btn" onClick={this.call.bind(this,row.edtPhone)}>拨打</span>
                            </div>
                            <div className="flex_row al_center" style={{padding:'15px 12px',borderBottom:'1px solid #f1f1f4'}}>
                            <img className="block"  src={address} style={{width:'18px',marginLeft:'10px',marginRight:'10px'}} />
                              <span className="flex_1">{row.provice}{row.city}{row.area}{row.address}</span> 
                              <span className="subject_btn" onClick={this.openMap.bind(this,row.lat,row.lon,row.clinicName)}>导航</span>
                            </div>
                            <div style={{paddingTop:'14px'}} className="flex_row">
                                    <div className="width_50">
                                            <div className="subject_big_btn" style={{width:'90%',background:'#3592b3',marginLeft:'5%'}} onClick={this.goSingle.bind(this,row.clinicId)}>诊所主页</div>
                                    </div>
                                    <div className="width_50">
                                            <div className="subject_big_btn" style={{width:'90%',background:'#356bb3',marginLeft:'5%'}} onClick={this.bindOrYuyue.bind(this,row.clinicId)}>立即预约</div>
                                    </div>
                            </div>
                        </div>
                </div>
        </div>
    </div>
    )
  }




  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    
    return (<div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={150}
        renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '无更多数据'}
        </div>)}
         renderRow={
          this._renderRow.bind(this)
        }
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    </div>);
  }
}





class App extends React.Component {
    constructor(props) {
      super(props);
      document.title="门诊案例"
      const param=GetRequest(this.props.location.search)
      this.state = {
        disabled: false,
        match: this.props.match.path,
        history: this.props.history
      }
      if(param.settingCode&&param.openId){
        window.localStorage.setItem('paramInfo',JSON.stringify(param))
      }
      }
      render() {
        return (
          <div>
              <Demo history={this.props.history} location={this.props.location} />
          </div>);
      }
  
  
}





export default App













