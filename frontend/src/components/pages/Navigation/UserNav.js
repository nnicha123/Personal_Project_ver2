import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import Avatar from 'antd/lib/avatar/avatar';


const { Header } = Layout;
const { SubMenu } = Menu;

const logOut = () => {
  localStorage.clear()
  window.location.replace('/login')
}

function GuestNav(props) {

  const [profilePic, setProfilePic] = useState('')

  useEffect(() => {
    axios.get(`/user/${localStorage.getItem("id")}`).then(res => {
      setProfilePic(res.data.profile_pic)
    })
  })

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

        <SubMenu icon={<Avatar shape="square" size={20} src={profilePic} />} title=" My Records" style={{ float: 'right' }}>
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
        {/* <Menu.Item key="14" style={{ float: 'right' }}>
          <Link to="/about-site">About Site</Link>
        </Menu.Item> */}
      </Menu>
    </Header>
  )
}

export default GuestNav
