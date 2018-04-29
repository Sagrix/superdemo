import React, { Component } from 'react'
import { Row, Col } from 'antd'


class DataGrants extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <Row>
        <Col>Data</Col>
        <Col>Grants</Col>
      </Row>
    )
  }

}

export default DataGrants