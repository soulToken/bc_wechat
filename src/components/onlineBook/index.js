
import React from 'react';
import { List, Switch, Calendar ,InputItem, WhiteSpace,Button ,Modal,WingBlank ,TextareaItem} from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { createForm } from 'rc-form';
import './index.css'
import success from '../../static/svg/online_booking_time_success.svg'
import fail from '../../static/svg/online_booking_time_fail.svg' 
import {getClinicAppointmentTimes,getClinicDoctorList,getClinicServerIteamList,subscriberAppointmentInfo,getUserBaseinfo,getSymptomConfig} from '../../api/api'
import {getDateArr} from '../../util/index'
import { Picker,Toast} from 'antd-mobile'
import TechnicalSupport from '../technicalSupport/index'


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class BasicInputExample extends React.Component {
   
    
    constructor(props) {
      super(props);
      document.title="预约"

      var chooseParam=JSON.parse(localStorage.getItem("medicalMessage"))
      var value=''
      if(chooseParam&&chooseParam.textAreaValue){
        value=chooseParam.textAreaValue
      }
      var symptomArr=[]
      if(chooseParam&&chooseParam.symptomArr){
        symptomArr=chooseParam.symptomArr;
    }else{
        this.getSymptomList();
    }
      this.state = {
        en: false,
        show: false,
        config: {},
        startTime:'',
        clisPrice:'',//服务价格，支付时调用。
        name:null,
        phone:null,
        disabled:true,//按钮是否可以点击
        chooseTreatment:'还没选择呢',
        pickerValue2:'默认医生',
        modal1: false,
        modal2: false,
        symptomArr:symptomArr,
        chooseTime:[], //可选择的时间段
        chooseDate:[],
        doctorList:[],
        serviceList:[],
        currentChooseTime:null,//当前选择的时间段
        currentChooseDate:null,//当前选择的日期
        currchooseDateIndex:0,
        textAreaValue:value,
        getClinicAppointmentTimes:getClinicAppointmentTimes,
        getClinicDoctorList:getClinicDoctorList,
        getClinicServerIteamList:getClinicServerIteamList,
        subscriberAppointmentInfo:subscriberAppointmentInfo,
        getUserBaseinfo:getUserBaseinfo,
        getDateArr:getDateArr,
      };
       //获取医生列表
    this.getDoctorList();
    //获取服务列表
    this.getServiceList();
   
   
    }
  componentDidMount() {
    // this.autoFocusInst.focus();
 
    // var timeDate=this.state.getDateArr(7);
    var name=null
    var phone=null
    if(localStorage.getItem('loginInfo')){
      var name=JSON.parse(localStorage.getItem('loginInfo')).name;
      var phone=JSON.parse(localStorage.getItem('loginInfo')).mobile;
    }
    this.setState({
    //   chooseDate:timeDate,
      name:name,
      phone:phone
    })
    //查缓存
    var serverId=sessionStorage.getItem("serverId");
    var clisName=sessionStorage.getItem("clisName");
    var clisPrice=sessionStorage.getItem('clisPrice');
    if(serverId&&clisName){
        this.setState({
            pickerValue:clisName,
            appointmentServeritemId:serverId
        })
    }
    if(clisPrice){
        this.setState({
            clisPrice:clisPrice
        })
    }
   var doctorId= sessionStorage.getItem("doctorId");
   var doctorName=sessionStorage.getItem("doctorName");
    if(doctorId&&doctorName){
        this.setState({
            pickerValue2:doctorName,
        })
    }


   //获取缓存数据
    var chooseParam=JSON.parse(localStorage.getItem("medicalMessage"))
    var item={}
    if(chooseParam&&chooseParam.currentChooseDate){
        item=chooseParam.currentChooseDate
    }
    var index=""
    if(chooseParam&&chooseParam.currchooseDateIndex){
        index=chooseParam.currchooseDateIndex
    }
    this.canChooseTime(0,item,index);

    // var doctorId="";
    // if(this.state.doctorId){
    //  var doctorId=parseInt(this.state.doctorId);
    // }
 
    // var doctorName=""
    // if(this.state.pickerValue2&&this.state.pickerValue2!="默认医生"){
    //  var doctorName=this.state.pickerValue2;
    // }
    //  const appointmentDate=this.state.currentChooseDate.time;
    //  const appointmentTime=this.state.currentChooseTime;
    //  var appointmentServeritem="";
    //  if(this.state.pickerValue){
    //    var appointmentServeritem=this.state.pickerValue;
    //  }
    //  const userName=this.state.name;
    //  const mobile=this.state.phone;
    //  var appointmentServeritemId=""
    //  if(this.state.appointmentServeritemId){
    //    var appointmentServeritemId=parseInt(this.state.appointmentServeritemId);
    //  }
    if(chooseParam){
      this.setState({
        pickerValue2:chooseParam.doctorName,
        currentChooseTime:chooseParam.appointmentTime,
        currentChooseDate:chooseParam.currentChooseDate,
        currchooseDateIndex:chooseParam.currchooseDateIndex,
        appointmentTime:chooseParam.appointmentTime,
        pickerValue:chooseParam.appointmentServeritem,
        appointmentServeritemId:chooseParam.appointmentServeritemId,
        textAreaValue:chooseParam.textAreaValue,
        clisPrice:chooseParam.clisPrice
      })
    }
    // //获取医生列表
    // this.getDoctorList();
    // //获取服务列表
    // this.getServiceList()
  }
  //获取医生列表
  getDoctorList=()=>{
    var self=this;
    this.state.getClinicDoctorList().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                  var data=[]
                    obj.result.doctorList.map(function(item,index){
                          var a={}
                          a.label=item.doctorName;
                          a.value=item.doctorId;
                          data.push(a)
                    })
                    self.setState({
                      doctorList:data
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
  getSymptomList=()=>{
    var self=this;
    getSymptomConfig().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                    obj.result.map(function(item,index){
                         item.checked=false;
                    })
                    self.setState({
                        symptomArr:obj.result
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
  getServiceList=()=>{
    var self=this;
    this.state.getClinicServerIteamList().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                  var data=[]
                    obj.result.map(function(item,index){
                          var a={}
                          a.label=item.clisName;
                          a.value=item.id;
                          a.clisPrice=item.clisPrice;
                          data.push(a)
                    })
                    self.setState({
                      serviceList:data
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
  //可选择的时间段
  canChooseTime=(type,item,index)=>{
    var self=this;
    var param=""
    if(item&&item.time){
         param="appointmentDay="+item.time
    }
    
    this.state.getClinicAppointmentTimes(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                if(!type){
                        self.setState({
                            chooseDate:self.state.getDateArr(7,obj.result.currentTime)
                        })
                }else{
                    self.setState({
                    currentChooseTime:null //切换重新加载时间数据
                    })
                }
                if(item){
                    self.setState({
                        currentChooseDate:item,
                        currchooseDateIndex:index
                    })
                }
                self.setState({
                  chooseTime:obj.result.appointmentTimes,
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

  handleClick = () => {
      //获取 输入框里面的值
      if(this.inputRef.props.value){
        console.log(this.inputRef.props.value.replace(/ /g,''))
      }
    // this.inputRef.focus();
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
 
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  //选择
  choose=(item,index)=>{
      if(!item.status){
          return 
      }
      this.setState({
        currentChooseTime:item.times
      }) 
  }
  chooseCurrentDate=(item,index)=>{
      if(this.state.currchooseDateIndex==index){
          return 
      }
      this.canChooseTime(1,item,index)
    // this.setState({
    //     currentChooseDate:item,
    //     currchooseDateIndex:index
    //   }) 
  }
  //选择医生
  chooseDoctor=(v)=>{
     var data=this.state.doctorList.filter(function(item,index){
           return  item.value==v[0]
     })[0].label
     this.setState({
       pickerValue2:data,
       doctorId:v[0]
     })
  }
  //选择服务
  chooseService=(v)=>{
                var data=this.state.serviceList.filter(function(item,index){
                  return  item.value==v[0]
            })[0].label
            var obj=this.state.serviceList.filter(function(item,index){
                return  item.value==v[0]
          })[0];
            this.setState({
              pickerValue:data,
              appointmentServeritemId:v[0],
              clisPrice:obj.clisPrice
            })
  }
  //提交
  submit=()=>{
    //清楚存储的 用户基本信息
    window.sessionStorage.removeItem('confirmMessage');
    if(!this.state.currentChooseDate){
      Toast.info('请选择预约日期 !!!', 1);
      return 
    }
    if(!this.state.currentChooseTime){
      Toast.info('请选择预约时间点 !!!', 1);
      return 
    }
    var doctorId="";
     if(this.state.doctorId){
      var doctorId=parseInt(this.state.doctorId);
     }
  
     var doctorName=""
     if(this.state.pickerValue2&&this.state.pickerValue2!="默认医生"){
      var doctorName=this.state.pickerValue2;
     }
      const appointmentDate=this.state.currentChooseDate.time||this.state.chooseDate[0].time;
      const appointmentTime=this.state.currentChooseTime;
      var appointmentServeritem="";
      if(this.state.pickerValue){
        var appointmentServeritem=this.state.pickerValue;
      }
      const userName=this.state.name;
      const mobile=this.state.phone;
      var appointmentServeritemId=""
      if(this.state.appointmentServeritemId){
        var appointmentServeritemId=parseInt(this.state.appointmentServeritemId);
      }
      var symptom=[]
      this.state.symptomArr.forEach(function(item){
            if(item.checked){
                symptom.push(item.itemName)
            }
      })
      var symptomStr=symptom.join(',')
      var param="doctorId="+doctorId+"&doctorName="+doctorName+"&appointmentDate="+appointmentDate+"&appointmentTime="+appointmentTime+"&appointmentServeritem="+appointmentServeritem+"&appointmentServeritemId="+appointmentServeritemId+"&symptomSelect="+symptomStr+"&symptomDesc="+this.textArea.state.value+"&clisPrice="+this.state.clisPrice
      
      var chooseParam={
        doctorId:doctorId,
        doctorName:doctorName,
        appointmentDate:appointmentDate,
        appointmentTime:appointmentTime,
        appointmentServeritem:appointmentServeritem,
        appointmentServeritemId:appointmentServeritemId,
        currchooseDateIndex:this.state.currchooseDateIndex,
        currentChooseDate:this.state.currentChooseDate,
        symptomArr:this.state.symptomArr,
        symptomStr:symptomStr,
        textAreaValue:this.textArea.state.value,
        clisPrice:this.state.clisPrice
      }
      localStorage.setItem("medicalMessage",JSON.stringify(chooseParam))
      localStorage.setItem("nextParam",param)
      this.props.history.push('/medical')
      // this.subscribe(param)
    }
  subscribe=(param)=>{
    var self=this;
    this.state.subscriberAppointmentInfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
               self.setState({
                modal2:true
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
  success=()=>{
    this.setState({
      modal2:false
    })
    this.props.prop.history.replace("/")
  }
  changeTextArea(e){
      console.log(this.textArea.state.value)
  }
  changeCheckedStatus(index){
    var items = this.state.symptomArr;
    items[index].checked=!items[index].checked;
    this.setState({
        symptomArr:items
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const district=[{
      value:'harry',
      label:'1'
    },
    {
      value:'binn',
      label:'2'
    }
  
  ]
    return (
      <div style={{height:'100%',width:'100%',background:'#F7F7F7'}}>
      
        <div className="data_content">
                <div>选择预约日期(必选)</div>
                <div className="date_bottom">
                      {this.state.chooseDate.map((item,index) =>

                          <div  key={index} className={this.state.currchooseDateIndex==index?'date_1':'date_box'}    onClick={this.chooseCurrentDate.bind(this,item,index)}>
                                <span className="f_10">{item.valye}</span>
                                <div className="f_16">{item.label}</div>
                          </div>

                      )}
                 
                </div>
          </div>
          <div className="time_content">
          <div>选择预约时间(必选)</div>
                <div className="time_bottom flex_wrap just_content_sb">

                {this.state.chooseTime.map((item,index) =>
                    <div  className={`${this.state.currentChooseTime===item.times?'time_1':'time_box'}  ${!item.status?'disabled':''}`} key={index}  onClick={this.choose.bind(this,item,index)}  > 
                          <div className="f_16">{item.times} {item.num}</div>
                    </div>
                )}
                </div>

          </div>
          {/* 选择框 */}
          <div>
      <WhiteSpace size="lg" />
      {this.state.serviceList.length > 0 &&
          <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
      
          <Picker data={this.state.serviceList} cols={1} className="forss"  
          onChange={this.chooseService.bind(this)}    
          onOk={(e) =>  console.log(e[0])}
        //   value={[this.state.serverId]}
          //   this.setState=({
          //   chooseTreatment:this.state.pickerValue
          // })
        // }  
          extra={this.state.pickerValue }
          >
            <List.Item arrow="horizontal" >
               选择诊疗项目
            </List.Item>
           
          </Picker>
        </List>
      }
    
      <WhiteSpace size="lg" />

         {this.state.doctorList.length > 0 &&
      <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
        <Picker data={this.state.doctorList} cols={1} className="forss"  
        onChange={this.chooseDoctor.bind(this)}    
        onOk={(e) =>  console.log(e[0])}
         
        //   this.setState=({
        //   chooseTreatment:this.state.pickerValue
        // })
      // } 
        // value={this.state.pickerValue2 }
        extra={this.state.pickerValue2 }
        >
          <List.Item arrow="horizontal" >
             选择诊疗医生
          </List.Item>
        </Picker>
      </List>
      }

        {
            this.state.symptomArr.length>0 &&
            <div className="time_content">
                        <div style={{fontSize:'14px'}}>选择症状</div>
                    <div>
                        {
                            this.state.symptomArr.map((item,index)=>(
                                <Button key={index}  type={item.checked?'primary':'default'} onClick={this.changeCheckedStatus.bind(this,index)} inline size="small" className="chooseSymBtn">{item.itemName}</Button>
                            ))
                        }
                    </div>
                </div>
        }
        
        <div style={{paddingLeft:'20px',background:"#fff",marginTop:'10px',paddingTop:'20px',fontSize:'14px'}}>症状描述</div>
        <TextareaItem
        className="textareaRow"
            rows={5}
            count={100}
            editable={true}
            disabled={false}
            defaultValue={this.state.textAreaValue}
            ref={el => this.textArea = el}
            onChange={this.changeTextArea.bind(this)}
            placeholder="请详细的输入您的症状（100字以内）"
        />

      <Button type="primary"  onClick={this.submit.bind(this)}  style={{width:"90%",marginLeft:'5%',marginTop:'30px'}}>下一步</Button><WhiteSpace />

        
        
        <Modal
          popup
          visible={this.state.modal2}
          maskClosable={false}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <List className="popup-list">
           
            <div className="alertContent">
                <img src={success} />
                  <div style={{color:"#000000",fontSize:'15px'}}>您已成功预约</div>
                  <div className="chooseTimeshow">就诊时间 
                  
                  {this.state.currentChooseDate &&
                      <span> {this.state.currentChooseDate.label}号 </span>
                  }
                  {this.state.currentChooseTime}
                  </div>
            </div>
            <Button type="primary" onClick={this.success.bind(this)}  disabled={this.state.disabled}  style={{marginBottom:'30px'}}>确定</Button>
          </List>
        </Modal>
        <TechnicalSupport history={this.props.history}></TechnicalSupport>




    </div>

            
      </div>
    );
  }
}
const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper