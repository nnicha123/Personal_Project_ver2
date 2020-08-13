import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import LocalStorageService from '../../../services/LocalStorageService'

const { Header } = Layout;

const logOut = () => {
  localStorage.clear()
  window.location.replace('/login')
}

function RestaurantNav(props) {
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
        <Menu.Item key="5">
          <Link to="/request-restaurant">Your Requests</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/contact-us">Contact Us</Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/my-restaurants">My Restaurants</Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Link to="/your-orders">Your Orders</Link>
        </Menu.Item>
        <Menu.Item key="9" onClick={logOut}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default RestaurantNav