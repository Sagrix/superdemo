import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
import store from '../../store'
const contract = require('truffle-contract')

import React, { Component } from 'react'
import { Row, Col, Divider, Form, InputNumber, Button, Radio, notification, Icon } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class Preferences extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      simpleAHDInstance: null
    }


    this.instantiateContract = this.instantiateContract.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getRequiredVotes = this.getRequiredVotes.bind(this)
  }

  componentWillMount() {
    this.instantiateContract()
  }

  instantiateContract() {
    this.web3 = store.getState().web3.web3Instance

    const simpleAHD = contract(SimpleAHDContract)
    simpleAHD.setProvider(this.web3.currentProvider)
    let simpleAHDInstance

    this.web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      this.setState({account: coinbase})
      console.log(this.state.account)

      simpleAHD.deployed().then(function(instance) {
        // console.log(instance)
        this.setState({simpleAHDInstance: instance})
        // console.log(this.state.simpleAHDInstance)
        // simpleAHDInstance = instance
        // console.log(simpleAHDInstance)

        this.state.simpleAHDInstance.getRequiredVotes({from: coinbase})
        .then((result) => {
          console.log(result['c'][0])
          // return result['c'][0]
          this.setState({requiredVotes: result['c'][0]})
        })
        .catch((error) => {
          console.log(error)
        })
      }.bind(this))

    })

    // this.setState({simpleAHDInstance: instance})
  }

  onChange(value) {
    this.setState({selectedVotes: value})
  }

  getRequiredVotes() {
    return this.state.requiredVotes
  }

  setRequiredVotes(e) {
    e.preventDefault()

    this.state.simpleAHDInstance.setRequiredVotes(this.state.selectedVotes, {from: this.state.account})
        .then((result) => {
          console.log(result)
          notification.open({
            message: 'Required Votes Updated',
            description: 'Your preference has now been updated.',
            icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
          });
        })
  }
  

  render() {
    return(
      <Row>
        <Col span={12} offset={6}>
          <h1>My Healthcare Preferences</h1>
          <h3>Decisions you want made on your behalf when you are unable to make them for yourself.</h3>
          
          <Divider />

          <Form layout="inline" onSubmit={this.setRequiredVotes.bind(this)}>
            <FormItem label="Min. Votes Required">
              <InputNumber min={0} max={10} defaultValue={this.state.requiredVotes} onChange={this.onChange} />
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