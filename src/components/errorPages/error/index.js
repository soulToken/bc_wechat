
import React from 'react'


class App extends React.Component {
    constructor(props) {
        super(props)
        window.history.replaceState({},null,window.location.href.split('?')[0])
 
    }  
       
    componentDidMount(){
          
    }
        render() {
                return (
                    <div style={{marginTop:'150px',textAlign: 'center'}}>请在公众号中访问该项目</div>
                )
        }
           
        
    }
    export default App