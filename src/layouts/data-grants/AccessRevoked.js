import React, { Component } from 'react'
import { DatePicker, Table, Form } from 'antd'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

export default class AccessRevoked extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Revoked Access</h1>
      </div>
    );
  }
}