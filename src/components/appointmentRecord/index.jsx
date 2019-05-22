import React from 'react';
import nodata from '../../static/svg/no_data.svg'
import { getDay } from '../../util/index'
import { Toast } from 'antd-mobile'
import { getAppointmentList ,updateAppointmentStatus} from '../../api/api'
import { getDateArr } from '../../util/index'
import './index.css'
import phoneIcon from '../../static/images/dian_hua_copy.png'


class appointmentRecord extends React.Component {
  constructor(props) {
    super(props);
    document.title = "预约记录";

    this.state = {
      appointmentDate:[],
      chooseItem: null,
      allAppointmentList: [],//总体预约的list
      getDateArr: getDateArr,
      getAppointmentList:getAppointmentList,
      updateAppointmentStatus:updateAppointmentStatus,
    };

  }

  componentDidMount() {
    //获取医生预约列表
    this.getAppointmentList()
  }

  getAppointmentList=() => {
    var self=this;
    this.state.getAppointmentList().then(function (res) {
      if (res.ok) {
        res.json().then((obj) => {
          if (obj.resultCode === "1000") {
            Toast.hide()
            var newData=self.state.allAppointmentList.concat(obj.result);

            self.setState({
              allAppointmentList:newData,
              chooseItem:newData[0],
              appointmentDate:self.state.getDateArr(7,newData[0].date)
            })
          } else {
            Toast.hide()
            Toast.fail(obj.resultMsg, 1);
          }
        })

      }
    }).catch(function () {
      Toast.hide()
      Toast.fail("网络错误", 1);
    })
  }


  chooseCurrentDate = (item, index) => {
    this.setState({
      chooseItem:this.state.allAppointmentList[index],
    })
  }

  // 确认完成
  confirmDone(id) {

    var self=this;
    var param="id="+ id + "&appoinmentStatus=4"
    this.state.updateAppointmentStatus(param).then(function (res) {
      if (res.ok) {
        res.json().then((obj) => {
          if (obj.resultCode === "1000") {
            Toast.hide()
            self.state.chooseItem.appointmentList.forEach(function(eachItem){
                
                if (eachItem.id == id) {
                  let index = self.state.chooseItem.appointmentList.indexOf(eachItem)
                  eachItem.appointmentStatus = "4"
                  self.state.chooseItem.appointmentList[index] = eachItem
                }
             })
             self.forceUpdate();

          } else {
            Toast.hide()
            Toast.fail(obj.resultMsg, 1);
          }
        })

      }
    }).catch(function () {
      Toast.hide()
      Toast.fail("网络错误", 1);
    })
  }
  // 打电话给用户
  callUser = (phoneNum) => {
    if (!phoneNum) {
      Toast.info('暂无联系方式 !!!', 1);
      return
  } 
  window.location.href = 'tel://' + phoneNum;
  }
  render() {
    
    return (
    // {/* 头部时间选择  */}
      <div>
        <div className="appointMentRecord_content">
          <div className="appointMentRecord_bottom">
            {this.state.appointmentDate.map((item, index) => (
              <div
                key={index}
                className={
                  this.state.allAppointmentList.indexOf(this.state.chooseItem) == index ? "date_1" : "date_box"
                }
                onClick={this.chooseCurrentDate.bind(this, item, index)}
              >
                <span className="f_10">{item.valye}</span>
                <div className="f_16">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 预约人数 取消预约人数展示 */}
        <div className="appointMentRecord_count" >
        
          <div className="appointMentRecord_totalCount">预约总数:{this.state.chooseItem ? this.state.chooseItem.total : 0 }人</div>
          <div className="appointMentRecord_cancelCount">取消预约:{this.state.chooseItem ? this.state.chooseItem.cacel: 0}人</div>
        </div>
        {/* 具体展示预约详情 */}
       
          <div>

            {this.state.chooseItem ? (
              <div>
                {this.state.chooseItem.appointmentList.map((item, index) => (

                  <div key={index} className="order_box">
                    <div className="order_detail">
                      <div className="order_detail_bottom" >
                        <div className="order_detail_bottom_right">

                          <div>姓名：{item.appointmentName}</div>
                          <div>性别：{item.appointmentSex == 1 ? '男' : '女'}</div>
                          <div>电话：{item.appointmentMobile}</div>
                          <div>预约时间：{item.appointmentDate} {getDay(item.appointmentDate)} {item.appointmentTime}</div>
                          <div>预约项目：{item.appointmentServeritem ? item.appointmentServeritem : '默认项目'}</div>
                          <div>预约医生：{item.doctorName ? item.doctorName : '默认医生'}</div>
                          {item.symptomSelect &&
                            <div>症   状：{item.symptomSelect}</div>
                          }
                          {item.symptomDesc &&
                            <div>病情描述：{item.symptomDesc}</div>
                          }
                            {item.paymentAmount &&
                            <div>支付费用：{item.paymentAmount}元</div>
                          }
                          {item.paymentId &&
                            <div>支付单号：{item.paymentId}</div>
                          }
                        </div>
                        {/* 1:成功,,4:取消预约,5:预约成功 */}
                        {/* 预约成功展示确认完成按钮 */}
                        {item.appointmentStatus == 5 &&
                            <div className="appointMent_detail_top_right" onClick={this.confirmDone.bind(this, item.id)}>确认完成</div>
                          }
    
                        <img src={phoneIcon} className="appointMent_call" onClick={this.callUser.bind(this, item.appointmentMobile)} />
                        {/* 预约取消 */}
                        {item.appointmentStatus == 4 &&
                            <div className="appointMent_order_status" >取消预约</div>
                          }
                          {/* 预约完成 */}
                        {item.appointmentStatus == 1 &&
                            <div className="appointMent_order_status" >已经完成</div>
                          }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div>
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                      <img src={nodata} />
                      <p>暂无数据</p>
                    </div>
                  
                </div>
              )}
          </div>
        </div>
        
    );
  }
}
export default appointmentRecord;
