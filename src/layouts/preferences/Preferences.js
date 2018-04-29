import React, { Component } from 'react'
import { Row, Col } from 'antd'


class Preferences extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <Row>
        <Col span={12} offset={6}>
          <h1>My Healthcare Preferences</h1>
          <h3>Decisions you want made when you are unable to make them yourself.</h3>
        </Col>
      </Row>

    )
  }

}

export default Preferences