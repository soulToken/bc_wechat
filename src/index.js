import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './clinicType.css'
import RouterMap from './router/routerMap';
//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { count, addGun, removeGun } from './redux/index'
import registerServiceWorker from './registerServiceWorker';
import {getClinicConfig} from './api/api';
import {GetRequest} from './util/index'
// import {withRouter } from 'react-router-dom' ;
const store = createStore(count)
// import createHistory from 'history/createBrowserHistory';
// const history=createHistory();
console.log(store.getState())
function render() {
    var self=this;
    var a=window.location.hash.split('?')[1]
   if(a){
    const param=GetRequest("?"+a);
    window.history.replaceState({},0,window.location.href.split('?')[0])
    if(param.settingCode&&param.openId){
        window.localStorage.setItem('paramInfo',JSON.stringify(param))
      }
      //新增判断是否显示的子诊所
      if(param.sonSettingCode){
          window.sessionStorage.setItem('sonSettingCode',param.sonSettingCode)
      }
      if(param.comeFrom){
        window.sessionStorage.setItem('comeFrom',param.comeFrom);
      }else{
        window.sessionStorage.setItem('comeFrom',"")
      }
      if(!param.remove&&param.comeFrom){
          //清空 存储得选择得数据(如果是从小程序进来 则。。。)
            window.localStorage.removeItem('medicalMessage');
            window.localStorage.removeItem('nextParam');
      }
      
   }
      getClinicConfig().then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){
                  //存储类型
                   //存储诊所配置相关信息字段   04 开头代表盲人按摩类型
                   sessionStorage.setItem('clinicConfigInfo', JSON.stringify(obj.result));
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
                        }else if(obj.result.clinicShowType=='01003'){
                            document.getElementById('root').className="toothType3"
                        }
                        else if(obj.result.clinicShowType=='04001'){
                            document.getElementById('root').className="blind"
                        }
                        else{
                            sessionStorage.setItem("clinicShowType",'');
                            document.getElementById('root').className="otherType"
                        }
                        
                  }else{
                      //存储 门诊样式类型
                      sessionStorage.setItem("clinicShowType",'');
                      document.getElementById('root').className="otherType"
                }
                // sessionStorage.setItem("clinicShowType",'01003')
                // sessionStorage.setItem("clinicShowType","1")
                // document.getElementById('root').className="toothType3"
              }
              // 给元素添加好 外层类名  todo  加上判断
             
        
              ReactDOM.render(
                //配置路由   
                <Provider store={store}>
                    {/* <withRouter> */}
                    <RouterMap store={store} addGun={addGun} removeGun={removeGun} />
                    {/* </withRouter> */}
                </Provider>
                , document.getElementById('root'));
          })
      }
      }).catch(function(){
        ReactDOM.render(
            //配置路由   
            <Provider store={store}>
                {/* <withRouter> */}
                <RouterMap store={store} addGun={addGun} removeGun={removeGun} />
                {/* </withRouter> */}
            </Provider>
            , document.getElementById('root'));
      })
   
}
render()
store.subscribe(function () {
    const state = store.getState();
    console.log("redux改变了")
})
registerServiceWorker();
