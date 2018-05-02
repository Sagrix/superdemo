import React, { Component } from 'react'
import { Row, Col, Divider, Form, InputNumber, Button, Radio } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class Preferences extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  onChange(value) {
    console.log('changed', value);
    // call smart contract function- setRequiredVotes
  }
  

  render() {
    return(
      <Row>
        <Col span={12} offset={6}>
          <h1>My Healthcare Preferences</h1>
          <h3>Decisions you want made on your behalf when you are unable to make them for yourself.</h3>
          
          <Divider />

          <Form layout="inline">
            <FormItem label="Min. Votes Required">
              <InputNumber min={1} max={10} defaultValue={3} onChange={this.onChange} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Update</Button>
            </FormItem>
          </Form>

          <Divider />

          <Form>
            <FormItem label="Medical treatment for the primary purpose of research:">
              <RadioGroup>
                <Radio value="a">Yes</Radio>
                <Radio value="b">No</Radio>
              </RadioGroup>
            </FormItem>
          </Form>

        </Col>
      </Row>

    )
  }

}

export default Preferences