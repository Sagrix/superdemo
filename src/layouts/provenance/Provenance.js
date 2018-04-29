import React, { Component } from 'react'
import { Row, Col } from 'antd'


class Provenance extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <Row>
        <Col>Data</Col>
        <Col>Provenance</Col>
      </Row>
    )
  }

}

export default Provenance