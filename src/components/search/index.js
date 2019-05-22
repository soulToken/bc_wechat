import React from 'react';
import ReactDOM from 'react-dom'
import './index.scss'
import {chainClinicSearch,getSignature4Js,getClinicConfig} from '../../api/api'
import {Toast} from 'antd-mobile'
import { Route } from "react-router-dom";
import {GetRequest,debounce} from '../../util/index'
import { PullToRefresh, ListView, Button ,SearchBar,SegmentedControl} from 'antd-mobile';
import banner from '../../static/images/subject/index/banner@3x.png'
import hospital from '../../static/images/subject/index/hospital.png'
import './index.scss'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    window.sessionStorage.removeItem('sonSettingCode')
    var obj=JSON.parse(window.sessionStorage.getItem('searchObj'));
    var inputValue=""
    if(obj&&obj.inputValue){
        inputValue=obj.inputValue
    }
    var currentIndex=0
    if(obj&&obj.currentIndex){
        currentIndex=obj.currentIndex
    }
    this.state = {
      dataSource,
      timer:null,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      data:[],
      inputValue:inputValue,
      top:0,
      currentIndex:currentIndex,
      scrollHeight:0,
        style:{
            position:'fixed',
            top:'0',
            zIndex:'4',
            width:'100%',
            background:'#f5f5f9'
        }
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
    // const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.getList()
    // setTimeout(() => {
    //   this.rData = genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(genData()),
    //     height: hei,
    //     refreshing: false,
    //     isLoading: false,
    //   });
    // }, 1500);
    this.setState({
        scrollHeight:ReactDOM.findDOMNode(this.scroll).scrollHeight
    })
    console.log(ReactDOM.findDOMNode(this.scroll).scrollHeight)
    this.handleClick()
  }
  getList=(pos=0,count=5,fresh)=>{
    var self=this;
    var  hei=this.state.height
    this.setState({
        isLoading: true,
    })
    console.log(ReactDOM.findDOMNode(this.lv).offsetTop)
    if(ReactDOM.findDOMNode(this.lv)){
      var hei = this.state.height - this.state.scrollHeight;
    }
    
    if(!this.state.inputValue.trim()){
        this.setState({
            dataSource: self.state.dataSource.cloneWithRows([]),
            isLoading:false
        })
        return
    }
    var param="position="+pos+"&count="+count+'&keyWord='+this.state.inputValue+'&searchType='+(parseInt(this.state.currentIndex)+1)
    chainClinicSearch(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                
                if(fresh){
                        var newData=obj.result||[];
                }else{
                    var newData=self.state.data.concat(obj.result||[]);
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
  getClick=(id)=>{
        this.props.history.push('/activity/'+id)
  }
  //打电话 
  call(mobile){
    if (!mobile) {
        Toast.info('暂无联系方式 !!!', 1);
        return
    }
    window.location.href = 'tel://' + mobile;
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
  inputChange= (value) => {
    var self=this;
    //搜索框延迟执行请求
    console.log(window.t)
    this.setState({ inputValue: value})
    if(window.t){
        clearTimeout(window.t)
    }
    window.t = setTimeout(()=>{
        // this.setState({ inputValue: value}, function(){
            self.getList(0,5,1)
        // })
    }, 500);
  };
  onCancel=()=>{
    this.setState({ inputValue: '' },()=>{
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
          }) 
        this.getList(0,5,1)
    });
    // this.clear()
  }
  clear = () => {
    this.setState({ inputValue: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  //跳转到医生详情页面
  handleClick2(e,id){
    if(id){
         window.sessionStorage.setItem('sonSettingCode',"wxc_"+id)
    }
    document.getElementById('root').className="otherType"
    var obj={
        inputValue:this.state.inputValue,
        currentIndex:this.state.currentIndex
    }
    window.sessionStorage.setItem('searchObj',JSON.stringify(obj))
    this.props.history.push(`/doctorTeam/${e}`)
  }
  gotoDetail = (id,name,clinicId) => {
    // sessionStorage.setItem("clisName", name)
    // sessionStorage.setItem("serverId", id)
    if(clinicId){
        window.sessionStorage.setItem('sonSettingCode',"wxc_"+clinicId)
    }
    var obj={
        inputValue:this.state.inputValue,
        currentIndex:this.state.currentIndex
    }
    window.sessionStorage.setItem('searchObj',JSON.stringify(obj))
    this.props.history.push('/serviceItems/' + id)
  }
  openMap = (e,lat,lon,name) => {
    var self = this;
    e.stopPropagation();
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
    //存储 搜索相关信息
    var obj={
        inputValue:this.state.inputValue,
        currentIndex:this.state.currentIndex
    }
    window.sessionStorage.setItem('searchObj',JSON.stringify(obj))



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



  _renderRow(val, sectionId, index) {
      var component;
      if(this.state.currentIndex==0){
            component=(
                <div style={{padding:'0 10px'}}>
                    <div className="flex_column search_service_box" style={{marginBottom:'20px'}} onClick={this.gotoDetail.bind(this,val.id,val.clisName,val.clinicId)}>
                            <div style={{height:'200px',background:'url('+val.clisPic+') no-repeat center',backgroundSize:'cover'}}></div>
                            <div style={{padding:'16px 0',fontSize:'14px',textAlign:'center',background:"#fff"}}>{val.clisName}</div>
                    </div>
                </div>
            )
      }else if(this.state.currentIndex==2){
          component=(
            <div style={{padding:'0 10px'}}>
                <div className="subject_clinic_container flex_row" style={{marginBottom:'10px'}} onClick={this.goSingle.bind(this,val.clinicId)} >
                    <div style={{width:'80px',marginRight:'20px'}}>
                            <img src={hospital} className="width_100 block" style={{height:'100%'}}   />
                    </div>
                    <div className="flex_1 flex_column" style={{height:'100%',paddingTop:'15px',paddingBottom:'15px',lineHeight:'18px',paddingRight:'22px'}}>
                        <div className="flex_row just_content_sb">
                                        <span className="flex_row">
                                            <span style={{whiteSpace:'nowrap'}}>名称：</span> 
                                            <span>{val.clinicName}</span>    
                                        </span>
                                        <div className="subject_address_box flex_row al_center" onClick={(e)=>this.openMap(e,val.lat,val.lon,val.clinicName)}>导航</div>
                                </div>
                                <span>电话：{val.edtPhone}</span>
                                <span className="flex_row">
                                    <span style={{whiteSpace:'nowrap'}}>地址：</span> 
                                    <span>
                                    {val.provice||''} {val.city||""} {val.area||''} {val.address||''}
                                    </span>
                                </span>                               
                        </div>
                    </div>
            </div>
          )
      }else{
        component=(
            <div style={{padding:'0 10px'}}>
                        <div className="flex_row" key={index} style={{marginBottom:'20px'}}>
                        <div style={{width:'145px',marginRight:'18px',position:'relative'}} onClick={this.handleClick2.bind(this,val.doctorId,val.clinicId)}>
                                <img src={val.headUrl} style={{width:'145px'}} />
                                <div className="type3_watch_detail" style={{background:"#356bb3"}}>查看详情</div>
                        </div>
                        <div className="flex_1 flex_column">
                                <span className="type3_doctor_name">{val.doctorName}</span>
                                <span className="type3_doctor_type" style={{color:"#356BB3"}}>{val.positio}</span>
                                <span className="type3_doctor_intro" style={{WebkitBoxOrient:"vertical"}}>
                                        {val.selfDescription}
                                </span>
                                <div className="flex_row" style={{marginTop:'10px'}}>
                                    <div className="width_45 type3_zixun_btn"  onClick={this.call.bind(this,val.mobile)}  style={{marginRight:'10%',background:"#3592B3"}}>咨询</div>
                                    <div className="width_45 type3_yuyue_btn" style={{background:'#356bb3'}} onClick={this.bindOrYuyue.bind(this,val.doctorId,val.doctorName)}>预约</div>
                                </div>
                        </div>
                    </div>
            </div>
        )
      }
     
    return (
        <div>
            {component}
        </div>

    )
  }
  scrolling(e){
    //   console.log(e,document.documentElement.scrollTop)
    // console.log(ReactDOM.findDOMNode(this.scroll).scrollHeight)
    var top=document.documentElement.scrollTop||document.body.scrollTop
    // console.log(top)
    var height=ReactDOM.findDOMNode(this.scroll).scrollHeight-top<=0?0:ReactDOM.findDOMNode(this.scroll).scrollHeight-top
    // if(top>ReactDOM.findDOMNode(this.scroll).scrollHeight){
    //         console.log("大于")
        this.setState({
            shouldShow:true,
            top:height,
            style:{
                position:'fixed',
                top:'0',
                zIndex:'4',
                width:'100%',
                background:'#f5f5f9'
            }
        })
    // }else{
    //         this.setState({
    //             style:{}
    //         })
    // }
    
   
  }
  onChange(e){
      //自动化去焦点
    //   this.handleClick()
      this.setState({
          currentIndex:e.nativeEvent.selectedSegmentIndex
      },()=>{
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
          }) 
        this.getList(0,5,1)
      })
      
  }
  onValueChange(){

  }
  scrollHeader(){
      return (
          <div> 
              
                
                    {/* <div ref={ref => this.scroll = ref} style={{height:this.state.top}}></div> */}
             
                    <div ref={ref => this.scroll = ref}  style={this.state.style}>
                    <SearchBar
                        placeholder="输入搜索内容"
                        onChange={this.inputChange.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        onClear={this.clear.bind(this)}
                        value={this.state.inputValue}
                        ref={ref => this.manualFocusInst = ref}
                    />
                    <div style={{padding:'20px 10px'}}>
                    <SegmentedControl
                        tintColor={'#356bb3'}
                        values={['项目', '医生', '诊所']}
                        selectedIndex={this.state.currentIndex}
                        onChange={this.onChange.bind(this)}
                        onValueChange={this.onValueChange.bind(this)}
                        />
                        </div>
                    </div>
           
               
          </div>
      )
  }


  render() {
   
 
    return (
      <div>
          <div  style={{height:this.state.scrollHeight}}>
                {this.scrollHeader()}
          </div>
        
      <ListView
        className="noHeadPadding"
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={50}
        // renderHeader={this.scrollHeader.bind(this)}
        renderFooter={() => (<div style={{ padding:10, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '无更多数据'}
        </div>)}
         renderRow={
          this._renderRow.bind(this)
        }
        // renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        // onScroll={this.scrolling.bind(this)}
        // pullToRefresh={<PullToRefresh
        //   refreshing={this.state.refreshing}
        //   onRefresh={this.onRefresh}
        // />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
     
    </div>);
  }
}





class App extends React.Component {
    constructor(props) {
      super(props);
      document.title="搜索"
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
              <Demo  history={this.props.history}/>
          </div>);
      }
  
  
}





export default App













