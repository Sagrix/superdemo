import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
const TabPane = Tabs.TabPane;

import AccessGranted from './AccessGranted'
import AccessExpired from './AccessExpired'
import AccessRevoked from './AccessRevoked'


class DataGrants extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <div>
        <h1>Circles</h1>
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><Icon type="clock-circle-o" />Active</span>} 
            key="1"
          >
           <AccessGranted />
          </TabPane>

          <TabPane 
            tab={<span><Icon type="clock-circle" />Expired</span>} 
            key="2"
          >
            <AccessExpired />
          </TabPane>

          <TabPane
           tab={<span><Icon type="close-circle" />Revoked</span>} 
           key="3"
          >
            <AccessRevoked />
          </TabPane>
        </Tabs>
      </div>
    )
  }

}

export default DataGrants