import React, { Component } from 'react'
import { Row, Col } from 'antd'

import AccessGranted from './AccessGranted'
// import AccessExpired from './AccessExpired'
// import AccessRevoked from './AccessRevoked'


class DataGrants extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <div>
        <Row>
          <Col span={12} offset={6}>
            <AccessGranted />
          </Col>
        </Row>
        
        {/* <Row>
          <Col span={12} offset={6}>
            <AccessExpired />
          </Col>
        </Row>
        
        <Row>
          <Col span={12} offset={6}>
            <AccessRevoked />
          </Col>
        </Row> */}
      </div>
    )
  }

}

export default DataGrants