import React from 'react';
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button,Toast } from 'antd-mobile';
import bannerUrl from '../../static/images/homepage_banner@3x.png';
import Detail from './detail/index'
import {GetRequest} from '../../util/index'
import {getClinicGoodsList} from '../../api/api'
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
    document.title="产品列表"
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      data:[],
      useBodyScroll: true,
      prop:props,
      getClinicGoodsList:getClinicGoodsList
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
  genDataList = (pos=0,count=6,fresh) =>{
    var self=this;
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    var param="position="+pos+"&count="+count
    this.state.getClinicGoodsList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 

              //判断是否是刷新操作
              if(!obj.result.goodsList){
                obj.result.goodsList=[]
              }
              if(fresh){
                var newData=obj.result.goodsList;
              }else{
                var newData=self.state.data.concat(obj.result.goodsList);
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
    this.genDataList(0,6,1)
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
  gotoGoodsDetail=(e)=>{
        this.props.history.push(`/goodsList/${e}`)      
  }
  _renderRow(row, sectionId, rowId) {
    return (
      
    
          <div className="wid_50 flex_column goods_box"  onClick={this.gotoGoodsDetail.bind(this,row.id)}>
                                    <img src={row.goodsIcon||row.goodsImg}  style={{width:'100%'}}/>
                                    <span style={{marginTop:'5px'}}>{row.goodsName}</span>
        
            </div>
      
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
        paddingTop:'10px',
        backgroundColor:'#fff'
    }}
    >
      
      <ListView
      className="sss"
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        onEndReachedThreshold={120}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            
          {this.state.isLoading ? "加载中..." : '暂无更多数据'}
          <TechnicalSupport history={this.props.history}></TechnicalSupport>
        </div>)}
        renderRow={
          this._renderRow.bind(this)
        }
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