//添加成员的页面  
import React, { Component } from "react";
import {
  ActionSheet,
  List,
  DatePicker,
  Picker,
  Button,
  WhiteSpace,
  Toast,
} from "antd-mobile";

import "./index.css";
import Input from "antd-mobile/lib/input-item/Input";
import {editRelatives,modifyUserInfo} from '../../api/api'
import TechnicalSupport from '../technicalSupport/index'
//定义
const Item = List.Item;
const district=[
  {
    value:'1',
    label:'男'
  },
  {
    value:'0',
    label:'女'
  }
]

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function formatDate(date) {
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${dateStr}`;
}

const relationStrArr = ['本人','父母','夫妻','子女','亲属','朋友','取消'];

class memberInfo extends React.Component {
  //初始化数据
  constructor(props) {
    super(props);
    
    if (sessionStorage.getItem("memberInfoItem")){
      var newParam = JSON.parse(sessionStorage.getItem("memberInfoItem"))
    }
    
    this.state = {
      name:newParam.name,
      mobile:newParam.mobile,
      birthday:newParam.birthday,
      sex:newParam.sex,
      relation: relationStrArr[newParam.relativesType - 1],
      relativesId:newParam.relativesId,
      editRelatives:editRelatives,
      modifyUserInfo:modifyUserInfo,
    };
  }

  componentDidMount(

  ) {}
  // 提交操作
  toPreservation = () => {
    var self = this;
    if (!this.state.name) {
      Toast.info('请输入姓名', 1);
      return
    }
    if (!this.state.sex) {
      Toast.info('请选择性别', 1);
      return
    }
    if (!this.state.birthday) {
      Toast.info('请选择出生日期', 1);
      return
    }
    if (!this.state.mobile) {
      Toast.info('请填写手机号', 1);
      return
    }
    if(this.state.mobile.replace(/\s/g, '').length < 11){
      Toast.info('请输入正确的手机号!!!', 1, null, false);
      return 
    }
    if(this.state.relation == "本人"){
      var self=this;
      var param2="name="+self.state.name+"&sex="+self.state.sex+"&birthday="+self.state.birthday+"&mobile="+self.state.mobile
      this.state.modifyUserInfo(param2).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                Toast.info('修改成功', 1);
                self.props.history.goBack();
                 
              }else{
              
                  Toast.fail(obj.resultMsg, 1);
              }
          })
      }
      }).catch(function(err){
        Toast.fail("网络错误呢", 1);
      })
     }else{
      var param="&name="+this.state.name+"&sex="+this.state.sex+"&mobile="+this.state.mobile+
      "&birthday="+this.state.birthday+"&relativesType="+(relationStrArr.indexOf(this.state.relation)+1)+"&relativesId="+this.state.relativesId 
      this.state.editRelatives(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                Toast.info('修改成功', 1);
                self.props.history.goBack();
              }else{
              
                  Toast.fail(obj.resultMsg, 1);
              }
          })
      }
      }).catch(function(){
        Toast.fail("网络错误", 1);
      })
     }

  };
   //选择关系
 selectRelationShip=() =>{
  ActionSheet.showActionSheetWithOptions({
  options: relationStrArr,
  cancelButtonIndex: relationStrArr.length - 1,
  maskClosable: true,
  'data-seed': 'logId',
  wrapProps,
},
(buttonIndex) => {
    var self=this;
  if (buttonIndex == 6){
    return
  }
  self.setState({ relation: relationStrArr[buttonIndex] });
});
}
//电话号码输入框改变
phoneInputChange(e){

  this.setState({
    mobile:e.target.value
  })
}
//名字输入框改变
nameInputChange(e){
  this.setState({
    name:e.target.value
  })
}
//选择性别方法
chooseSex=(v)=>{

  if(v){
    return district.filter(function(item){
      return item.value==v
    })[0].label
  }
}
//修改性别方法
changeSex=(v)=>{

  var param="sex="+v[0]
  this.setState({
      sex:v[0]
  })
}

//修改生日     
changeBirthday=(date)=>{
  var newDate=formatDate(date)
  var param="birthday="+newDate;
  this.setState({
    birthday:newDate
  })
}

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            top: "0",
            zIndex: "10",
            width: "100%",
            background: "#f5f5f5"
          }}
        >
          <List
            className="date-picker-list"
            style={{ backgroundColor: "white" }}
          >
            {/* 填写姓名的 */}
            {/* <div className="cellBox">
            <div className="memberList_content flex_row al_center just_content_sb">
            <div className="fixedDiv">姓名</div>
            <input className="inputClass" placeholder="请输入姓名" type="text" onChange={this.nameInputChange.bind(this)} defaultValue={this.state.name ? this.state.name : null}></input>
            </div>
            </div> */}
              <Item
                onClick={() => {}}
                // arrow="horizontal"
                >
                <div className="flex_row al_center just_content_sb">
                <span style={{marginRight:'44px'}}>姓名</span>
                <input className="inputClass" placeholder="请输入姓名" type="text" onChange={this.nameInputChange.bind(this)} defaultValue={this.state.name ? this.state.name : null}></input>
                </div>
                </Item>
            {/* 填写电话号码 */}
            {/* <div className="cellBox">
            <div className="memberList_content flex_row al_center just_content_sb">
            <div className="fixedDiv">手机号码</div>
            <input className="inputClass" placeholder="请输入手机号" onChange={this.phoneInputChange.bind(this)} defaultValue = {this.state.mobile ? this.state.mobile : null}></input>
            </div>
            </div> */}
              <Item
                onClick={() => {}}
                // arrow="horizontal"
                >
                <div className="flex_row al_center just_content_sb">
                <div className="fixedDiv">手机号码</div>
                <input className="inputClass" type="number" maxLength = "11"  placeholder="请输入手机号" onChange={this.phoneInputChange.bind(this)} defaultValue = {this.state.mobile ? this.state.mobile : null}></input>
                </div>
            </Item>

            {/* 选择生日的 */}
            <DatePicker
               mode="date"
               title="选择日期"
               extra="未填写"
               minDate={new Date("1900-01-01")}
               maxDate={this.state.time}
               value={this.state.birthday?new Date(this.state.birthday):null}
               onChange={this.changeBirthday.bind(this)} >
               <List.Item 
               arrow="horizontal">生日
               </List.Item>
             </DatePicker>

            {/* 选择性别的 */}
            <Picker data={district} cols={1}
              className="forss"
              value={[this.state.sex]}
              onChange={this.changeSex.bind(this)}
              onOk={v => this.setState({ sex: v[0] })}
              extra={this.chooseSex(this.state.sex)}>
              <Item
                arrow="horizontal"
              >
                性别
              </Item>
            </Picker>

            {/* 选择关系 */}
            <Item 
            arrow="horizontal"
               extra={this.state.relation ? this.state.relation : null}
               onClick = {this.selectRelationShip.bind(this)}
               arrow="horizontal">
              关系
            </Item>
          </List>

          <WhiteSpace />
          {/* 提交操作 */}
          <Button
            type="primary"
            onClick={this.toPreservation.bind(this)}
            inline
            style={{
              marginRight: "4px",
              width: "94%",
              marginLeft: "3%",
              marginTop: "40px"
            }}
          >
            提交
          </Button>
          <TechnicalSupport history={this.props.history}></TechnicalSupport>
        </div>
      </div>
    );
  }
}

export default memberInfo;
