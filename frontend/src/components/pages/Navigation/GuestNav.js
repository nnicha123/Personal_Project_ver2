import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, Router } from 'react-router-dom'

const { Header } = Layout;

function GuestNav(props) {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>
        <Menu.Item key="1">
          <Link to="/home">Logo</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/contact-us">Contact Us</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="5" style={{ float: 'right' }}>
          <Link to="/about-site">About Site</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default GuestNav
