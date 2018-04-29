import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item;


class SignUpFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onSignUpFormSubmit(this.state.name)
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem>
          <Input
            id="name" type="text"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="e.g Sir Toshi"
            value={this.state.name} onChange={this.onInputChange.bind(this)}
          />
          <span className="pure-form-message">This is a required field.</span>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const SignUpForm = Form.create()(SignUpFormComponent)

export default SignUpForm
