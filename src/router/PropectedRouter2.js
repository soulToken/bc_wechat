
// //当通过函数来定义组建的时候参数是属性对象  函数声明 简单，类声明 
// 复杂  当组建需要状态时 推荐用类声明
// //props ={
//     path:"/my",
//     conponent:MY
// }
import React from 'react'
import {Route ,Redirect } from 'react-router-dom';
import {GetRequest} from '../util/index'
import {getUserBaseinfo,getSignature4Js} from '../api/api'
import {Toast} from 'antd-mobile'
// export default function({component:Component,...rest}){
//     return <Route {...rest} render={(props)=>
//             localStorage.getItem('login')?<Component/>:
//             <Redirect to={{
//                 pathname:"/",
//                 state:{from:props.location.pathname}
//             }}></Redirect>
//     }></Route>
// }


class App extends React.Component {
    constructor(props) {
        super(props);
        //在这里 做判断 如果 路径后面有参数  则  去请求 个人信息用户接口 并且 全局保存  门诊id 跟 openid
        const param=GetRequest(this.props.location.search)
        this.state={
            param:param,
            getUserBaseinfo:getUserBaseinfo,
            getSignature4Js:getSignature4Js,
            show:false
        }
        if(this.state.param.settingCode&&this.state.param.openId){
            window.localStorage.setItem('paramInfo',JSON.stringify(this.state.param))
        }
        window.history.replaceState({},0,window.location.href.split('?')[0])
        this.getDetail()
     
    }  
       
    componentDidMount(){
        // this.getDetail()
        this.getWechat()
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
    getDetail=()=>{
        var self=this;
        var param=""
        Toast.loading('Loading...', 0, () => {
          console.log('Load complete !!!');
        });
        this.state.getUserBaseinfo().then(function(res){
          if (res.ok) {
            res.json().then((obj)=> {
                if(obj.resultCode==="1000"){ 
                    window.localStorage.setItem("loginInfo",JSON.stringify(obj.result))
                  Toast.hide()
                  self.setState({
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

        render() {
                return (
                    <div>

                        
                         {this.state.show&&
      
      
                       <Route 
                       render={(props)=>
                                    localStorage.getItem('loginInfo')&&JSON.parse(localStorage.getItem('loginInfo'))&&JSON.parse(localStorage.getItem('loginInfo')).mobile?<this.props.component prop={props}/>:
                                    <Redirect to={{
                                        pathname:"/bind",
                                        state:{from:this.props.location.pathname},
                                        goot:'1'
                                    }}></Redirect>
                            }   ></Route>
                        }
                    </div>
                )
        }
           
        
    }
    export default App