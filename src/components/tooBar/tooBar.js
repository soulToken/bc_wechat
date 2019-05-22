
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import * as apis from '../../api/api';
import Login from '../login';
import { HashRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import './tooBar.css';
//引入背景图
// import home1 from '../../static/svg/homepage_home_1.svg';
// import home1Select from '../../static/svg/homepage_home.svg';
// import home2 from '../../static/svg/homepage_preconditioning_1.svg';
// import home2Select from '../../static/svg/homepage_preconditioning.svg';
// import home3 from '../../static/svg/homepage_personal_1.svg'
// import home3Select from '../../static/svg/homepage_personal.svg'
import home from '../../static/images/home/toobar/home.png'
import appointment from '../../static/images/home/toobar/appointment.png'
import person from '../../static/images/home/toobar/person.png'
import home_checked from '../../static/images/home/toobar/home_checked.png'
import appointment_checked from '../../static/images/home/toobar/appointment_checked.png'
import person_checked from '../../static/images/home/toobar/person_checked.png'
import home1_checked from '../../static/images/home/toobar/home1_checked.png'
import appointment1_checked from '../../static/images/home/toobar/appointment1_checked.png'
import person1_checked from '../../static/images/home/toobar/person1_checked.png'
//妇科底部样式
import type3home from '../../static/images/home/toobar/gynaecology/home.png'
import type3home1 from '../../static/images/home/toobar/gynaecology/home1.png'
import type3appointment from '../../static/images/home/toobar/gynaecology/appointment.png'
import type3appointment1 from '../../static/images/home/toobar/gynaecology/appointment1.png'
import type3my from '../../static/images/home/toobar/gynaecology/my.png'
import type3my1 from '../../static/images/home/toobar/gynaecology/my1.png'
//中医第二版本样式
import type4home from '../../static/images/home/toobar/ChineseMedicineType2/home.png'
import type4appointment from '../../static/images/home/toobar/ChineseMedicineType2/appointment.png'
import type4my from '../../static/images/home/toobar/ChineseMedicineType2/person.png'
//祛痘第一版UI 底部图片
import type5home from '../../static/images/home/toobar/acne/homepage_home@3x.png'
import type5appointment from '../../static/images/home/toobar/acne/homepage_preconditioning@3x.png'
import type5my from '../../static/images/home/toobar/acne/homepage_personal@3x.png'
//牙科第二个版本UI显示
import type6home from '../../static/images/home/toobar/toothType2/homepage_home@3x.png'
import type6appointment from '../../static/images/home/toobar/toothType2/homepage_preconditioning@3x.png'
import type6my from '../../static/images/home/toobar/toothType2/homepage_personal@3x.png'

//盲人按摩第一个版本得UI显示
import type7home from '../../static/images/blind/toobar/homepage_home@3x.png'
import type7appointment from '../../static/images/blind/toobar/homepage_preconditioning@3x.png'
import type7my from '../../static/images/blind/toobar/homepage_personal@3x.png'
//牙科第三个版本UI显示
import type8home from '../../static/images/home/toobar/toothType3/homepage_home@3x.png'
import type8appointment from '../../static/images/home/toobar/toothType3/homepage_preconditioning@3x.png'
import type8my from '../../static/images/home/toobar/toothType3/homepage_personal@3x.png'

const Home = (props) => (
  <div>
    <h2>Home</h2>

  </div>
);
const remove = (props) => {
  localStorage.removeItem("login");
}
const My = () => (
  <div>
    <h2>我的页面</h2>
    <button onClick={
      remove
    }><Link to="/">推出登陆</Link></button>
  </div>
);
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    var clinicShowType = sessionStorage.getItem("clinicShowType");
    this.state = {
      selectedTab: 'redTab',
      hidden: this.props.history.location.pathname === '/single'||this.props.history.location.pathname === '/' || this.props.history.location.pathname === '/appointment' || this.props.history.location.pathname === '/my' ? false : true,
      fullScreen: false,
      history: this.props.history,
      clinicShowType:clinicShowType||''
    };

  }
  render() {
        var toobar;
         if(this.state.clinicShowType==1){

            toobar=(
                <TabBar
                unselectedTintColor="#979797"
                tintColor="#FAA037"
                barTintColor="white"
                tabBarPosition="bottom"
                // noRenderContent="true"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="首页"
                  key="Life"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+home1_checked+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                  // badge={1}
                  onPress={() => {
                    this.state.history.push("/")
                  }}
                  data-seed="logId"
                >
                  {/* {this.renderContent('Life')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+appointment1_checked+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  title="我的预约"
                  key="Friend"
                  // dot
                  selected={this.state.history.location.pathname === '/appointment'}
                  onPress={() => {
                    this.state.history.push("/appointment")
                  }}
                >
                  {/* {this.renderContent('Friend')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: person}}
                  selectedIcon={{ uri: person1_checked }}
                  title="我的"
                  key="my"
                  selected={this.state.history.location.pathname === '/my'}
                  onPress={() => {
                    this.state.history.push("/my")
      
                  }}
                >
                  {/* {this.renderContent('My')} */}
                </TabBar.Item>
              </TabBar>
            )
        }else if(this.state.clinicShowType==="2"||this.state.clinicShowType===2){
            toobar=(
                <TabBar
                unselectedTintColor="#979797"
                tintColor="#FF99F7"
                barTintColor="white"
                tabBarPosition="bottom"
                // noRenderContent="true"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="首页"
                  key="Life"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type3home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type3home1+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                  // badge={1}
                  onPress={() => {
                    this.state.history.push("/")
                  }}
                  data-seed="logId"
                >
                  {/* {this.renderContent('Life')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+type3appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+type3appointment1+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  title="我的预约"
                  key="Friend"
                  // dot
                  selected={this.state.history.location.pathname === '/appointment'}
                  onPress={() => {
                    this.state.history.push("/appointment")
                  }}
                >
                  {/* {this.renderContent('Friend')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: type3my}}
                  selectedIcon={{ uri: type3my1 }}
                  title="我的"
                  key="my"
                  selected={this.state.history.location.pathname === '/my'}
                  onPress={() => {
                    this.state.history.push("/my")
      
                  }}
                >
                  {/* {this.renderContent('My')} */}
                </TabBar.Item>
              </TabBar>
            )
        }else if(this.state.clinicShowType=="02002"){
            toobar=(
                <TabBar
                unselectedTintColor="#979797"
                tintColor="#00708e"
                barTintColor="white"
                tabBarPosition="bottom"
                // noRenderContent="true"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="首页"
                  key="Life"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type3home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type4home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                  // badge={1}
                  onPress={() => {
                    this.state.history.push("/")
                  }}
                  data-seed="logId"
                >
                  {/* {this.renderContent('Life')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+type4appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  title="我的预约"
                  key="Friend"
                  // dot
                  selected={this.state.history.location.pathname === '/appointment'}
                  onPress={() => {
                    this.state.history.push("/appointment")
                  }}
                >
                  {/* {this.renderContent('Friend')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: type3my}}
                  selectedIcon={{ uri: type4my}}
                  title="我的"
                  key="my"
                  selected={this.state.history.location.pathname === '/my'}
                  onPress={() => {
                    this.state.history.push("/my")
      
                  }}
                >
                  {/* {this.renderContent('My')} */}
                </TabBar.Item>
              </TabBar>
            )
        }else if(this.state.clinicShowType=='03001'){
            toobar=(
                <TabBar
                unselectedTintColor="#979797"
                tintColor="#5c9908"
                barTintColor="white"
                tabBarPosition="bottom"
                // noRenderContent="true"
                hidden={this.state.hidden}
              >
                <TabBar.Item
                  title="首页"
                  key="Life"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type3home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url('+type5home+') center center /  21px 21px no-repeat'
                  }}
                  />
                  }
                  selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                  // badge={1}
                  onPress={() => {
                    this.state.history.push("/")
                  }}
                  data-seed="logId"
                >
                  {/* {this.renderContent('Life')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+type3appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url('+type5appointment+') center center /  21px 21px no-repeat'
                    }}
                    />
                  }
                  title="我的预约"
                  key="Friend"
                  // dot
                  selected={this.state.history.location.pathname === '/appointment'}
                  onPress={() => {
                    this.state.history.push("/appointment")
                  }}
                >
                  {/* {this.renderContent('Friend')} */}
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: type3my}}
                  selectedIcon={{ uri: type5my }}
                  title="我的"
                  key="my"
                  selected={this.state.history.location.pathname === '/my'}
                  onPress={() => {
                    this.state.history.push("/my")
      
                  }}
                >
                  {/* {this.renderContent('My')} */}
                </TabBar.Item>
              </TabBar>
            )}else if(this.state.clinicShowType==='01002'){
                toobar=(
                    <TabBar
                    unselectedTintColor="#979797"
                    tintColor="#a72eef"
                    barTintColor="white"
                    tabBarPosition="bottom"
                    // noRenderContent="true"
                    hidden={this.state.hidden}
                  >
                    <TabBar.Item
                      title="首页"
                      key="Life"
                      icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type3home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type6home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                      // badge={1}
                      onPress={() => {
                        this.state.history.push("/")
                      }}
                      data-seed="logId"
                    >
                      {/* {this.renderContent('Life')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type3appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      selectedIcon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type6appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      title="我的预约"
                      key="Friend"
                      // dot
                      selected={this.state.history.location.pathname === '/appointment'}
                      onPress={() => {
                        this.state.history.push("/appointment")
                      }}
                    >
                      {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={{ uri: type3my}}
                      selectedIcon={{ uri: type6my }}
                      title="我的"
                      key="my"
                      selected={this.state.history.location.pathname === '/my'}
                      onPress={() => {
                        this.state.history.push("/my")
          
                      }}
                    >
                      {/* {this.renderContent('My')} */}
                    </TabBar.Item>
                  </TabBar>
                )
            }
            else if(this.state.clinicShowType==='01003'){
                toobar=(
                    <TabBar
                    unselectedTintColor="#979797"
                    tintColor="#99d5ff"
                    barTintColor="white"
                    tabBarPosition="bottom"
                    // noRenderContent="true"
                    hidden={this.state.hidden}
                  >
                    <TabBar.Item
                      title="首页"
                      key="Life"
                      icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type3home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type8home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                      // badge={1}
                      onPress={() => {
                        this.state.history.push("/")
                      }}
                      data-seed="logId"
                    >
                      {/* {this.renderContent('Life')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type3appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      selectedIcon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type8appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      title="我的预约"
                      key="Friend"
                      // dot
                      selected={this.state.history.location.pathname === '/appointment'}
                      onPress={() => {
                        this.state.history.push("/appointment")
                      }}
                    >
                      {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={{ uri: type3my}}
                      selectedIcon={{ uri: type8my }}
                      title="我的"
                      key="my"
                      selected={this.state.history.location.pathname === '/my'}
                      onPress={() => {
                        this.state.history.push("/my")
          
                      }}
                    >
                      {/* {this.renderContent('My')} */}
                    </TabBar.Item>
                  </TabBar>
                )}
            
            else if(this.state.clinicShowType==='04001'){
                toobar=(
                    <TabBar
                    unselectedTintColor="#979797"
                    tintColor="#a67b58"
                    barTintColor="white"
                    tabBarPosition="bottom"
                    // noRenderContent="true"
                    hidden={this.state.hidden}
                  >
                    <TabBar.Item
                      title="首页"
                      key="Life"
                      icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type3home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+type7home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                      // badge={1}
                      onPress={() => {
                        this.state.history.push("/")
                      }}
                      data-seed="logId"
                    >
                      {/* {this.renderContent('Life')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type3appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      selectedIcon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+type7appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      title="我的预约"
                      key="Friend"
                      // dot
                      selected={this.state.history.location.pathname === '/appointment'}
                      onPress={() => {
                        this.state.history.push("/appointment")
                      }}
                    >
                      {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={{ uri: type3my}}
                      selectedIcon={{ uri: type7my }}
                      title="我的"
                      key="my"
                      selected={this.state.history.location.pathname === '/my'}
                      onPress={() => {
                        this.state.history.push("/my")
          
                      }}
                    >
                      {/* {this.renderContent('My')} */}
                    </TabBar.Item>
                  </TabBar>
                )
            }
            
            else{
                toobar=( <TabBar
                    unselectedTintColor="#979797"
                    tintColor="#0381FF"
                    barTintColor="white"
                    tabBarPosition="bottom"
                    // noRenderContent="true"
                    hidden={this.state.hidden}
                  >
                    <TabBar.Item
                      title="首页"
                      key="Life"
                      icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+home+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url('+home_checked+') center center /  21px 21px no-repeat'
                      }}
                      />
                      }
                      selected={this.state.history.location.pathname === '/'||this.state.history.location.pathname === '/single'}
                      // badge={1}
                      onPress={() => {
                        this.state.history.push("/")
                      }}
                      data-seed="logId"
                    >
                      {/* {this.renderContent('Life')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+appointment+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      selectedIcon={
                        <div style={{
                          width: '22px',
                          height: '22px',
                          background: 'url('+appointment_checked+') center center /  21px 21px no-repeat'
                        }}
                        />
                      }
                      title="我的预约"
                      key="Friend"
                      // dot
                      selected={this.state.history.location.pathname === '/appointment'}
                      onPress={() => {
                        this.state.history.push("/appointment")
                      }}
                    >
                      {/* {this.renderContent('Friend')} */}
                    </TabBar.Item>
                    <TabBar.Item
                      icon={{ uri: person}}
                      selectedIcon={{ uri: person_checked }}
                      title="我的"
                      key="my"
                      selected={this.state.history.location.pathname === '/my'}
                      onPress={() => {
                        this.state.history.push("/my")
          
                      }}
                    >
                      {/* {this.renderContent('My')} */}
                    </TabBar.Item>
                  </TabBar>)
          
        }
        
          

    return (
    //   <div>
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0, zIndex: '3' ,background:'#fff'}}>
        {toobar}
      </div>
   
    );
  }
}
export default withRouter(TabBarExample)