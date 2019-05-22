import React from 'react';
import {Toast ,Button} from 'antd-mobile';
import {getClinicServerIteamDetail,getSubServerIteamDetail} from '../../../api/api'
import './index.css'
import {GetRequest} from '../../../util/index'
import TechnicalSupport from '../../technicalSupport/index'
class ImagePickerExample extends React.Component {
    constructor(props) {
      document.title="服务详情"
        super(props);
          this.state = {
            getClinicServerIteamDetail:getClinicServerIteamDetail,
            getSubServerIteamDetail:getSubServerIteamDetail,
            id:this.props.match.params.id,
            result:null,
            clisPic:null,
            serverId:null,
            clisName:null,
            show:false,
         
    }
  } 
    componentDidMount(){
        
       if(GetRequest(this.props.location.search)&&GetRequest(this.props.location.search).type){ 
            this.getDetail2()
       }else{
            this.getDetail()
       }
      
      
    }
    getDetail=()=>{
      var self=this;
      var param="id="+this.state.id;
      Toast.loading('Loading...', 0, () => {
        
      });
      this.state.getClinicServerIteamDetail(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
            Toast.hide()
              if(obj.resultCode==="1000"){ 
                      //判断是否是刷新操作
                   self.setState({
                      result:obj.result.serverDetail||obj.result.serverDetail,
                      show:true,
                      clisPrice:obj.result.clisPrice||obj.result.serverPrice,
                      clisPic:obj.result.clisPic||obj.result.serverImg,
                      clisName:obj.result.clisName||obj.result.serverName,
                      serverId:obj.result.id||obj.result.serverId
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
    getDetail2=()=>{
        var self=this;
        var param="id="+this.state.id;
        Toast.loading('Loading...', 0, () => {
          
        });
        this.state.getSubServerIteamDetail(param).then(function(res){
          if (res.ok) {
            res.json().then((obj)=> {
              Toast.hide()
                if(obj.resultCode==="1000"){ 
                        //判断是否是刷新操作
                     self.setState({
                        result:obj.result.serverDetail||obj.result.serverDetail,
                        show:true,
                        clisPrice:obj.result.clisPrice||obj.result.serverPrice,
                        clisPic:obj.result.clisPic||obj.result.serverImg,
                        clisName:obj.result.clisName||obj.result.serverName,
                        serverId:obj.result.id||obj.result.serverId
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
    goOn=(name,id)=>{
        localStorage.removeItem("medicalMessage")
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", id)
        sessionStorage.setItem("clisPrice",this.state.clisPrice?this.state.clisPrice:'');
        this.props.history.push("/onlineBook")
    }
  render() {
    return (

      <div>

           <img style={{  width: '100%'}} src={this.state.clisPic}  alt="" />
           {this.state.clisPrice ? (
              <div style={{color:'red',fontSize:'20px',marginTop:'5px',textIndent:'20px'}}>￥{this.state.clisPrice}</div>
           ):(
            <div style={{color:'red',fontSize:'20px',marginTop:'5px',textIndent:'20px'}}></div>
           )
        }
           {this.state.clisName && (
              <div style={{fontSize:'20px',marginTop:'5px',textIndent:'20px'}}>{this.state.clisName}</div>
           )}

           <div style={
        {
          paddingLeft:'15px',
          paddingRight:'15px',
          paddingBottom:'50px'
        }
      }>

        {this.state.result ? (
            <div>
               <p className="center_p">---服务内容详情---</p>
               <div    dangerouslySetInnerHTML={{
                __html: this.state.result
              }}>
              </div>
            </div>
              
      ) : ( 
         <div style={{textAlign:'center',marginTop:'100px'}}>
               
                    {this.state.show ? (
                        <div style={{textAlign:'center',marginTop:'100px'}}>
                        暂无相关详情数据
                      </div>
                        
                  ) : ( 
                    <div style={{textAlign:'center',marginTop:'100px'}}>
                  
                       </div>
                    
                  )}
         
         </div>
      )}

         <TechnicalSupport history={this.props.history}></TechnicalSupport>
      </div>
      <div style={{textAlign:'center',marginTop:'20px',color:'blue',position:'fixed',bottom:'0',left:'0',width:'100%'}} onClick={this.goOn.bind(this,this.state.clisName,this.state.serverId)}>
        <Button type="primary" style={{width:'100%'}}>
            立即预约
        </Button>
      </div>
        
     

      </div>
     
    );
  }
}
export default ImagePickerExample