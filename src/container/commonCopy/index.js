import React, { Component } from 'react';
import './index.css'
//妇科的主页组件
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: 0};
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
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
    click(){
        console.log("惦记我")
        debugger;
    }
   
      render() {
        var userMessage;
        if (this.props.myNumber) {
          userMessage = (
            <span>
           
              <p onClick={this.click.bind(this)}>You can visit settings to reset your password</p>
            </span>
          )
        } else {
          userMessage = (
            <h2 onClick={this.click.bind(this)}>Hey man! Sign in to see this section</h2>
          )
        }
        return (
          <div>
              {userMessage  }
            <h3>{this.props.myNumber}</h3>
          </div>
        );
      }
  }
  export default Content