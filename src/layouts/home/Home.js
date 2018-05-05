import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'

import '../../App.css'

class Home extends Component {

  render() {
    return (
      <div>
        <h1>dAHD by Sagrix</h1>
        <h3>Patient empowerment platform for Advance Healthcare Directives.</h3>
        <Divider />
        <Row gutter={16}>
          <Col span={8}>
            <h4>Take control.</h4>
            <p>
            Your health information at your finger tips. Whether you're on your way to doctor's office or travelling worldwide, your health data is always available.
            </p>
          </Col>

          <Col span={8}>
            <h4>Have full visibility and choose your substitue decision makers.</h4>
            <p>
            Sagrix takes the utmost care and responsibility to ensure that your information is private. In terms of viewing ones information, permission is given to next of kin and healthcare professionals. Sagrix ensures that your information is your information.
            </p>
          </Col>
          
          <Col span={8}>
            <h4>How are we building this?</h4>
            <p>
            Our platform is built on the Ethereum blockchain. Our smart contracts log data access to ensure transparency and traceability.
            <br/>
            We see a future where patients have access their health data from any location at any time. Patients will also control who sees this data as well as the quantity they can view.
            <br/>
            We are building a decentralised platform that ensures reliable healthcare data access.
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Home
