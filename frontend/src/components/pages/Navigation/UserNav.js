import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;

const logOut = () => {
  localStorage.clear()
  window.location.replace('/login')
}

function GuestNav(props) {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>
        <Menu.Item key="1">
          <Link to="/home">Logo</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/promotions">Promotions</Link>
        </Menu.Item>

        <Menu.Item key="7" style={{ float: 'right' }}>
          <Link to="/become-owner">Become Owner</Link>
        </Menu.Item>

        <SubMenu icon={<UserOutlined />} title="My Records" style={{ float: 'right' }}>
          <Menu.ItemGroup title="My Cart">
            <Menu.Item key="setting:3">
              <Link to="/your-orders">Your Orders</Link>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <Link to="/your-bookings">Your Bookings</Link>
            </Menu.Item>
            <Menu.Item key="13" onClick={logOut} style={{ float: 'right' }}>
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Header>
  )
}

export default GuestNav
