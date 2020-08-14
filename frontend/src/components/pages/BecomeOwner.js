import React, { useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import 'antd/dist/antd.css'
import { Layout, notification } from 'antd';
import { Form, Input, Button } from 'antd';
import { LockOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons';
import '../css/BecomeOwner.css'
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../config/axios'
import LocalStorageService from '../../services/LocalStorageService'

const { Content } = Layout;

const registerRestaurant = values => {
  values["role"] = "restaurant-owner"
  values["back_theme"] = "default"
  values["average_rating"] = 0
  values["user_id"] = localStorage.getItem("id")
  console.log('Register RESTAURANT, Received values of form: ', values);
  notification.success({ message: `Successfully registered as Restaurant` })
  axios.post('/restaurant', values).then(res => {
    console.log(res)
    axios.put('/user', { role: 'restaurant-owner' }).then(res => {
      localStorage.removeItem("Role")
      localStorage.setItem("Role", 'restaurant-owner')
      window.location.replace('/my-restaurants')
    })
  }).catch(err => window.location.replace('/register-fail'))

}

function BecomeOwner() {

  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"7"} /> : <RestaurantNav selected={"9"} />}
      <Content className="content">
        <div className="register" style={{ textAlign: 'center' }}>
          <h3>Register Restaurant</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={registerRestaurant}
          >
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

export default BecomeOwner
