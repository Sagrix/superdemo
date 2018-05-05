import React from 'react'
import AddToCircleForm from './AddToCircleForm'
import { Modal, Button, Form, Input, Tooltip } from 'antd';
const FormItem = Form.Item;


class CircleModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible,
      confirmLoading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleFormUpdate = (name, address) => {
    console.log(name, ' : ', address)
    this.setState({newUser: name, newAddress: address, visible: false})
    this.props.getFormData(name, address)
  }

  /*handleOk = () => {
    // should receive the handler from props depending on who calls it

    this.props.getFormData(this.state.newUser, this.state.newAddress)
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }*/

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    
    return (
      <div>
        <Modal title="Add someone new to your Circle"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="Add"
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
          ]}
        >
          <AddToCircleForm handleUpdate={this.handleFormUpdate} />
        </Modal>
      </div>
    );
  }
}

export default CircleModal;