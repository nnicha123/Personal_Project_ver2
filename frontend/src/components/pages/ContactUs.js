import React from 'react'
import 'antd/dist/antd.css'
import { Layout, Menu, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/ContactUs.css'
import { Link } from 'react-router-dom'
import GuestNav from './Navigation/GuestNav';
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'


const { Content } = Layout;

function Login() {
  return (
    <div className="loginWrapper">
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"6"} /> : LocalStorageService.getUserRole() === 'restaurant-owner' ? <RestaurantNav selected={"6"} /> : <GuestNav selected={"2"} />}
      <Content className="contactOuter">
        <div className="contact">
          <h1>CONTACT US</h1>
          <div className="contact-grid">
            <div>
              <h2>Phone</h2>
              <p>000-000-0000</p>
            </div>
            <div>
              <h2>Email</h2>
              <p>Test@test.com</p>
            </div>
          </div>
        </div>

      </Content>
    </div>
  )
}

export default Login
