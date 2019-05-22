import React from 'react';
import honor from '../../../static/images/home/honor_bg.png'
import {getClinicDoctorDetail,getSignature4Js} from '../../../api/api'
import {Toast} from 'antd-mobile'
import './index.css'
import TechnicalSupport from '../../technicalSupport/index'

class App extends React.Component{
    constructor(props) {
        super(props);
        document.title="医生详情"
        this.state={
            doctorId:this.props.match.params.id,
            getClinicDoctorDetail:getClinicDoctorDetail,
            headUrl:null,
            doctorName:null,
            positio:null,
            doctorobj:null,
            selfDescription:null,
            honorList:[],
            arr:[]
        }
    }
    componentDidMount() {
        this.getDetail()
    }
    previewImage = (index) => {
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
                                    'hideOptionMenu', 'previewImage']
                            });
                            window.wx.ready(function () {
                                // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                                window.wx.checkJsApi({
                                    jsApiList: ['getNetworkType', 'previewImage', 'openLocation', 'getLocation', 'previewImage'],
                                    success: function (res) {
                                        // 以键值对的形式返回，可用的api值true，不可用为false
                                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                    }
                                });
                                window.wx.hideOptionMenu();
                                var urls = []
                                self.state.arr.forEach(function (item) {
                                    urls.push(item)
                                })
                                window.wx.previewImage({
                                    current: index, // 当前显示图片的http链接
                                    urls: urls // 需要预览的图片http链接列表
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
    getDetail=()=>{
        var self=this;
        var param="doctorId="+this.state.doctorId
        this.state.getClinicDoctorDetail(param).then(function(res){
            if (res.ok) {
              res.json().then((obj)=> {
                  if(obj.resultCode==="1000"){ 
                            self.setState({
                                doctorobj:obj.result,
                                headUrl:obj.result.headUrl,
                                doctorName:obj.result.doctorName,
                                positio:obj.result.positio,
                                selfDescription:obj.result.selfDescription,
                                honorList:obj.result.honorList
                            })
                            if(obj.result.introducePicture){
                                self.setState({
                                    arr:obj.result.introducePicture.split(',')
                                })
                            }

                  }else{
                      Toast.fail(obj.resultMsg, 1);
                  }
                 
      
              })
      
          }
          }).catch(function(){
            Toast.fail("网络错误", 1);
          })
              
    }
    render(){
        return (
            <div style={{background:'#fff'}}> 
                <div style={{position:'relative',width:'100%'}}>
                        <div className="flex_column al_center commonBg" style={{height:'88px'}}></div>
                        <div className="header_down commonBg"  style={{height:'50px'}}></div>
                </div>
                {/* <div className="flex_column al_center" style={{position:'relative',zIndex:'2'}}>
                        <div className='user-header'>
                                <img src={this.state.headUrl}  style={{display:'block',border:'6PX solid #e2effd',borderRadius:'5px'}}></img>
                        </div>
                        <div   style={{marginTop:'9px'}}>
                        {
                            this.state.doctorName && 
                            <div style={{fontSize:'17px'}}>{this.state.doctorName}</div>
                        }
                        {
                            this.state.positio &&
                            <div  style={{marginTop:'8px',color:'#808080',fontsize:'14px',lineHeight:"18px",textAlign: 'center'}}>{this.state.positio}</div> 
                        }        
                        </div>
                        {
                            this.state.selfDescription &&
                            <div  style={{fontSize:'14px',padding:'8px',lineHeight:"22px"}}>
                                                            {this.state.selfDescription}
                            </div>
                        }   
                </div> */}
                 <div className="flex_row al_center just_content_center" style={{marginTop: '-25%'}}>
                    <div style={{width:'56%',paddingTop: '56%',borderRadius:'50%',position:'relative'}}>
                            <div style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%',background:'#fff',opacity:'0.1',top:'0',left:'0'}}></div>
                            <div style={{position:'absolute',width:'80%',height:'80%',borderRadius:'50%',left:'10%',top:'10%',background:'#fff',opacity:'0.3'}}></div>
                            <div style={{position:'absolute',width:'64%',height:'64%',borderRadius:'50%',left:'18%',top:'18%',background:'#fff',opacity:'0.5'}}></div>
                            <div style={{position:'absolute',width:'50%',height:'50%',borderRadius:'50%',left:'25%',top:'25%',background:'#fff',opacity:0.7}}></div>
                            <div className="box_shadow" style={{position:'absolute',width:'40%',height:'40%',borderRadius:'50%',left:'30%',top:'30%',background:'url('+this.state.headUrl+') no-repeat center',backgroundSize:'cover'}} ></div>
                            <div className="flex_column al_center"   style={{marginTop:'18px', position:'absolute',top:'66%',width:'100%'}}>
                                    <div  style={{fontSize:'17px'}}>{this.state.doctorName}</div>
                                    <div className="doctor_detail_classify" style={{marginTop:'8px',fontSize:'14px',textAlign: 'center'}}>{this.state.positio}</div> 
                                    
                            </div>
                          
                    </div>
                </div>
                <div className="flex_row al_center" style={{padding:'0 18px'}}>
                    <img className='doctor_detail_left_icon' src="http://100caresit.oss-cn-shenzhen.aliyuncs.com/100care_manage/clinic/57CD72BBA82A4838AA43A517E3A9114F.png"></img>
                    <span>医师简介</span>
                </div>
                <div className="doctor_detail_introduce" style={{padding:'0 18px'}}>{this.state.selfDescription||'暂无'}</div>




                {
                   this.state.honorList.length>0 &&
                   <div className="honor_box flex_column"  style={{marginTop:'15px'}}>
                   <div className="honor_des">
                            {
                                this.state.honorList.map((item,index)=>(
                                    <div className="honor_content flex_row al_center"  key={index}>
                                        <div className="flex_1" style={{fontSize:'14px'}}>{item.authContent}</div>
                                        <img src={honor} style={{width:'17px',marginRight:'15px'}} />
                                    </div>
                                ))
                            }
                         
                           </div>
                        </div>
                }
                
                <div className='doctor-intro' style={{marginTop:'15px',borderRadius:'100%'}}>
                    <div className='flex_column'  >
                        {
                            this.state.arr.map((item,index)=>(
                                <div className='item-img' key={index} onClick={this.previewImage.bind(this,index)}>
                                    <img     style={{width:'100%',marginBottom:'7px'}} src={item} />
                                </div>
                            ))
                        }
                       
                    </div>
                </div>



                <TechnicalSupport history={this.props.history}></TechnicalSupport>
            </div>
        )
    }
}
export default App