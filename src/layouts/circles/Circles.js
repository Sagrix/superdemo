import React, { Component } from 'react'
import { Row, Col } from 'antd'


class Circles extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <Row>
        <Col>My</Col>
        <Col>Circles</Col>
      </Row>
    )
  }

}

export default Circles