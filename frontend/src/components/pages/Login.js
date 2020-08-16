import React from 'react'
import GuestNav from './Navigation/GuestNav'
import 'antd/dist/antd.css'
import { Layout, notification } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Login.css'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import Footer from './Footer';

const { Content } = Layout;


const onFinish = values => {
  console.log(values)
  axios.post('/user/login', values).then(res => {
    console.log(res)
    LocalStorageService.setToken(res.data.token)
    LocalStorageService.setRole(res.data.role)
    localStorage.setItem("id", res.data.id)
    notification.success({ message: 'Successfully logged In' })
    window.location.replace('/home')
  })
  // window.location.replace('/home')
};

function Login() {
  return (
    <div>
      <div className="topResOuter">
        <GuestNav selected={'4'} />
        <Content className="loginOuter">
          <div className="login">
            <h3>LOGIN</h3>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
        </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
        </Button>
        Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </div>
      <Footer />
    </div>
  )
}

export default Login
