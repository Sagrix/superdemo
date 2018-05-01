import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
import MyCircle from './MyCircle'
import MemberCircles from './MemberCircles'
import Forbidden from './Forbidden'
const TabPane = Tabs.TabPane;


class Circles extends Component {

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
            tab={<span><Icon type="heart" />My Circle</span>} 
            key="1"
          >
           <MyCircle />
          </TabPane>

          <TabPane 
            tab={<span><Icon type="usergroup-add" />Member Circles</span>} 
            key="2"
          >
            <MemberCircles />
          </TabPane>

          <TabPane
           tab={<span><Icon type="usergroup-delete" />Forbidden</span>} 
           key="3"
          >
            <Forbidden />
          </TabPane>
        </Tabs>
      </div>
    )
  }

}

export default Circles