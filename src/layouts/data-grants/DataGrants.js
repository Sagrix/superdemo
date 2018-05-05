import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
import store from '../../store'
const contract = require('truffle-contract')

import React, { Component } from 'react'
import { Tabs, Icon, notification } from 'antd'
const TabPane = Tabs.TabPane;

import AccessGranted from './AccessGranted'
import AccessExpired from './AccessExpired'
import AccessRevoked from './AccessRevoked'
import DataGrantModal from '../../user/ui/inputmodals/DataGrantModal'


let contractInstance
let userAccount

class DataGrants extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      simpleAHDInstance: null,
      accessList: null,
      addModalVisibility: false
    }

    this.instantiateContract = this.instantiateContract.bind(this)
    this.grantAccess = this.grantAccess.bind(this)
    this.modifyAccess = this.modifyAccess.bind(this)
    this.getFormData = this.getFormData.bind(this)
  }

  componentWillMount() {
    this.instantiateContract()
  }

  instantiateContract() {
    this.web3 = store.getState().web3.web3Instance

    const simpleAHD = contract(SimpleAHDContract)
    simpleAHD.setProvider(this.web3.currentProvider)

    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.setState({account: coinbase})
      console.log(this.state.account)
      userAccount = this.state.account

      simpleAHD.deployed().then(function(instance) {
        // console.log(instance)
        this.setState({simpleAHDInstance: instance})
        contractInstance = this.state.simpleAHDInstance
        
        this.updateAccessList()
      }.bind(this))

    })

  }

  getFormData(name, address, duration) {
    console.log("data grant component: ", address)
    contractInstance.grantDataAccess(address, duration, {from: userAccount})
    .then(result => {
      console.log(result)
      this.updateAccessList()
      notification.open({
        message: 'Granted Access',
        description: `${name} has now been granted data access to your data.`,
        icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
      });
    })
    .catch(err => console.log(err))
  }

  updateAccessList = () => {
    contractInstance.getGrantedUsers({from: userAccount})
    .then((result) => {
      console.log(result)
      let names = result[0]
      let addresses = result[1]
      let durations = result[2]
      let accessInfo = []
      for(let i = 0; i< names.length; i++) {
        if(addresses[i] !== "0x0000000000000000000000000000000000000000") {
          accessInfo.push({
            key: i,
            name: this.web3.toUtf8(names[i]),
            address: addresses[i],
            duration: durations[i]
          })
        }
      }
      this.setState({myAccessInfo: accessInfo})
    })
    .catch(error => console.log(error))
  }

  grantAccess() {
    // console.log("added: ", address)
    this.setState({addModalVisibility: true})
  }

  modifyAccess() {

  }

  render() {
    return(
      <div>
        <h1>Data Grants</h1>
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><Icon type="clock-circle-o" />Active</span>} 
            key="1"
          >
           <AccessGranted accessList={this.state.myAccessInfo} handleAdd={this.grantAccess} />
          </TabPane>

          <TabPane 
            tab={<span><Icon type="clock-circle" />Expired</span>} 
            key="2"
          >
            <AccessExpired />
          </TabPane>

          <TabPane
           tab={<span><Icon type="close-circle" />Revoked</span>} 
           key="3"
          >
            <AccessRevoked />
          </TabPane>
        </Tabs>

        <DataGrantModal visible={this.state.addModalVisibility} getFormData={this.getFormData} />
      </div>
    )
  }

}

export default DataGrants