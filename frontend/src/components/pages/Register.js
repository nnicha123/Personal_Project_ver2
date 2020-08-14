import React from 'react'
import 'antd/dist/antd.css'
import { Layout, notification } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, SmileOutlined, PhoneOutlined, PushpinOutlined, ShopOutlined } from '@ant-design/icons';
import '../css/Register.css'
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../config/axios'
import GuestNav from './Navigation/GuestNav';
import LocalStorageService from '../../services/LocalStorageService'

const { Content } = Layout;

const registerUser = values => {
  values["role"] = "user"
  console.log('Register USER, Received values of form: ', values);

  axios.post('/user/register', values).then(res => {
    notification.success({ message: `Successfully registered as Customer` })
    window.location.replace('/login')
  }).catch(err => {
    window.location.replace('/register-fail')
  })
}
const registerRestaurant = values => {
  values["role"] = "restaurant-owner"
  values["back_theme"] = "default"
  values["average_rating"] = 0
  console.log('Register RESTAURANT, Received values of form: ', values);
  notification.success({ message: `Successfully registered as Restaurant` })
  axios.post('/user/register', values).then(res => {
    axios.post('/user/login', values).then(res => {
      console.log(res)
      LocalStorageService.setToken(res.data.token)
      LocalStorageService.setRole(res.data.role)
    })

  }).catch(err => window.location.replace('/register-fail'))

}

function Register() {
  return (
    <div className="registerWrapper">
      <GuestNav selected={"3"} />
      <Content className="registerOuter">
        <div className="register" style={{ textAlign: 'center' }}>
          <h3>Register as Customer</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={registerUser}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: false,
                  },
                ]}>
                <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="Last Name" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                type="phone_number"
                placeholder="Phone Number"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="username"
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => registerUser}>
                Register</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="register" style={{ textAlign: 'center' }}>
          <h3>Register as Restaurant</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={registerRestaurant}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: false,
                  },
                ]}>
                <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="Last Name" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="username"
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input Restaurant name!',
                },
              ]}
            >
              <Input
                prefix={<ShopOutlined className="site-form-item-icon" />}
                type="name"
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                type="phone_number"
                placeholder="Phone Number"
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: false
                },
              ]}
            >
              <TextArea
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="description"
                placeholder="Description (optional)"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: false
                },
              ]}
            >
              <TextArea
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="address"
                placeholder="Address (Can edit later)"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => registerRestaurant}>
                Register</Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </div>
  )
}

export default Register
