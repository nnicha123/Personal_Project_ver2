import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, BellFilled } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

const { Header } = Layout;
const { SubMenu } = Menu;


const logOut = () => {
  localStorage.clear()
  window.location.replace('/login')
}

function RestaurantNav(props) {

  const [profilePic, setProfilePic] = useState('')

  useEffect(() => {
    axios.get(`/user/${localStorage.getItem("id")}`).then(res => {
      setProfilePic(res.data.profile_pic)
    })
  }, [])

  return (
    <Header>
      <div className="logo" />

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected} notifyUser={props.notify}>
        <Menu.Item key="1">
          <Link to="/home">Logo {props.notify}</Link>

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
        <SubMenu icon={<Avatar shape="square" size={20} src={profilePic} />} title="  My Records" style={{ float: 'right' }}>
          <Menu.Item title="My Restaurants">
            <Link to="/my-restaurants">My Restaurants</Link>
          </Menu.Item>
          <Menu.ItemGroup title="My Requests">
            <Menu.Item key="setting:1">
              <Badge count={1}>
                <Link to="/request-restaurant">Menu Requests</Link>
              </Badge>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/booking-requests">Booking Requests</Link>
            </Menu.Item>
          </Menu.ItemGroup>
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
        <Menu.Item key="9" style={{ float: 'right' }}>
          <Link to="/become-owner" >Add Restaurant</Link>
        </Menu.Item>
      </Menu>
      {/* <Menu>
        <h1>{props.notify}</h1>
        ergf
      </Menu> */}
    </Header >
  )
}

export default RestaurantNav