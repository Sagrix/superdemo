import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'

import '../../App.css'

class Home extends Component {

  render() {
    return (
      <div>
        <h1>dAHD by Sagrix</h1>
        <h3>Patient empowerment platform for Advance Healthcare Directives</h3>
        <Divider />
        <Row gutter={16}>
          <Col span={8}>
            <h4>Take control.</h4>
          </Col>

          <Col span={8}>
            <h4>Choose your substitue decision makers.</h4>
          </Col>

          <Col span={8}>
            <h4>Have full visibility.</h4>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Home
