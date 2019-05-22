
import React from 'react'
import './index.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
       
 
    }  
       
    componentDidMount(){
          
    }
        render() {
                return (
                    <div style={{padding:'20px 12px'}}>
                        <div className="flex_row coupon_box"  style={{alignItems:'stretch',height:'100px'}}>
                            <div className="coupon_left flex_column" style={{width:'120px'}}>
                                <span>￥500</span>
                                <span>满499.00可用</span>
                                <div class="coupon_center flex_column al_center just_content_sb">
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
                            <div className="flex_1 coupon_right flex_column">
                                <span>新人专享满499减50</span>
                                <span>仅限深圳罗湖区使用</span>
                                <span>于12.28日到期</span>
                            </div>
                        </div>
                    </div>
                )
        }
           
        
    }
    export default App