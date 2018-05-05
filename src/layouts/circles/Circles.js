import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
import store from '../../store'
const contract = require('truffle-contract')

import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
import MyCircle from './MyCircle'
import MemberCircles from './MemberCircles'
import Forbidden from './Forbidden'
import CircleModal from '../../user/ui/inputmodals/CircleModal'
const TabPane = Tabs.TabPane;

let contractInstance
let userAccount

class Circles extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      simpleAHDInstance: null,
      myCircle: null,
      memberCircles: null,
      forbidden: null,
      addModalVisibility: false
    }

    this.instantiateContract = this.instantiateContract.bind(this)
    this.addToCircle = this.addToCircle.bind(this)
    this.removeFromCircle = this.removeFromCircle.bind(this)
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
        // console.log(this.state.simpleAHDInstance)
        // simpleAHDInstance = instance
        // console.log(simpleAHDInstance)

        contractInstance.getCircleMembers({from: coinbase})
        .then((result) => {
          console.log(result)
          let names = result[0]
          let addresses = result[1]
          let circleInfo = []
          for(let i = 0; i< names.length; i++) {
            circleInfo.push[{
              key: i,
              name: names[i],
              address: addresses[i]
            }]
          }
          // return result['c'][0]
          this.setState({myCircleInfo: circleInfo})
        })
        .catch((error) => {
          console.log(error)
        })
      }.bind(this))

    })

    // this.setState({simpleAHDInstance: instance})
  }

  getFormData(name, address) {
    console.log("circle component: ", address)
    contractInstance.addToCircle(address, {from: userAccount})
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
  }

  addToCircle(address) {
    console.log("added: ", address)
    this.setState({addModalVisibility: true})
  }

  removeFromCircle(address) {
    console.log('removed: ', address)
  }

  render() {
    return(
      <div>
        <h1>Circles</h1>
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><Icon type="heart" />My Circle</span>} 
            key="1"
          >
           <MyCircle circleData={this.state.myCircleInfo} handleAdd={this.addToCircle} hadleRemove={this.removeFromCircle} />
          </TabPane>

          <TabPane 
            tab={<span><Icon type="usergroup-add" />Member Circles</span>} 
            key="2"
          >
            <MemberCircles />
          </TabPane>

          <TabPane
           tab={<span><Icon type="usergroup-delete" />Forbidden</span>} 
           key="3"
          >
            <Forbidden />
          </TabPane>
        </Tabs>

        <CircleModal visible={this.state.addModalVisibility} getFormData={this.getFormData} />
      </div>
    )
  }

}

export default Circles