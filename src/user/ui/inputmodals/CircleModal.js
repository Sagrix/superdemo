import React from 'react'
import { Modal, Button, Form, Input, Tooltip } from 'antd';
const FormItem = Form.Item;


class CircleModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      ModalText: 'Enter details below:',
      visible: false,
      confirmLoading: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    // should receive the handler from props depending on who calls it
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
          <Form layout="horizontal">
            <FormItem label="Name">
              {getFieldDecorator('Name', {
                rules: [{ required: true, message: 'Please enter the name of the person!' }],
              })(
                <Input placeholder="e.g. Sir Toshi" />
              )}
            </FormItem>
            <FormItem label="Address:">
              {getFieldDecorator('description')(<Input placeholder="0xabcdef123456abcdef123456abcdef123456abcd" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CircleModal;