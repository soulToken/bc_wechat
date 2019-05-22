
import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, WhiteSpace,SegmentedControl ,List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import TabBarExample from '../tooBar/tooBar'
import { PullToRefresh, Button ,Modal,Toast} from 'antd-mobile';
import url from '../../static/svg/make_an_appointment_hospital.svg'
import {queryAppointmentList} from '../../api/api'
import './index.css'
import { Item } from '../../../node_modules/antd-mobile/lib/tab-bar';
import goSubject from '../../static/images/common/goSubject.png'
import {modifyAppointmentStatus} from '../../api/api'
import img1 from '../../static/svg/weidao.svg'
import img2 from '../../static/svg/cancle.svg'
import img3 from '../../static/svg/jiuzhen.svg'
import nodata from '../../static/svg/no_data.svg'
import hospital from '../../static/svg/make_an_appointment_hospital.svg'
import hospital1 from '../../static/images/make_appointment.png'
import success from '../../static/svg/online_booking_time_fail.svg'
import {getDay} from '../../util/index'
const alert = Modal.alert;
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '待服务' },
  { title: '历史预约' },
];




function genData() {
  const dataArr = [];
  for (let i = 0; i < 30; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Fresher extends React.Component {
  constructor(props) {
    super(props);
    var clinicShowType=sessionStorage.getItem("clinicShowType")
    var sonSettingCode=window.sessionStorage.getItem('sonSettingCode');
    var showTabBar=true;
    if(sonSettingCode){
        showTabBar=false
    }
    this.state = {
      refreshing: true,
      down: false,
      height: showTabBar?document.documentElement.clientHeight-94:document.documentElement.clientHeight-44,
      data: [],
      clinicShowType:clinicShowType,
      show:false,
      queryAppointmentList:queryAppointmentList,
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    this.getList()
  }
  getList=(pos=0,count=5,status=0)=>{
    var self=this;
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    var param="position="+pos+"&count="+count+"&appointmentStatus="+status
    // const hei = this.state.height-94;
    this.state.queryAppointmentList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                Toast.hide()
                var newData=self.state.data.concat(obj.result);
                self.setState({
                  data:newData,
                  // height: hei
                  refreshing:false,
                  show:true
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
  canCel=()=>{
    alert('确定要取消预约？', '', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => console.log('ok') },
    ])
  }
  getNewList=()=>{
    this.setState({ refreshing: true });
    this.getList(this.state.data.length,5,0)
  }
  goDetail=(item)=>{
    window.sessionStorage.setItem('appointmentMessage',JSON.stringify(item))
    this.props.history.push('/appointmentDetail')
 }
  render() {
    return (
      <div>
     
      <PullToRefresh
        id="fresh"
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
          // WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={this.getNewList.bind(this)}
      >

      <div style={{paddingLeft:'12px',paddingRight:'12px'}}>

           {this.state.data.length>0 ? (
             <div>
        {this.state.data.map((item,index) => (
                
          <div key={index}  className="order_box">
                <div className="order_detail">
                    <div className="order_detail_top">
                    {!this.state.clinicShowType &&
                             <img src={hospital} className="order_detail_bottom_left" />}
                        {this.state.clinicShowType==1 &&
                                <img src={hospital1} className="order_detail_bottom_left" />}
                          <div className="order_detail_top_left">
                            {item.clinicName}
                          </div>
                          <div className="order_detail_top_left_second">
                            {item.classifyStr}
                          </div>
                    </div>
                    <div className="order_detail_bottom" >
                              
                                <div className="order_detail_bottom_right">
                                   <div>就 诊 人：{item.appointmentName}</div>
                                      <div>预约时间：{item.appointmentDate} {getDay(item.appointmentDate)} {item.appointmentTime}</div>
                                      <div>预约项目：{item.appointmentServeritem?item.appointmentServeritem:'默认项目'}</div>
                                      {item.symptomSelect  &&
                                      <div>症   状：{item.symptomSelect}</div>
                                      }
                                      {item.symptomSelect  &&
                                        <div>病情描述：{item.symptomDesc}</div>
                                      }
                                      {item.paymentAmount  &&
                                        <div>支付费用：{item.paymentAmount}元</div>
                                      } 
                                      {item.paymentId  &&
                                        <div>支付单号：{item.paymentId}</div>
                                      } 
                                       <div className="text_right"  style={{position:'relative',zIndex:10}}><span  onClick={this.goDetail.bind(this,item)}>详情>></span></div>
                                </div>
                    </div>
                    {item.appointmentStatus == 3 &&
                          <img src={img1} style={{position:'absolute',right:'0px',top:'0'}} />
                     }
                      {item.appointmentStatus == 4 &&
                          <img src={img2} style={{position:'absolute',right:'0px',top:'0'}} />
                     }
                      {item.appointmentStatus == 5 &&
                          <img src={img3} style={{position:'absolute',right:'0px',top:'0'}} />
                     }
                  
                </div>
          </div>
        ))}
        </div>
      ) : (
        <div>
             {this.state.show  &&
                <div  style={{textAlign:'center',marginTop:'50px'}}> 
                    <img src={nodata} />
                    <p>暂无数据</p>
                </div>
             }
        </div>
       

       
      )}  
      </div>

      </PullToRefresh>
    </div>);
  }
}



class Fresher2 extends React.Component {
  constructor(props) {
    super(props);
    var clinicShowType=sessionStorage.getItem("clinicShowType")
    var sonSettingCode=window.sessionStorage.getItem('sonSettingCode');
    var showTabBar=true;
    if(sonSettingCode){
        showTabBar=false
    }
    this.state = {
      refreshing: true,
      down: false,
      clinicShowType:clinicShowType,
      height: showTabBar?document.documentElement.clientHeight-94:document.documentElement.clientHeight-44,
      data: [],
      show:false,
      modal2:false,
      id:null,
      queryAppointmentList:queryAppointmentList,
      modifyAppointmentStatus:modifyAppointmentStatus
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    this.getList()
  }
  changeStatus=(id)=>{
    var self=this;
    var param="id="+id+"&appointmentStatus="+4
    this.state.modifyAppointmentStatus(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.info('取消预约成功!!!', 1);
              self.getList(0,5,1,1)
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
  getList=(pos=0,count=5,status=1,fresh)=>{
    var self=this;
    
   
    var param="position="+pos+"&count="+count+"&appointmentStatus="+status
    // const hei = this.state.height-94;
    this.state.queryAppointmentList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
              if(fresh){
                var newData=obj.result
              }else{
                var newData=self.state.data.concat(obj.result);
              } 
                self.setState({
                  data:newData,
                  // height: hei
                  refreshing:false,
                  show:true
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
  getNewList=()=>{
    this.setState({ refreshing: true });
    this.getList(this.state.data.length,5,1)
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
    window.sessionStorage.setItem('appointmentMessage',JSON.stringify(item))
    this.props.history.push('/appointmentDetail')
 }
  render() {
    return (
      <div>
     
      <PullToRefresh
        id="fresh"
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
          // WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={this.getNewList.bind(this)}
      >

      <div style={{paddingLeft:'12px',paddingRight:'12px'}}>

           {this.state.data.length>0 ? (
             <div>
       {this.state.data.map((item,index) => (
                
          <div key={index}  className="order_box">
                <div className="order_detail">
                    <div className="order_detail_top">
                        {!this.state.clinicShowType &&
                             <img src={hospital} className="order_detail_bottom_left" />}
                        {this.state.clinicShowType==1 &&
                                <img src={hospital1} className="order_detail_bottom_left" />}
                          <div className="order_detail_top_left">
                            {item.clinicName}
                          </div>
                          <div className="order_detail_top_left_second">
                            {item.classifyStr}
                          </div>
                         
                    </div>
                    <div className="order_detail_bottom" >
                               
                                <div className="order_detail_bottom_right">

                                      <div>就 诊 人：{item.appointmentName}</div>
                                      <div>预约时间：{item.appointmentDate} {getDay(item.appointmentDate)} {item.appointmentTime}</div>
                                      <div>预约项目：{item.appointmentServeritem?item.appointmentServeritem:'默认项目'}</div>
                                      {item.symptomSelect  &&
                                      <div>症   状：{item.symptomSelect}</div>
                                      }
                                      {item.symptomSelect  &&
                                        <div>病情描述：{item.symptomDesc}</div>
                                      }
                                      {item.paymentAmount  &&
                                        <div>支付费用：{item.paymentAmount}</div>
                                      }
                                      {item.paymentId  &&
                                        <div>支付单号：{item.paymentId}</div>
                                      }
                                      <div className="text_right"><span  onClick={this.goDetail.bind(this,item)}>详情>></span></div>
                                </div>
                                <div className="order_detail_top_right" onClick={this.canCel.bind(this,item.id,item.paymentAmount,item.paymentId)}>取消预约</div>   
                    </div>
                </div>
          </div>
        ))}
        </div>
      ) : (
        <div>
             {this.state.show  &&
                <div  style={{textAlign:'center',marginTop:'50px'}}> 
                      <img src={nodata} />
                      <p>暂无数据</p>
                </div>
             }
        </div>
       

       
      )}   
      </div>

      </PullToRefresh>

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





    </div>);
  }
}









class TabExample extends React.Component {
  constructor(props) {
    super(props);

    var sonSettingCode=window.sessionStorage.getItem('sonSettingCode');
    var showTabBar=true;
    if(sonSettingCode){
        showTabBar=false
    }
    this.state = {
      index:0,
      showTabBar:showTabBar
    };
    document.title="个人预约"
  }

  onChange = (e) => {
    this.setState({
      index:e.nativeEvent.selectedSegmentIndex
    })
  }
gotoSubject=()=>{
    var comeFrom=window.sessionStorage.getItem('comeFrom');
    console.log("页面来源"+comeFrom)
    if(comeFrom){
        //判断如果来源是小程序 则跳转到主程序界面;
        window.wx.miniProgram.switchTab({url: '/pages/subject/home'})
        return 
    }
    this.props.history.replace('/subject')
 }

  render(){
    return(
      <div>
      <div style={{ position: 'absolute', width: '100%', bottom: this.state.showTabBar?'50px':'0px', top: '0', zIndex: '10', overflow: 'auto',background:'#f5f5f5',WebkitOverflowScrolling:'touch' }}>
        <WhiteSpace />

          <SegmentedControl
          className = 'order_detail_top_segment'
          values={['待服务', '历史预约']}
          onChange={this.onChange}
          onValueChange={this.onValueChange}>
       
          </SegmentedControl>
          <div > 
            {this.state.index == 0 &&
            <Fresher2  history={this.props.history}></Fresher2>
            }
          </div>
          <div >
            {this.state.index == 1 &&
             <Fresher history={this.props.history}></Fresher>
            }
          </div>
        <WhiteSpace />
      </div>
      {
          !this.state.showTabBar &&
          <img src={goSubject} onClick={this.gotoSubject.bind(this)} style={{position:'fixed',right:'0',bottom:"50px",width:'50px',zIndex:'10'}} />
      }

      {
          this.state.showTabBar &&
          <TabBarExample></TabBarExample>
      }
     
    </div>
    )
  }
}
export default TabExample