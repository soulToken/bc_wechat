import React from 'react';
import {getClinicGoodsDetail} from '../../../api/api'
import {Toast} from 'antd-mobile'
import './index.css'
import TechnicalSupport from '../../technicalSupport/index'

class App extends React.Component{
    constructor(props) {
        super(props);
        document.title="商品详情"
        this.state={
            id:this.props.match.params.id,
            goodsImg:'',
            getClinicGoodsDetail:getClinicGoodsDetail,
            goodsIcon:'',
            goodsDetail:''
        }
    }
    componentDidMount() {
        this.getDetail()
    }

    getDetail=()=>{
        var self=this;
        var param="id="+this.state.id
        this.state.getClinicGoodsDetail(param).then(function(res){
            if (res.ok) {
              res.json().then((obj)=> {
                  if(obj.resultCode==="1000"){ 
                            self.setState({
                                goodsImg:obj.result.goodsImg,
                                goodsDetail:obj.result.goodsDetail,
                                goodsIcon:obj.result.goodsIcon
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
    render(){
        return (
            <div>

               <img style={{  width: '100%'}} src={this.state.goodsImg}  alt="" />
                {this.state.goodsDetail ? (
                    <div>
                        <p style={{textAlign:'center'}}>----------商品详情-------------</p>
                            <div    dangerouslySetInnerHTML={{
                        __html: this.state.goodsDetail
                      }}
                       style={
                {
                  paddingLeft:'15px',
                  paddingRight:'15px'
                }
              }
                      
                      >
                      </div>
                    </div>
                       
              ) : ( 
                 <div style={{textAlign:'center',marginTop:'100px'}}>
                 
                            {this.state.show ? (
                                <div style={{textAlign:'center',marginTop:'100px'}}>
                                暂无相关数据
                              </div>
                                
                          ) : ( 
                            <div style={{textAlign:'center',marginTop:'100px'}}>
                          
                               </div>
                            
                          )}
                 
                 </div>
              )}
                <TechnicalSupport history={this.props.history}></TechnicalSupport>
              </div>
              
           
        )
    }
}
export default App