import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableCell from './EditableCell'
// import CircleModal from '../../user/ui/inputmodals/CircleModal'

// import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
// import store from '../../store'
// const contract = require('truffle-contract')


class MyCircle extends Component {

  constructor(props) {
    super(props)

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
          <Popconfirm title="Are you sure?" onConfirm={() => this.onDelete(record.key, record.name, record.address)}>
            <a href="javascript:;">Remove</a>
          </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: props.circleData,
      count: 2,
    };
  }

  componentWillMount() {
    this.fetchCircleMembers()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: nextProps.circleData})
  }

  fetchCircleMembers() {
    this.setState({dataSource: this.props.circleData})
    // console.log(this.state.dataSource)
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

  onDelete = (key, name, address) => {
    console.log(key,":",name,":",address)
    this.props.handleRemove(name, address)
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  /*handleAdd() {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }*/

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return(
      <div>
        <h4>People you trust as substitute decision makers of your health care choices and data grants.</h4>  
        <Button className="editable-add-btn" onClick={this.props.handleAdd}>Add</Button>
        <br/><br/>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    )
  }

}

export default MyCircle