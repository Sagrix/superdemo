import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableCell from './EditableCell'

// import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
// import store from '../../store'
// const contract = require('truffle-contract')


class MemberCircles extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props

    // this.web3 = store.getState().web3.web3Instance
    
    this.columns = 
    [{
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: 'Address',
      dataIndex: 'age',
    }, {
      title: 'Date Joined',
      dataIndex: 'address',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 0 ?
          (
            <Popconfirm title="Are you sure?" onConfirm={() => this.onDelete(record.key)}>
              <a href="javascript:;">Leave</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Jon Snow',
        address: '0xbfc06f089811aec1965e862601e18bb1ba26966d',
      }],
      count: 1,
    };
  }

  fetchData = () => {
    let circleData;
    // TODO
    this.setState({dataSource: circleData})
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }

  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleJoin = () => { // should pop up new address prompt
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return(
      <div>
        <h4>People who have entrusted you as their substitute decision maker.</h4> 
        <Button className="editable-add-btn" onClick={this.handleJoin}>Join</Button>
        <br/><br/>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    )
  }

}

export default MemberCircles