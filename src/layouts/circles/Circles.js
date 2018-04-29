import React, { Component } from 'react'
import { Row, Col, Table, Input, Icon, Button, Popconfirm } from 'antd'
import MyCircle from './MyCircle'
import MemberCircles from './MemberCircles'


class Circles extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <div>
        <Row>
          <Col span={12} offset={6}>
            <MyCircle/>
          </Col>
        </Row>

        <Row>
          <Col span={12} offset={6}>
            <h1>Participating Circles</h1>
            <h4>People who have entrusted you as their substitute decision maker.</h4>
          </Col>
        </Row>

        {/* <Row>
          <Col span={12} offset={6}>
            <h1>Forbidden</h1>
            <h4>People who have do not want to make decisions on your behalf.</h4>
          </Col>
        </Row> */}
      </div>
    )
  }

}

export default Circles