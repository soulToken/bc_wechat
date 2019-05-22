import React from 'react';
import ReactDOM from 'react-dom'
import { findDomNode } from 'react-dom';
import './index.scss'
import {getUserCouponList,queryCanuseCoupon} from '../../api/api'
import {Toast} from 'antd-mobile'
import { Route } from "react-router-dom";
import {GetRequest,getDate} from '../../util/index'

/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const param=GetRequest(this.props.location.search)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      data:[],
      source:param.id
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  componentDidMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    if(this.state.source){
        this.getCouponList();
    }else{
        this.getList()
    }
   
  
 
    // setTimeout(() => {
    //   this.rData = genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(genData()),
    //     height: hei,
    //     refreshing: false,
    //     isLoading: false,
    //   });
    // }, 1500);
  }
  getCouponList(){
    var self=this;
    var  hei=this.state.height
    this.setState({
        isLoading: true,
    })
    if(ReactDOM.findDOMNode(this.lv)){
      var hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    }
    var param="paymentAmount="+this.state.source;
  queryCanuseCoupon(param).then(function(res){
    if (res.ok) {
      res.json().then((obj)=> {
          if(obj.resultCode==="1000"){
             
           
         
                    var newData=obj.result;
                
                    self.setState({
                      data:newData,
                      dataSource: self.state.dataSource.cloneWithRows(newData),
                       height: hei,
                       refreshing: false,
                       isLoading: false,
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
  getList=(pos=0,count=10,fresh)=>{
    var self=this;
    var  hei=this.state.height
    this.setState({
        isLoading: true,
    })
    if(ReactDOM.findDOMNode(this.lv)){
      var hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    }
    var param="position="+pos+"&count="+count
    getUserCouponList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              if(fresh){
                var newData=obj.result;
              }else{
                var newData=self.state.data.concat(obj.result);
              }
                self.setState({
                  data:newData,
                  dataSource: self.state.dataSource.cloneWithRows(newData),
                   height: hei,
                   refreshing: false,
                   isLoading: false,
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
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    if(this.state.source){
        this.getCouponList();
    }else{
        this.getList(0,10,1);
    }
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log(this.state.data.length)
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
  
    if(this.state.source){
        this.getCouponList();
    }else{
        this.getList(this.state.data.length)
    }
   
  };
  getClick=(id)=>{
        this.props.history.push('/activity/'+id)
  }
  goPay(id,couponId){
        if(!this.state.source){
            return 
        }
        console.log("跳转到支付界面");
        this.props.history.replace('/medical?id='+id+"&couponId="+couponId)
  }
  _renderRow(row, sectionId, index) {
    return (
        <div className="flex_row coupon_box"  onClick={this.goPay.bind(this,row.couponAmount,row.id)} key={index}  style={{alignItems:'stretch',height:'100px',marginBottom:'10px'}}>
            <div className={row.canUse=='0'?'disabled coupon_left flex_column just_content_sb ' : 'coupon_left flex_column just_content_sb'} style={{width:'106px'}}>
                <span >￥
                
                    <span style={{fontSize:'23px'}}>{row.couponAmount}</span> 
                </span>
                <span style={{marginTop:'16px'}}>满{row.enableAmount}可用</span>
                <div className="coupon_center flex_column al_center just_content_sb">
                    <div className="half_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="whole_circle"></div>
                    <div className="half_circle2"></div>
                </div>
            </div>
            <div className={ row.canUse=='0'?'disabled flex_1 coupon_right flex_column just_content_sb': 'flex_1 coupon_right flex_column just_content_sb'}>
                <span style={{fontSize:'15px'}}>{row.couponName}</span>
                <span className="over_two_ellipsis" style={{fontSize:'10px',color:'#bebebe',WebkitBoxOrient:'vertical',lineHeight:'16px'}}>{row.couponRemark}</span>
                <span style={{color:"#a6a6a6"}}>于{getDate(row.endDate)}日到期</span>
            </div>
        </div>

    )
  }




  render() {
   
 
    return (
      <div  style={{padding:'20px 12px 0 12px'}} >
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={30}
        renderFooter={() => (<div style={{ padding:10, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '无更多数据'}
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
        onEndReached={this.onEndReached}
        pageSize={5}
      />
     
    </div>);
  }
}





class App extends React.Component {
    constructor(props) {
      super(props);
      document.title="优惠券"
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
              <Demo location={this.props.location} history={this.props.history} />
          </div>);
      }
  
  
}





export default App













