import React from 'react';
import nodata from '../../static/images/common/no_data.png'
import './index.css'
import TechnicalSupport from '../technicalSupport/index'
class technicalSupport  extends React.Component {
    constructor(props) {
     
        super(props);
          this.state = {
          
         
    }
  } 
    componentDidMount(){
      
    }
    goWeb=()=>{
        
    }
  render() {
    return (
        <div className="flex_column al_center" style={{paddingBottom:'20px',paddingTop:'20px'}}>
                <img src={nodata} style={{width:'50%'}} />
               <span style={{marginTop:'15px'}}>暂未相关数据</span> 
               <TechnicalSupport history={this.props.history}></TechnicalSupport>
        </div>
    );
  }
}
export default technicalSupport