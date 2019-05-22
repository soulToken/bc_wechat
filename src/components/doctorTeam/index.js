import React from 'react';
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button,Toast } from 'antd-mobile';
import bannerUrl from '../../static/images/homepage_banner@3x.png';
import nameBox from '../../static/images/home/toobar/ChineseMedicineType2/home/name_box.png'
import Detail from './detail/index'
import {GetRequest} from '../../util/index'
import {getClinicDoctorList} from '../../api/api'
import TechnicalSupport from '../technicalSupport/index'
import './index.css'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'1'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'2'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'3'
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class App extends React.Component {
  constructor(props) {
    document.title="医生团队"
    var type=sessionStorage.getItem("clinicShowType")
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      clinicShowType:type,
      height: document.documentElement.clientHeight,
      data:[],
      useBodyScroll: true,
      prop:props,
      getClinicDoctorList:getClinicDoctorList
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
      this.genDataList()
  }
  //获取列表数据决口
  genDataList = (pos=0,count=5,fresh) =>{
    var self=this;
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    var param="position="+pos+"&count="+count
    this.state.getClinicDoctorList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 

              //判断是否是刷新操作
              if(fresh){
                var newData=obj.result.doctorList;
              }else{
                var newData=self.state.data.concat(obj.result.doctorList);
              }
                 self.setState({
                   data:newData,
                   dataSource: self.state.dataSource.cloneWithRows(newData),
                   height: hei,
                   refreshing: false,
                   isLoading: false,
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


  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.genDataList(0,5,1)
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.genDataList(this.state.data.length)
    // setTimeout(() => {
    //   // this.rData = [...this.rData, ...genData(++pageIndex)];
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.state.data),
    //     isLoading: false,
    //   });
    // }, 1000);
  };
  //执行的一个点击事件 判断跳转到 医生详情页面
  handleClick=(e)=>{
        this.props.history.push(`/doctorTeam/${e}`)      
  }
  call(val){
    if (!val) {
        Toast.info('暂无联系方式 !!!', 1);
        return
    }
    window.location.href = 'tel://' + val;
}
bindOrYuyue = (id,name) => {
    // var loginInfo=JSON.parse(localStorage.getItem("loginInfo")) 
    //     if(loginInfo&&loginInfo.mobile){
    //       this.props.prop.history.push('/onlineBook')
    //     }else{
    //       this.props.prop.history.push('/bind')
    //     }
    if(id&&name){
        sessionStorage.setItem("doctorId",id);
        sessionStorage.setItem("doctorName",name);
    }else{
        sessionStorage.removeItem("doctorId");
        sessionStorage.removeItem("doctorName");
    }
    sessionStorage.removeItem("clisName")
    sessionStorage.removeItem("serverId")
    localStorage.removeItem("medicalMessage")
    this.props.history.push('/onlineBook')
}
  _renderRow(val, sectionId, index) {


    var component;
    if(this.state.clinicShowType==1){
        component=(
            <div className="team_content flex_row" key={index} onClick={this.handleClick.bind(this, val.doctorId)}>
            <div className="team_content_left flex_1">
                <img style={{ width: '100%', display: 'block' }} src={val.headUrl} />
            </div>
            <div className="team_content_right flex_1 flex_column">
                <div className="doctor_introduce_box flex_column al_center">
                    <div className="doctor_name_box">{val.doctorName}</div>
                    <div className="doctor_classify_box">{val.positio}</div>
                </div>
                <div className="doctor_introduce_text" style={{ WebkitBoxOrient: 'vertical' }}>
                    {val.selfDescription}
                </div>
            </div>
            </div>
        )
    }else if(this.state.clinicShowType==2){
        component=(
            <div className="flex_row" key={index} style={{marginBottom:'20px'}}>
            <div style={{width:'145px',marginRight:'18px',position:'relative'}} onClick={this.handleClick.bind(this,val.doctorId)}>
                    <img src={val.headUrl} style={{width:'145px'}} />
                    <div className="type3_watch_detail">查看详情</div>
            </div>
            <div className="flex_1 flex_column">
                    <span className="type3_doctor_name">{val.doctorName}</span>
                    <span className="type3_doctor_type">{val.positio}</span>
                    <span className="type3_doctor_intro" style={{WebkitBoxOrient:"vertical"}}>
                            {val.selfDescription}
                    </span>
                    <div className="flex_row" style={{marginTop:'10px'}}>
                        <div className="width_45 type3_zixun_btn" onClick={this.call.bind(this,val.mobile)}  style={{marginRight:'10%'}}>咨询</div>
                        <div className="width_45 type3_yuyue_btn" onClick={this.bindOrYuyue.bind(this,val.doctorId,val.doctorName)}>预约</div>
                    </div>
            </div>
         
        </div>
        )
    }else if(this.state.clinicShowType=='02002'){
        component=(
            <div className="haveLine type3_doctor_box" style={{ paddingTop: '10px' }} key={index}>
                        <div className="flex_row" key={index} style={{ marginBottom: '20px' }} onClick={this.handleClick.bind(this, val.doctorId)}>
                            <div style={{ width: '145px', marginRight: '18px', position: 'relative' }} >
                                <img src={val.headUrl} style={{ width: '145px', marginTop: '25px' }} />
                            </div>
                            <div className="flex_1 flex_column al_center">
                                <span className="type3_doctor_name" style={{ color: '#074155' }}>{val.doctorName}</span>
                                <span className="pos_rel" style={{ background: 'url(' + nameBox + ') no-repeat center', height: '40px', width: '90%', backgroundSize: 'contain', textAlign: 'center', lineHeight: '40px', fontSize: '16px', color: '#fff', fontWeight: '700' }}>
                                    {val.positio}
                                </span>
                                <span className="type3_doctor_intro" style={{ WebkitBoxOrient: "vertical" }}>
                                    {val.selfDescription}
                                </span>

                            </div>

                        </div>
                    </div> 
        )
    }else if(this.state.clinicShowType=='01002'){
        component=(
            <div className="team_content flex_row" key={index} onClick={this.handleClick.bind(this, val.doctorId)}  style={{border:0}}>
            <div className="team_content_left flex_1">
                <img style={{ width: '100%', display: 'block' }} src={val.headUrl} />
            </div>
            <div className="team_content_right flex_1 flex_column">
                <div className="doctor_introduce_box flex_column al_center">
                    <div className="doctor_name_box">{val.doctorName}</div>
                    <div className="doctor_classify_box">{val.positio}</div>
                </div>
                <div className="doctor_introduce_text" style={{ WebkitBoxOrient: 'vertical' }}>
                    {val.selfDescription}
                </div>
            </div>
        </div>
        )
    }else{
        var row=val;
        component=(
                   
      <div key={row.doctorId}
          style={{

            paddingRight:'12px',
            marginTop:'5px',
            marginBottom:'5px',
            background:'rgba(255,255,255,1)',
            boxShadow:'0px 1px 3px 1px rgba(0,0,0,0.15)'
            // borderRadius:'14px'
          }}
        >
          <div style={{ display: '-webkit-box', display: 'flex',flexDirection:'row' }} className= "flex_row al_stretch">
          {/* <img style={{ height: '85px', width: '85px', marginRight: '17px' }} src={row.headUrl} alt="" /> */}
            <div style={{ width: '85px', marginRight: '17px',background:'url('+row.headUrl+') no-repeat center',backgroundSize:'cover' }}>

            </div>

            <div style={{ flex:'1',width:'0',paddingBottom:'12px',paddingTop:'15px'}} >
              <div  className="team_right"  >
                    <div>
                        <div className="doctor_name">{row.doctorName}</div>
                        <div className="doctor_type">{row.positio}</div>
                    </div>
              
                    {/* (e)=>{
                        console.log(this.state.prop)
                        var id=e.currentTarget.getAttribute("data-obj")
                          debugger;
                        // this.state.prop.history.location.push(`/doctorTeam/${id}`)
              } */}

                    <div className="checkedDetail"  data-obj={row.id}  onClick={this.handleClick.bind(this,row.doctorId)}>查看详情</div>
              
                </div>
                {
                    row.selfDescription &&
                    <div className="line" style={{marginTop:'10px'}}></div>
                }
             
              <div className="twoEllipsis2" style={{  marginTop:'10px',WebkitBoxOrient: 'vertical'}}>
              {/* ￥{rowID} */}
              {row.selfDescription}
              </div>
            </div>
          </div>
        </div>
        )
    }
    
    return (
        <div key={index} style={{paddingTop:'10px'}}>
              {component}
        </div>
      
    //   <div key={row.doctorId}
    //       style={{
    //         paddingLeft:'12px',
    //         paddingRight:'12px',
    //         marginTop:'5px',
    //         marginBottom:'5px',
    //         background:'rgba(255,255,255,1)',
    //         boxShadow:'0px 1px 3px 1px rgba(0,0,0,0.15)',
    //         borderRadius:'20px'
    //         // borderRadius:'14px'
    //       }}
    //     >
    //       <div style={{ display: '-webkit-box', display: 'flex', padding: '15px',flexDirection:'row' }}>
    //         <img style={{ height: '85px', width: '85px', marginRight: '17px',borderRadius:'50%' }} src={row.headUrl} alt="" />
    //         <div style={{ flex:'1',width:'0'}}>
    //           <div  className="team_right">
    //                 <div>
    //                     <div className="doctor_name">{row.doctorName}</div>
    //                     <div className="doctor_type">{row.positio}</div>
    //                 </div>
              
    //                 {/* (e)=>{
    //                     console.log(this.state.prop)
    //                     var id=e.currentTarget.getAttribute("data-obj")
    //                       debugger;
    //                     // this.state.prop.history.location.push(`/doctorTeam/${id}`)
    //           } */}

    //                 <div className="checkedDetail"  data-obj={row.id}  onClick={this.handleClick.bind(this,row.doctorId)}>查看详情</div>
              
    //             </div>
    //           <div className="twoEllipsis2" style={{  marginTop:'10px',WebkitBoxOrient: 'vertical'}}>
    //           {/* ￥{rowID} */}
    //           {row.selfDescription}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
        
    )
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
        //   backgroundColor: '#F5F5F9',
        backgroundColor: '#fff',
          height: 8,
          // borderTop: '1px solid #ECECED',
          // borderBottom: '1px solid #ECECED',
        }}
      />
    )
    return (
    <div
    className="doctor_list"
    style={{
        // paddingLeft:'12px',
        // paddingRight:'12px',
        // paddingTop:'10px',
        backgroundColor:'rgb(245, 245, 249)'
    }}
    >
      
      <ListView
    //   className="service_box"
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        onEndReachedThreshold={120}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
            
          {this.state.isLoading ? "加载中..." : '暂无更多数据'}
          <TechnicalSupport history={this.props.history}></TechnicalSupport>
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
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached.bind(this)}
        pageSize={5}
      />
      {/* <TechnicalSupport></TechnicalSupport> */}
    </div>);
  }
}
const Topic = ({ match }) => (
    <div>
      <h3>我是医生团队详情</h3>
    </div>
  );

class Iteme extends React.Component {
    constructor(props) {
      super(props);
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
  
          {/* <Switch> */}
  
          <Route exact path={`${this.state.match}`} component={App} />
          <Route path={`${this.state.match}/:id`} component={Detail} />
          {/* </Switch> */}
  
  
        </div>);
    }
  }
  
  
  
  
  export default Iteme 