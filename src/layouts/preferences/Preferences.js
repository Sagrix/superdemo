import SimpleAHDContract from '../../../build/contracts/SimpleAHD.json'
import store from '../../store'
const contract = require('truffle-contract')

import React, { Component } from 'react'
import { Row, Col, Divider, Form, InputNumber, Button, Radio, notification, Icon } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


let contractInstance
let userAccount
const questions = [
  'Medical treatment for the primary purpose of research',
  'Sterilization that is not medically necessary for the protection of my health',
  'The removal of tissue from my body while I am living for transplantation to another person',
  'The removal of tissue from my body while I am living for the purpose of medical education or medical research',
  'Do Not Resuscitate (DNR)'
]
// let initialAnswers = []

class PreferenceForm extends Component {
  constructor(props) {
    super(props)
    this.updatePreferences = this.updatePreferences.bind(this)
  }

  /*componentDidMount() {
    this.setInitialValues()
  }

  setInitialValues() {
    for(let i=0; i<questions.length; i++) {
      contractInstance.viewPreference(questions[i], {from: userAccount})
      .then(result => {
        console.log(result)
  
      })
    }
  }*/

  updatePreferences(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(Object.keys(values).map(i => console.log(values[i])))
        let answers = []
        for(let i=0; i<questions.length; i++) {
          let answer = values[`radio-${i}`] === 'yes' ? true : false
          console.log(answer)
          answers.push(answer)

          // console.log(values[`radio-${i}`])

          // contractInstance.updatePreference(questions[i], answer, {from: userAccount})
          // .then(result => { 
          //   console.log(result)
          //   notification.open({
          //     message: 'Preferences Updated',
          //     description: 'Your preferences have now been updated.',
          //     icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
          //   });
          // })
        }

        contractInstance.updateManyPreferences(questions, answers, {from: userAccount})
          .then(result => {
            console.log(result)
            notification.open({
              message: 'Preferences Updated',
              description: 'Your preferences have now been updated.',
              icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
            });
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.updatePreferences}>
        <FormItem label="1. Medical treatment for the primary purpose of research:">
          {getFieldDecorator('radio-0')(
            <RadioGroup>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem label="2. Sterilization that is not medically necessary for the protection of my health:">
          {getFieldDecorator('radio-1')(
            <RadioGroup>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem label="3. The removal of tissue from my body while I am living for transplantation to another person:">
          {getFieldDecorator('radio-2')(
            <RadioGroup>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem label="4. The removal of tissue from my body while I am living for the purpose of medical education or medical research:">
          {getFieldDecorator('radio-3')(
            <RadioGroup>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem label="5. Do Not Resuscitate (DNR):">
          {getFieldDecorator('radio-4')(
            <RadioGroup>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">Update</Button>
        </FormItem>
      </Form>
    );
  }
}


const WrappedPreferenceForm = Form.create()(PreferenceForm);

class Preferences extends Component {

  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      simpleAHDInstance: null,
      preferences: {}
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
      userAccount = this.state.account

      simpleAHD.deployed().then(function(instance) {
        // console.log(instance)
        this.setState({simpleAHDInstance: instance})
        contractInstance = this.state.simpleAHDInstance
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
            description: 'Minimum required number of votes has now been updated.',
            icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
          });
        })
  }

  // updatePreferences(e) {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }
  

  render() {
    // const { getFieldDecorator } = this.props.form;
    
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

          <WrappedPreferenceForm />

        </Col>
      </Row>

    )
  }

}

export default Preferences