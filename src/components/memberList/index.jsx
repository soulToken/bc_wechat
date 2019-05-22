//成员列表
import React, { Component } from "react";
import {
  SwipeAction,
  List,
  InputItem,
  Picker,
  Modal,
  Button,
  WingBlank,
  WhiteSpace,
  Toast,
  ImagePicker,
  Card
} from "antd-mobile";
import {getRelativesList,deleteRelatives} from '../../api/api'
import "./index.css";
import url from '../../static/images/doctor_team_portrait@3x.png'
import addMember from '../../static/images/member/add_member.png'
import addMember2 from '../../static/images/member/add_member2.png'
import TechnicalSupport from '../technicalSupport/index'

const Item = List.Item;
const Brief = Item.Brief;
//1本人  2父母  3夫妻  4子女  5亲属  6朋友
const listArr=['','本人','父母','夫妻','子女','亲属','朋友']

class memberList extends React.Component {
  //初始化数据
  constructor(props) {
    super(props);
    var type=sessionStorage.getItem("clinicShowType")
    this.state = {
      memberArr:[],
      clinicShowType:type
    };
    document.title = "家庭成员";
  }
  //页面渲染完成之后
  componentDidMount() {
    this.getList()
  }

    getList=()=>{
    var self=this;
    var param = ""
    Toast.loading('Loading...', 0, () => {
        
    });
    getRelativesList(param).then(function(res){
      if (res.ok) {
        console.log(res)
        res.json().then((obj)=> {
            Toast.hide();
            if(obj.resultCode==="1000"){ 
                    self.setState({
                        memberArr:obj.result
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
  delect=(param)=>{
      var self=this;
      Toast.loading('Loading...', 0, () => {
        
      });
    deleteRelatives(param).then(function(res){
        if (res.ok) {
          console.log(res)
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                Toast.hide();
                Toast.success('删除成功!!!', 1);
                self.getList()
              }else{
                  Toast.fail(obj.resultMsg, 1);
              }
          })
  
      }
      }).catch(function(){
        Toast.fail("网络错误", 1);
      })
  }
  //跳转到添加页面
  addMember = () => {
    this.props.history.push("/addMember");

  };
  checkMember = (item,index) => {
    //存储 门诊样式类型
    sessionStorage.setItem("memberInfoItem",JSON.stringify(item))
    this.props.history.push({pathname:"/memberInfo",query:{id:'hatt'} });
  };
  swipeOnPress = (item,index) => {
    //删除操作
    if(!item.relativesId){
        Toast.fail("不可以删除本人信息", 1);
        return 
    }
    var param="relativesId="+item.relativesId
   this.delect(param)
   
  };
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
            {this.state.memberArr.map((item,index) => (
            <SwipeAction
              style={{ backgroundColor: "gray" }}
              autoClose
              key={index}
              right={[
                {
                  text: "删除",
                  onPress: this.swipeOnPress.bind(this,item,index)
                  ,
                  style: {
                    width: "80px",
                    backgroundColor: "#FA3535",
                    color: "white"
                  }
                }
              ]}
              // onClose={(e) => e.stopPropagation()}
            >
          
            <div className="memberList_box"  onClick={this.checkMember.bind(this,item,index)}>
          
                <div className="memberList_content flex_row al_center">
                        <img src={url} className="memberList_headUrl" />
                        <div className="flex_column flex_1 just_content_center">
                            <div className="memberList_name">{item.name}</div>
                            <div className="memberList_phone">{item.mobile}</div>
                        </div>
                        <div className="memberList_type">{listArr[item.relativesType]}</div>
                </div>
                {this.state.memberArr.length!==index+1 &&
                <div className="line"></div>
                }
            </div>
        
            </SwipeAction>
        ))}
          </List>
        <div className="add_member_box flex_row al_center just_content_center" onClick={this.addMember.bind(this)}>
                {!this.state.clinicShowType &&
                    <img src={addMember} alt="" style={{width:'32px',height:'32px',marginRight:'12px'}}/>
                }
                {this.state.clinicShowType==1 &&
                    <img src={addMember2} alt="" style={{width:'32px',height:'32px',marginRight:'12px'}}/>
                }

              添加成员
        </div>
        <TechnicalSupport history={this.props.history}></TechnicalSupport>
        </div>
      </div>
    );
  }
}

export default memberList;
