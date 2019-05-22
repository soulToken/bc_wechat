
import React from 'react';
import ReactDOM from 'react-dom'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Route } from "react-router-dom";
import { PullToRefresh, ListView, Button ,Toast,Carousel, WingBlank,Card} from 'antd-mobile';
import {getClinicServerIteamList,getClinicBanner} from '../../../api/api';
import right_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/right_arrow.png'
import bottom_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_bottom.png'
import top_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_top.png'
import title_bg from "../../../static/images/acne/home/head_title_bg.png"
class App extends React.Component {
    constructor(props) {
        var type=sessionStorage.getItem("clinicShowType")
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      document.title="服务列表"
      this.state = {
        dataSource,
        refreshing: true,
        isLoading: true,
        clinicShowType:type,
        data:[],
        bannerData:[],
        getClinicServerIteamList:getClinicServerIteamList,
        height: document.documentElement.clientHeight,
        getClinicBanner:getClinicBanner,
        useBodyScroll: true,
        currentIndex:'0'
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
      this.getList()
    }
    gotoDetail(id, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", id)
        this.props.method.gotoDetail(id)
    }
    gotoDetail2(id, e, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", e)
        this.props.history.push('/serviceItems/' + id + "?type=1")
    }
    gotoGoodsDetail(id) {
        this.props.method.gotoGoodsDetail(id)
    }
    bihe = (index) => {
        this.setState({
            currentIndex: index
        })
    }
    bihe2=(index)=>{
        if(index==this.state.currentIndex){
            this.setState({
                currentIndex: -1
            })
        }else{
            this.setState({
                currentIndex: index
            })
        }
    }
  
    _renderRow(val, id, index) {
        var component;
        var index=parseInt(index);
         if(this.state.clinicShowType=="02002"){
             
            component=(
                <div key={index}>
                <Card full>
                         <div style={{paddingBottom:'0'}}>
                            <Card.Body>
                                <div style={{position:'relative'}}>
                                <img src={val.clisPic || val.clisIcon} onClick={this.gotoDetail.bind(this, val.id, val.clisName)} style={{ width: '100%' }} />
                                <div style={{paddingTop:'13px',width:'100%',paddingBottom:'13px',background:'#093c4d',opacity:'0.8',position:'absolute',bottom:'0'}} className="flex_row al_center">
                                <span className="flex_1" style={{ color: "#fff", fontWeight: '600',marginLeft:'15px' }}>{val.clisName}</span> 
                                {
                                    val.subServerIteamList.length>0 &&
                                    <div>
                                    {
                                        this.state.currentIndex==index ?(
                                            <img  onClick={this.bihe2.bind(this, index)} style={{ width: '16px',marginRight:'15px' }} src={top_arrow}   />
                                        ):(
                                            <img onClick={this.bihe.bind(this, index)} style={{ width: '16px',marginRight:'15px' }} src={bottom_arrow} />
                                        )
                                    }
                                    </div>
                                }
                                </div>
                                </div>
                            </Card.Body>
                          
                        </div>
                        {
                            this.state.currentIndex==index &&
                            <div>
                            {
                                val.subServerIteamList.map((item,index2)=>(
                                            <div key={index2}>
                                                {
                                                    index2!=0 &&
                                                    <div className="flex_row">
                                                        <div style={{height:'1px',width:'15px'}}></div>
                                                        <div className="flex_1" style={{height:'1px',background:'#dfdfdf'}}></div>
                                                    </div>
                                                }  
                                            <div  style={{paddingLeft:'15px',paddingRight:'15px'}}>
                                            <Card.Header
                                                title={item.serverName}
                                                onClick={this.gotoDetail2.bind(this, item.id,val.id,val.clisName)}
                                                thumb={item.serverIcon || item.serverImg}
                                                thumbStyle={{ width: '61px', borderRadius: '5px' }}
                                                extra={<span><img style={{ width: '9px' }} src={right_arrow} /></span>}
                                            />
                                            </div>
                                            </div>
                                ))
                            }
                            </div>
                        }
                  
                </Card>

            </div>
            )
         }else if(this.state.clinicShowType=="03001"){
            component=(
                <div key={index}>
                    <div  className="head_title flex_column al_center just_content_center"  style={{marginTop:'18px',marginBottom:'18px'}}>
                            <img src={title_bg} className="head_title_center" style={{width:'100%',}} />
                            <span className="head_title_title commonCol">{val.clisName}</span>
                    </div>
                    <div style={{paddingLeft:'6px',paddingRight:'6px'}} onClick={this.gotoDetail.bind(this,val.id, val.clisName)}>
                            <img src={val.clisPic || val.clisIcon} className="head_title_center" style={{width:'100%',}} />
                    </div>
                </div>
            )
         }else if(this.state.clinicShowType=="01002"){
            component=(
                <div   style={{width:'100%'}}   data-index={index+1}  key={index}>
                {(index+1)%4==1 && (
                    <div className="width_100 flex_column al_center pos_rel" data-index="1"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                       
                        <div style={{width:'20%',paddingTop:'20%',borderRadius:'50%',position:'absolute',left:'13%',top:'8%',border:'4px solid #fde004'}}></div>
                        <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'6%',top:'14%'}}></div>
                        <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'7%',top:'17%'}}></div>
                        <div style={{textAlign:'center'}} className="clisName_box">{val.clisName}</div>
                    </div>
                )
                }
                {(index+1)%4==2 && (
                    <div className="width_100 flex_column al_center pos_rel" data-index="2"   style={{marginBottom:'10px',paddingTop:'100%'}}>
                  
                    <div className="flex_column pos_abs" style={{right:0,top:0}}>
                            <div className="flex_row" style={{marginTop:'4px'}}>
                                <div className="strach">
                                </div>
                                <div className="strach">
                                </div>
                                <div className="strach">
                                </div>
                            </div>
                            <div className="flex_row" style={{marginTop:'4px'}}>
                                <div className="strach">
                                </div>
                                <div className="strach">
                                </div>
                            </div>
                            <div className="flex_row" style={{marginTop:'4px'}}>
                                <div className="strach">
                                </div>
                            </div>
                            
                    </div>
                    

                    <div style={{width:'78%',paddingTop:'78%',borderRadius:'50%',position:'absolute',left:'2%',top:'18%',border:'4px solid #fde004'}}></div>
                    <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'13%',top:'20%'}}></div>
                    <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'14%',top:'19%'}}></div>
                    <div style={{textAlign:'center',marginTop:'15px'}} className="clisName_box">{val.clisName}</div>
                
            </div>
                )}
                {
                (index+1)%4==3 && (

              
                <div className="width_100 flex_column al_center pos_rel"  data-index="3"  style={{marginBottom:'10px',paddingTop:'100%'}}>
                       
                        <div className="flex_column pos_abs" style={{left:'2%',top:'2%'}}>
                                <div className="flex_row" style={{marginTop:'4px'}}>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                </div>
                                <div className="flex_row" style={{marginTop:'4px'}}>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                </div>
                                <div className="flex_row" style={{marginTop:'4px'}}>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                </div>
                                <div className="flex_row" style={{marginTop:'4px'}}>
                                    <div className="strach">
                                    </div>
                                    <div className="strach">
                                    </div>
                                </div>
                                <div className="flex_row" style={{marginTop:'4px'}}>
                                    <div className="strach">
                                    </div>
                                </div>
                                
                        </div>
                        

                        {/* <div style={{width:'78%',paddingTop:'78%',borderRadius:'50%',position:'absolute',left:'10%',top:'10%',border:'4px solid yellow'}}></div> */}
                        <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',right:'6%',top:'11%'}}></div>
                        <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',right:'6%',top:'9%'}}></div>      
                        <div style={{textAlign:'center'}} className="clisName_box">{val.clisName}</div>
                </div>
                )
            }
            {
                (index+1)%4==0 && (
                <div className="width_100 flex_column al_center pos_rel"  data-index="4"  style={{marginBottom:'10px',paddingTop:'100%'}}>
       
            <div style={{width:'20%',paddingTop:'20%',borderRadius:'50%',position:'absolute',right:'-5%',top:'18%',border:'4px solid #fde004'}}></div>
            <div className="commonBg" style={{width:'80%',paddingTop:'80%',borderRadius:'50%',position:'absolute',left:'0%',top:'20%'}}></div>
            <div onClick={this.gotoDetail.bind(this,val.id, val.clisName)} style={{width:'75%',paddingTop:'75%',borderRadius:'50%',background:'url('+val.clisIcon+') no-repeat center',backgroundSize:'110%',position:'absolute',left:'0%',top:'25%'}}></div>      
                    <div style={{textAlign:'center'}} className="clisName_box">{val.clisName}</div>
            </div>

            )
        }

        {/* <div style={{textAlign:'center'}}>{val.clisName}</div> */}
            </div>
            )
         }else{
            component=(
            <div key={val.id}
             // className="service_box"
            style={{
              
              backgroundColor: 'white',
            }}
          >
            <div onClick={this.gotoDetail.bind(this, val.id,val.clisName)} >
                                    <div className="service_pic_box">
                                        <img style={{ width: '100%', display: 'block' }} src={val.clisPic} />
                                        <div className="service_name">{val.clisName}</div>
                                    </div>
                                    {val.clisPrice ?(
                                        <div className="service_price">
                                            ￥{val.clisPrice}
                                        </div>
                                    ):(
                                        <div className="service_price">
                                        </div>
                                    )
                                     }
            </div>
               
      </div>
        ) 
         }

      return (
          <div  className={this.state.clinicShowType=='01002'?'width_50 flex_wrap':''  }>
                {component}  
          </div>
      )
    }
  
    //列表接口
    getList=(pos=0,count=5,fresh)=>{
      var self=this;
      if(ReactDOM&&ReactDOM.findDOMNode(this.lv)&&ReactDOM.findDOMNode(this.lv).offsetTop){
        var hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
      }else{
        var hei = this.state.height
      }
     
      var param="position="+pos+"&count="+count
      this.state.getClinicServerIteamList(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                      //判断是否是刷新操作
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
                  Toast.fail(obj.resultMsg, 1);
              }
             
  
          })
  
      }
      }).catch(function(){
        Toast.fail("网络错误", 1);
      })
    }
    //跳转到详情页面
    gotoDetail=(id,name)=>{
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", id)
       this.props.history.push('/serviceItems/'+id)
    }
    onRefresh = () => {
      this.setState({ refreshing: true, isLoading: true });
      this.getList(0,5,1)
      // // simulate initial Ajax
      // setTimeout(() => {
      //   this.rData = genData();
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(this.state.data),
      //     refreshing: false,
      //     isLoading: false,
      //   });
      // }, 600);
    };
  
    onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      var self=this;
      console.log('reach end', event);
      this.getList(this.state.data.length)
      // var data=[
      //   {
      //     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      //     title: 'Meet hotel',
      //     des: '不是所有的兼职汪都需要风吹日晒',
      //     id:6
      //   }
      // ]
      // data=this.state.data.concat(data)
      // this.setState({ 
      //   isLoading: true ,
      //   data:data
      // });
      // setTimeout(() => {
      
      //   // this.rData = [...this.rData, ...genData(++pageIndex)];
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(data),
      //     isLoading: false,
      //   });
      //   console.log(this.state)
      // }, 1000);
    
    };
    render() {
      const separator = (sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );
      return (<div>
        
        <ListView
        className={this.state.clinicShowType=="02002"||this.state.clinicShowType=="01002"?' shouldFlexWrap ':'service_box'}
          // style={{
          //   height:'100%',
          //   overflow: 'auto',
          // } 
          // }
          //邻近值为 100 时 调用
          onEndReachedThreshold={100}
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '无更多数据'}
          </div>)}
          renderRow={this._renderRow.bind(this)}
        //   renderSeparator={separator}
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
      </div>);
    }
  }
  export default App