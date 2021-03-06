import React, { Component } from 'react'
import { DatePicker, Table, Input, Form, Popconfirm, Button } from 'antd'
import EditableCell from './EditableCell'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;


const data = [
  {
    key: 0,
    name: 'Ryan McDonald',
    address: '0x3c65d654efe788bfc1298acdbbaef92300aadc46'
  }, {
    key: 1,
    name: 'Pierre Bleu',
    address: '0xa17592300aadcd65f64264aced2e788bdbbaefe9'
  }
];

// for (let i = 0; i < 7; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     address: `London Park no. ${i}`,
//     duration: `${Math.round(12 - (Math.random()-i))} days ago`,
//   });
// }



export default class AccessRevoked extends Component {
  
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>Remove</a>
            }
          </div>
        );
      },
    }];
    this.state = { data }
    this.cacheData = data.map(item => ({ ...item }))
  }


  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  render() {
    return (
      <div>
        <h4>People who will not have permission to view your personal health care data.</h4>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <br/><br/>
        <Table bordered dataSource={this.state.data} columns={this.columns} />
      </div>
    );
  }
}