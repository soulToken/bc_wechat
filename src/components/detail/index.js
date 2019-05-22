import React from 'react';
import { DatePicker, List,Toast } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import {uploadPicture} from '../../api/api'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];

class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state={
      files:data,
      uploadPicture:uploadPicture
    }
  }
  handleSubmit(event) {
    debugger;
    event.preventDefault();
  
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }
  onChange = (files, type, index) => {
    // if(files.length>0){
    //  
    // }
    var files=files[files.length-1]
    let formData = new FormData()
    formData.append('image', files.file)
    this.state.uploadPicture(formData).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              
              
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
 
  
    console.log(files, type, index);
    this.setState({
      files:[files]
    });
  }
  render() {
    const { files } = this.state;
    return (

      <div>
        <WingBlank>
        
        <ImagePicker
          files={files}
          onChange={this.onChange}
          selectable={files.length < 5}
          multiple={this.state.multiple}
        />
      </WingBlank>

      </div>
    
    );
  }
}
export default ImagePickerExample