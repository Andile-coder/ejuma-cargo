import { Button, Form, Input, InputNumber, Select } from "antd";

const formItemLayout = {};

const CreateWarehouseForm = ({ onSubmit }) => {
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
        name="label"
        rules={[
          {
            required: true,
            message: "Ref field required!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Short name of location"
        name="lieu"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Description"
        name="description"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Address"
        name="address"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Zip Code"
        name="zip"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="City"
        name="town"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Country"
        name="country"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Phone"
        name="phone"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 5 }}
        label="Fax"
        name="fax"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 5 }}
        label="Status"
        name="statut"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value={1}>Open</Select.Option>
          <Select.Option value={0}>Closed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ marginBottom: 5 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateWarehouseForm;
