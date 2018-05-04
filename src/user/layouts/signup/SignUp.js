import React, { Component } from 'react'
import SignUpFormContainer from '../../ui/signupform/SignUpFormContainer'
import { Row, Col } from 'antd'

class SignUp extends Component {
  render() {
    return(
      <Row justify="center">
        <Col span={12} offset={6}>
          <h1>Register</h1>
          <p>We've got your wallet information, simply input your full name to create an account. No passwords needed here!</p>
          <SignUpFormContainer />
        </Col>
      </Row>
    )
  }
}

export default SignUp
