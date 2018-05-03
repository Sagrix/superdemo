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

          <h5>Select the minimum number of people within your circle to make major decisions like releasing your data or other cases not covered in the following questions.</h5>

          <Divider />

          {/* <h3>I consent to</h3> */}

          <Form>
            <FormItem label="Medical treatment for the primary purpose of research:">
              <RadioGroup>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="Sterilization that is not medically necessary for the protection of my health:">
              <RadioGroup>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="The removal of tissue from my body while I am living for transplantation to another person:">
              <RadioGroup>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="The removal of tissue from my body while I am living for the purpose of medical education or
medical research:">
              <RadioGroup>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="Do Not Resuscitate (DNR):">
              <RadioGroup>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">Update</Button>
            </FormItem>
          </Form>

        </Col>
      </Row>

    )
  }

}

export default Preferences