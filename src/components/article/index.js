import React from 'react';
import ReactDOM from 'react-dom'
import {findDOMNode} from 'react-dom'
import './index.css'
import {getMaterial} from '../../api/api'
import {Toast} from 'antd-mobile'
import {GetRequest} from '../../util/index'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      data:[]
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
    // const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.getList()
  }
  getList=(pos=0,count=5,fresh)=>{
    var self=this;
    var  hei=this.state.height
    if(ReactDOM.findDOMNode(this.lv)){
      var hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    }
    var param="position="+pos+"&count="+count
    getMaterial(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              if(fresh){
                var newData=obj.result.item;
              }else{
                var newData=self.state.data.concat(obj.result.item);
              }
              if(!obj.result||!obj.result.item||!obj.result.item.length){
                var newData=[];
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

    this.getList(0,5,1)
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log(this.state.data.length)
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
  
    this.getList(this.state.data.length)
  };
  //跳转到微信文章
  go=(url)=>{
      window.location.href=url;
  }
  _renderRow(row, sectionId, index) {
    return (
        <div key={index} className="flex_column" onClick={this.go.bind(this,row.content.news_item[0].url)} style={{ padding: '15px 12px',background:'#fff' }}>
                <div  style={{padding:'0px 70px',textAlign:'center'}}>{row.content.news_item[0].title}</div>
                <div style={{width:'100%',paddingTop:'60%',marginTop:'10px',background:'url('+row.content.news_item[0].thumb_url+') no-repeat center',backgroundSize:'cover'}}></div>
        </div>
    )
  }
  render() {
    return (<div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={150}
        renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
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
      document.title="文章浏览"
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
              <Demo />
          </div>);
      }
  
  
}





export default App













