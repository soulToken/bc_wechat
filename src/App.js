import React, { Component } from 'react';
// import logo from './logo.svg';
import * as apis from './api/api';
import { HashRouter as Router, Route, Link, Switch ,Redirect} from "react-router-dom";
import PropectedRouter from './router/PropectedRouter';
import PropectedRouter2 from './router/PropectedRouter2';
import { addGun } from './redux'
import Login from './components/login'
import Nofound from './components/errorPages/nofound'
import Error from './components/errorPages/error/index'
import TabBarExample from './components/tooBar/tooBar'
import Home from './components/home/index'
import About from './components/myAppointment/index'
import My from './components/my/index'
import Detail from './components/detail/index';
import OnlineBook from './components/onlineBook/index'
import ClinicIntroduce from './components/clinicIntroduce/index'
import ServiceItems from './components/serviceItems/index'
import DoctorTeam from './components/doctorTeam/index'
import GoodsList from './components/goodsList/index'
import Activity from './components/activity/index'
import CouponDetail from './components/couponDetail/index'
import Case from './components/case/index'
import Preservation from './components/preservation/index'
import Medical from './components/medical/index'
import MycouponList from './components/mycouponList/index'
import addMember from './components/addMember/index'
import memberInfo from './components/memberInfo/index'
import memberList from './components/memberList/index'
import developed from './components/developed/index'
import Equity from './components/equity/index'
import PersonMessage from './components/personMessage/index'

import Bind from './components/bind/index'
import AppointmentDetail from './components/appointmentDetail/index'
import {getSignature4Js,getClinicConfig} from './api/api'
import concatUs from './components/concatUs/index'
import Subject from './components/subject/index'
import Outpatient from './components/outpatient/index'
import Transfer from './components/transfer/index'
import Subrecord from './components/subrecord/index'
import Submy from './components/submy/index'
import {Toast} from "antd-mobile"
import DoctorBind from './components/doctorBind/index'
import {GetRequest} from './util/index'
import Coupon from './components/coupon/index'
import Search from './components/search/index'
import Department from './components/department/index'
import Article from './components/article/index'
import appointmentRecord from './components/appointmentRecord/index'
import './App.css'

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// );
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apis,
      getSignature4Js:getSignature4Js,
      showType:''
    };
   
  }
 
  componentWillMount(){
     //this.getClicicConfig()
  }
  componentDidMount(){
    // this.getClicicConfig()
    //  this.getWechat()
    
  }
  getClicicConfig=()=>{
      var self=this;
      getClinicConfig().then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){
                  //存储 门诊样式类型
                  sessionStorage.setItem('clinicConfigInfo', JSON.stringify(obj.result));
                   sessionStorage.setItem('isPayment', obj.result.isPayment);
                  if (obj.result&&obj.result.clinicShowType&&obj.result.clinicShowType!="0"){
                    //存储 门诊样式类型   todo 
                    sessionStorage.setItem("clinicShowType",obj.result.clinicShowType)
                    if(obj.result.clinicShowType==1){
                      self.setState({
                          showType:'ChineseMedicine'
                      })
                    }else if(obj.result.clinicShowType==2){
                        self.setState({
                            showType:'gynaecology'
                        })
                    }
                
                //todo 
                     
                   
                    
                  
              }else{
                  //存储 门诊样式类型
                  
                  //sessionStorage.setItem("clinicShowType",'');
                   
               
            }
               
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
  
  getWechat=()=>{
    var self=this;
    this.state.getSignature4Js().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              // console.log()
              if(obj.result){
                window.wx.config({
                  debug : false,
                  appId : obj.result.appId,
                  timestamp : obj.result.timestamp,
                  nonceStr : obj.result.noncestr,
                  signature : obj.result.signature,
                  jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
                          'onMenuShareAppMessage', 'getLocation', 'openLocation',
                          'hideOptionMenu' ]
              });
              window.wx.ready(function() {
                  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                  window.wx.checkJsApi({
                      jsApiList : [ 'getNetworkType', 'previewImage','openLocation','getLocation' ],
                      success : function(res) {
                          // 以键值对的形式返回，可用的api值true，不可用为false
                          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                      }
                  });
                  window.wx.hideOptionMenu();
                  window.wx.hideAllNonBaseMenuItem();
                  // 2. 分享接口
            
                })
                  window.wx.error(function(res){
                      // alert(res)
                  });
              }
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
  get() {
    this.props.store.dispatch(addGun())
    console.log(this.props.store.getState())
    this.state.apis.mock('account=""&token=""').then((res) => {
      console.log(res)
      if (res.ok) {
        res.text().then((data) => {
          console.log(data);
        })
      }
    }).catch((res) => {
      console.log(res.status);
    });
  }
  render() {
    const store = this.props.store
    return (
      <div className={`App ${this.state.showType}`} >
        <Router>
          {/* <div> ChineseMedicine */}
          <Switch>
            <PropectedRouter exact path="/" store={store} component={Transfer} />
            <Route exact  path="/single" store={store} component={Home} />
            <Route path="/appointment" component={About} />
            <Route path="/couponDetail" component={CouponDetail} />
            <Route path="/appointmentDetail" component={AppointmentDetail} />
            <Route path="/mycouponList" component={MycouponList} />
            <Route   path="/outpatient" store={store} component={Outpatient} />
            <Route   path="/subrecord" component={Subrecord} />
            {/* <Route path="/topics" component={Topics} /> */}
            {/* <Route path="/login" component={Login}></Route> */}
            <PropectedRouter path="/my" component={My} />
            <PropectedRouter path="/submy" component={Submy} />
            <Route path="/subject" component={Subject} ></Route>
            <Route path="/department" component={Department} ></Route>
            <Route path="/article" component={Article} ></Route>
            <Route path="/detail" component={Detail} ></Route>
            <Route path="/preservation/:id" component={Preservation} ></Route>
            <PropectedRouter  path="/onlineBook" component={OnlineBook} />
            <Route path="/medical" component={Medical} />
            <Route path="/clinicIntroduce" component={ClinicIntroduce} ></Route>
            <Route path="/serviceItems" component={ServiceItems} />
            <Route path="/doctorTeam" component={DoctorTeam} ></Route>
            <Route path="/goodsList" component={GoodsList} ></Route>
            <Route path="/appointmentRecord" component={appointmentRecord} ></Route>
            <Route path="/activity" component={Activity} />
            <Route path="/case" component={Case} />
            <Route path="/search" component={Search} />
            <Route path="/coupon" component={Coupon} />
            <Route path="/bind" component={Bind} ></Route>
            <Route path="/doctorBind" component={DoctorBind} ></Route>
            {/* <PropectedRouter path="/my" component={My}></PropectedRouter> */}
            <Route path="/addMember" component={addMember}></Route>
            <Route path="/memberInfo" component={memberInfo}></Route>
            <Route path="/memberList" component={memberList}></Route>
            <Route path="/developed" component={developed}></Route>
            <Route path="/concatUs" component={concatUs}></Route>
            <Route path="/equity" component={Equity}></Route>
            <Route path="/personMessage" component={PersonMessage}></Route>
            <Route path="/error" component={Error}></Route>
            <Route path="/__SOSO_RAW_URL___" render={()=><Redirect to="/"/>}/>
            <Route component={Nofound}></Route>
          </Switch>
          {/* <></> */}

          {/* </div> */}
        </Router>
      </div>
    );
  }
}
export default App;
