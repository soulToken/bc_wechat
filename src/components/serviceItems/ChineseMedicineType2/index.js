import React, { Component } from 'react';
import { Flex, WhiteSpace, Modal, List, Button, Toast, Card, Carousel, WingBlank } from 'antd-mobile';
import './index.css'
//引用的图片
import right_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/right_arrow.png'
import bottom_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_bottom.png'
import top_arrow from '../../../static/images/home/toobar/ChineseMedicineType2/home/new_top.png'

//妇科的主页组件
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            currentIndex: 0
        };

    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')

    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
        //   console.log(this.props.state.goodsList.length<this.props.state.goodsTotal)


    }
    componentWillUnmount() {


    }
    gotoDetail(id, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", id)
        this.props.history.push('/serviceItems/' + id)
    }
    gotoDetail2(id, e, name) {
        sessionStorage.setItem("clisName", name)
        sessionStorage.setItem("serverId", e)
        this.props.history.push('/serviceItems/' + id + "?type=1")
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
    render() {
        
        return (
            <div>
                
        
                {
                    this.props.state.serviceList.map((val, index) => (

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
                    ))}
            </div>
        );
    }
}
export default Content