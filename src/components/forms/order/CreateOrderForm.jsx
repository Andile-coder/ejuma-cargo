import { Button, Form, Input, InputNumber } from "antd";

const formItemLayout = {};

const CreateOrderForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={"outlined"}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        style={{ marginBottom: 5 }}
        label="Ref"
        name="ref"
        rules={[
          {
            required: false,
            message: "Ref field required!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Third Party"
        name="socid"
        rules={[
          {
            required: true,
            message: "Third Party field required!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 5 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrderForm;
