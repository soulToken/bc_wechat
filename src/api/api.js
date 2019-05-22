
const base="/api"
//生产环境
//后台ip地址  http://192.168.0.101:84
// const base="http://192.168.0.25:84"
// const base="http://192.168.0.25:8080"
// const base="https://clinic.100care.cn"
//  const base="https://sit.100care.cn"
// react 封装请求方法
//1.诊所介绍
export const getClinicBaseinfo = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000"
    // }
    
     obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicBaseinfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//2.医生信息列表
export const getClinicDoctorList = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicDoctorList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//3.医生详情
export const getClinicDoctorDetail = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    } 
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicDoctorDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//4.服务列表
export const getClinicServerIteamList = (param="",obj={}) => {
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicServerIteamList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//5.服务详情
export const getClinicServerIteamDetail = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicServerIteamDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//子服务项目详情   /100care-wechat/clinicController/wechat/getSubServerIteamDetail
export const getSubServerIteamDetail = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getSubServerIteamDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//6.用户详情
export const getUserBaseinfo = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/getUserBaseinfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//7.修改用户信息
export const modifyUserInfo = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/modifyUserInfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//8 获取验证码接口
export const getVerifyCode = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/getVerifyCode',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//9 提交接口
export const verifyMobile = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/verifyMobile',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//10 查询每天可预约的时间段
export const getClinicAppointmentTimes = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicAppointmentTimes',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//11 预约按钮
export const subscriberAppointmentInfo = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/subscriberAppointmentInfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//12 wifi接口
export const getClinicWIFI = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/wechatOfficialController/getClinicWIFI',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//13 活动列表
export const getClinicActivityList = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicActivityList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//14 活动详情
export const getClinicActivityDetail = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicActivityDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//15 就诊列表
export const queryAppointmentList = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/queryAppointmentList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//16 取消预约
export const modifyAppointmentStatus = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/modifyAppointmentStatus',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//17 轮播图
export const getClinicBanner = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    } 
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicBanner',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//18 与微信授权
export const getSignature4Js = (param="",obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    } 
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/wechatOfficialController/getSignature4Js',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
// 19 上传头像
export const uploadPicture = (param,obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/commonController/wechat/uploadimage ',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
// 20 查询诊所配置信息
export const getClinicConfig = (param,obj={}) => {
    // obj={
    //     "settingCode":"wxc_100000",
    //     "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    // }
    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicConfig',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//查询当前用户的亲属信息集合 不包括本人
export const  getRelativesList = (param,obj={}) => {

    obj=JSON.parse(window.localStorage.getItem("paramInfo")) 
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers=Object.assign( {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/officialRelativesController/getRelativesList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//查询当前用户的亲属信息集合 包括本人
export const  getAllMembers = (param,obj={}) => {

    obj=JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    } 
    var headers=Object.assign( {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/officialRelativesController/getAllMembers',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//新增微信服务号用户的亲属信息
export const  addRelatives = (param,obj={}) =>{

  obj=JSON.parse(window.localStorage.getItem("paramInfo"))
  var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
  if(sonSettingCode){
      obj=Object.assign(obj,{
          settingCode:sonSettingCode
      })
  }
  var headers = Object.assign({
      "Content-Type" : "application/x-www-form-urlencoded",
  },obj)
  var a = fetch(base+'/100care-wechat/officialRelativesController/addRelatives',
  {
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
  })
  return a

}


//删除微信服务号用户的亲属信息。
export const  deleteRelatives = (param,obj={})=>{

    obj=JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)

    var a = fetch(base+"/100care-wechat/officialRelativesController/deleteRelatives",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a

}


export const editRelatives = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/officialRelativesController/editRelatives",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//诊所案例  /100care-wechat/clinicCaseController/getCaseList

export const getCaseList = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/clinicCaseController/getCaseList",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//诊所案例详情   /100care-wechat/clinicCaseController/getCaseDetail
export const getCaseDetail = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/clinicCaseController/getCaseDetail",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//商品列表
export const getClinicGoodsList = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/clinicController/wechat/getClinicGoodsList",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//商品详情  clinicController//wechat/getClinicGoodsDetail 
export const getClinicGoodsDetail = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/clinicController/wechat/getClinicGoodsDetail",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//在线提交   userController/intentional
export const intentional = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userController/intentional",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
// 医生绑定 推送    /100care-wechat/wechatOfficialController/bindDoctorOpenId
export const bindDoctorOpenId = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/wechatOfficialController/bindDoctorOpenId",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//获取优惠券 /couponController/getValidCouponInfo
export const getValidCouponInfo = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/couponController/getValidCouponInfo",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
// 领取优惠券  couponController/receiveCoupon
export const receiveCoupon = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/couponController/receiveCoupon",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
// 优惠券列表   couponController/getUserCouponList
export const getUserCouponList = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/couponController/getUserCouponList",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
// 查询 周围诊所列表 /chainClinicController/wechat/getchainClinicList
export const getchainClinicList = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/chainClinicController/wechat/getchainClinicList",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//文章浏览接口   /100care-wechat/wechatOfficialController/getMaterial
export const getMaterial = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/wechatOfficialController/getMaterial",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//查找相关 chainClinicController/wechat/chainClinicSearch
export const chainClinicSearch = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/chainClinicController/wechat/chainClinicSearch",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//查询主体预约记录   /chainClinicController/wechat/getchainClinicAppointment
export const getchainClinicAppointment = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/chainClinicController/wechat/getchainClinicAppointment",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//症状配置接口     clinicController/wechat/getSymptomConfig
export const getSymptomConfig = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/clinicController/wechat/getSymptomConfig",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}

//医生查看的预约列表    http://192.168.0.159:84/100care-wechat/doctorController/getAppointmentList
export const getAppointmentList = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/doctorController/getAppointmentList",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}

//预约状态修改  /100care-wechat/doctorController/getAppointmentList
export const updateAppointmentStatus = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/doctorController/updateAppointmentStatus",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//获取可用优惠券  userController/queryCanuseCoupon
export const queryCanuseCoupon = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userController/queryCanuseCoupon",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}

//用户签到    
export const userSignIn = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userMemberCardController/userSignIn",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}

//查询用户卡片信息   /100care-wechat/userMemberCardController/getUserSignInInfo

export const getUserSignInInfo = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userMemberCardController/getUserSignInInfo",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}

//查询用户权益   /100care-wechat/userMemberCardController/getUserMemberBenefits
export const getUserMemberBenefits = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userMemberCardController/getUserMemberBenefits",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//查询用户是否存在卡片    /100care-wechat/userMemberCardController/checkIsHaveMemberCard
export const checkIsHaveMemberCard = (param,obj={})=>{

    obj = JSON.parse(window.localStorage.getItem("paramInfo"))
    var sonSettingCode= window.sessionStorage.getItem('sonSettingCode')
    if(sonSettingCode){
        obj=Object.assign(obj,{
            settingCode:sonSettingCode
        })
    }
    var headers = Object.assign({
        "Content-Type" : "application/x-www-form-urlencoded",
    },obj)
    var a = fetch(base+"/100care-wechat/userMemberCardController/checkIsHaveMemberCard",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body:param
    })
    return a
}
//获取跳转链接     /100care-wechat/userMemberCardController/getActiveMemberCardUrl

export const getActiveMemberCardUrl = (id)=>{

    var a = fetch(base+"/100care-wechat/userMemberCardController/getActiveMemberCardUrl?cardId="+id,{
        method:"POST",
        mode:"cors"
    })
    return a
}
