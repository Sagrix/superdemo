import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
// import './css/oswald.css'
// import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class App extends Component {

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '40px' }}
      >
        <Menu.Item key="1">
          <Icon type="home" />
          <span>Home</span>
          <Link to="/"></Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="dashboard" />
          <span>Dashboard</span>
          <Link to="/dashboard"></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="file-text" />
          <span>Preferences</span>
          <Link to="/preferences"></Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="team" />
          <span>Circles</span>
          <Link to="/circles"></Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="unlock" />
          <span>Data Grants</span>
          <Link to="/data-grants"> </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="pie-chart" />
          <span>Provenance</span>
          <Link to="/provenance"></Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="logout" />
          <span>Sign out</span>
          <LogoutButtonContainer />
        </Menu.Item>
      </Menu>
    );

    const OnlyGuestLinks = HiddenOnlyAuth(() => 
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '40px' }}
      >
        <Menu.Item key="1">
          <Icon type="home" />
          <span>Home</span>
          <Link to="/"></Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="safety" />
          <span>Register</span>
          <Link to="/signup"></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="login" />
          <span>Sign in</span>
          <LoginButtonContainer />
        </Menu.Item>
     </Menu>
    );

    return(
      <Layout className="layout" style={{ minHeight: '100vh' }}>

        <Sider trigger={null} breakpoint="lg" collapsible collapsed={this.state.collapsed}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <OnlyAuthLinks />
          <OnlyGuestLinks />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </ Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 450 }}>
              {this.props.children}
            </div>
          </Content>
        
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            Sagrix dAHD ©2018 Created by Sagrix
          </Footer>
        </Layout>
        
      </Layout>
    );
  }

}

export default App
