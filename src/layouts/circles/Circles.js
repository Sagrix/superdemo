import React, { Component } from 'react'
import { Row, Col } from 'antd'
import MyCircle from './MyCircle'
import MemberCircles from './MemberCircles'
import Forbidden from './Forbidden'


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
            <MyCircle />
          </Col>
        </Row>

        <Row>
          <Col span={12} offset={6}>
            <MemberCircles />
          </Col>
        </Row>

        <Row>
          <Col span={12} offset={6}>
            <Forbidden />
          </Col>
        </Row>
      </div>
    )
  }

}

export default Circles