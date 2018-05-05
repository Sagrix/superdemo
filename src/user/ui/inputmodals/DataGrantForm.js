import React, { Component } from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;

class DataGrant extends Component {
  constructor(props) {
    super(props)
  }

  returnData = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(Object.keys(values).map(i => console.log(values[i])))
        this.props.handleUpdate(values['name'], values['address'], values['duration'])
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    
    return (
      <Form layout="horizontal" onSubmit={this.returnData}>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter their name!' }],
          })(
            <Input placeholder="e.g. Sir Toshi" />
          )}
        </FormItem>
        <FormItem label="Address:">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter their address!' }],
          })(
            <Input placeholder="0xabcdef123456abcdef123456abcdef123456abcd" />
          )}
        </FormItem>
        <FormItem label="Duration:">
          {getFieldDecorator('duration', {
            rules: [{ type: 'array', required: true, message: 'Please select a date!' }],
          })(
            <RangePicker />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Add</Button>
        </FormItem>
      </Form>
    )
  }
}

const DataGrantForm = Form.create()(DataGrant)
export default DataGrantForm