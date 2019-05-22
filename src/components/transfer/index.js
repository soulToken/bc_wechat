import React, { Component } from 'react';

class App extends React.Component{
        constructor(props) {
            super(props);
           
          }
        componentDidMount(){
          var clinicConfigInfo=JSON.parse(sessionStorage.getItem('clinicConfigInfo'));
          if(clinicConfigInfo){
              if(clinicConfigInfo.isMainClinic==1&&clinicConfigInfo.isManyClinics!="0"){
                window.localStorage.setItem('singleClinic',true)
                this.props.history.replace('/subject')
              }else{
                window.localStorage.setItem('singleClinic',false)
                this.props.history.replace('/single')
              }
          }    
        }
        go=()=>{
          
        }
          render(){
              return null
          }
}
export default App