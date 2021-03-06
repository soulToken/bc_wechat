
//获取url 参数的字段
export const  GetRequest=function(url) {  
    //获取url中"?"符后的字串
     var theRequest = new Object();  
     if (url.indexOf("?") != -1) {  
        var str = url.substr(1);  
        var strs = str.split("&");  
        for(var i = 0; i < strs.length; i ++) {  
           theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
        }  
     }  
     return theRequest;  
  } 

const dateArr=["星期日","星期一","星期二",'星期三','星期四','星期五','星期六']
//获取最近一周的时间
export const getDateArr=function(dayNum,s){
    var oDate = new Date(s);   //获取当前时间  
   var dayArr=[]
    // var dayArr = [
    //     {
    //         valye:dateArr[oDate.getDay()],
    //         label:(oDate.getMonth()+1)+'-'+oDate.getDate(),
    //         time:new Date()
    //     }
    // ];     //定义一个数组存储所以时间
     for(var i=0;i<dayNum;i++){
        var date=new Date(oDate.getTime() + i*24*60*60*1000)


        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        dayArr.push( {
            valye:dateArr[date.getDay()],
            label:(date.getMonth()+1)+'-'+date.getDate(),
            time:currentdate
        });   //把未来几天的时间放到数组里
    }
    return dayArr;
}

//时间戳转化为日期
export const getDate=function(timeData,style) {   //timeData 为时间戳  style为年月日中间拼接的样式
    var time = new Date(timeData);
    var time = time.toLocaleDateString().replace(/\d+/g,function (a,b) {
      if(a.length == 1){
        var a =  '0'+a
      }
      return a
    });
    return time.replace(/\//g,style||'-')
  };

export const getDay=function(s){
    var data=new Date(s).getDay()
        return dateArr[data]
}


export const debounce=function(func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }


