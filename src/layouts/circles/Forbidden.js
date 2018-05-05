import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableCell from './EditableCell'

// import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
// import store from '../../store'
// const contract = require('truffle-contract')


class Forbidden extends Component {

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
      dataIndex: 'address',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 0 ?
          (
            <Popconfirm title="Are you sure?" onConfirm={() => this.onDelete(record.key)}>
              <a href="javascript:;">Remove</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King',
        address: '0xfa82ad9a345179a6f7e388dc950406d4daaf3633',
      }, {
        key: '1',
        name: 'Tony Stark',
        address: '0x8f42089586fd4fa149e799f93a6e66c10d9d8ce5',
      }],
      count: 2,
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

  handleAdd = () => {
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
        <h4>People you do not want to make health care decisions and/or grant access to your data on your behalf.</h4>  
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <br/><br/>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    )
  }

}

export default Forbidden