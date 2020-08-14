import React, { useEffect, useState } from 'react'
import axios from '../../config/axios'
import '../css/MenuRestaurant.css'
import RestaurantNav from './Navigation/RestaurantNav'
import { PlusCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


function MenuRestaurant(props) {
  const [menu, setMenu] = useState([])
  const [newMenu, setNewMenu] = useState([])
  const [addMenuForm, setAddMenuForm] = useState(false)

  const onFinish = values => {
    console.log(values)
    // window.location.replace('/home')
    values["promotion"] = false
    values["average_rating"] = 0
    axios.post(`/menu/${localStorage.getItem("resId")}`, values).then(res => {
      window.location.reload()
    })
  };

  const addMenu = () => {
    setAddMenuForm(true)
  }

  useEffect(() => {
    axios.get(`/menu/${localStorage.getItem("resId")}`).then(res => {
      setMenu(res.data)
      // localStorage.removeItem("resId")
      console.log(res.data)
    })
  }, [])

  return (
    <div>
      <RestaurantNav selected={"9"} />
      <div className="myMenus">
        {menu.map((el, index) => {
          return (
            <div key={el.id} className="menus">
              <div className="imageDiv">
                <img src={el.menu_pic} />
              </div>
              <div className="textDiv">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                  <div>{el.title}</div>
                  <div>Rating {el.average_rating}/5</div>
                </div>
                <div>{el.description}</div>
                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>${el.price}</div>
                  <Button style={{ margin: 0 }}>Edit Info</Button>
                </div>
              </div>
            </div>
          )
        })}
        {!addMenuForm && <div className="addMenu" onClick={addMenu}>
          <PlusCircleOutlined />
        </div>}
        {addMenuForm && <div className="addMenuForm">
          <Form style={{ margin: '15px' }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item style={{ marginBottom: '5px' }}
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Title" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '5px' }}
              name="description"
              rules={[
                {
                  required: false
                },
              ]}
            >
              <TextArea
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: '5px' }}
              name="menu_pic"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
              <Input placeholder="Menu Picture" />
            </Form.Item>
            <div style={{ display: 'flex' }}>
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Please input your category!',
                  },
                ]}
              >
                <Input placeholder="Category" />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your title!',
                  },
                ]}
              >
                <Input type="number" placeholder="Price" />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
              <Button style={{ marginRight: 0 }} type="primary" htmlType="submit" className="login-form-button">Add Menu</Button>
              <Button style={{ marginLeft: 0 }} onClick={() => setAddMenuForm(false)}>Cancel</Button>
            </div>
          </Form>
        </div>}
      </div>

    </div>
  )
}

export default MenuRestaurant
