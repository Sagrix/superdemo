import React from 'react'
import DataGrantForm from './DataGrantForm'
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

  handleFormUpdate = (name, address, duration) => {
    console.log(name, ' : ', address)
    this.setState({newUser: name, newAddress: address, newDuration:duration, visible: false})
    this.props.getFormData(name, address, duration)
  }

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
        <Modal title="Grant Access to your data"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="Add"
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
          ]}
        >
          <DataGrantForm handleUpdate={this.handleFormUpdate} />
        </Modal>
      </div>
    );
  }
}

export default CircleModal;