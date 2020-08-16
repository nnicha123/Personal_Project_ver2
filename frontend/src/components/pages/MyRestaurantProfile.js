import React, { useState, useEffect } from 'react'
import '../css/MyRestaurantProfile.css'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import MenuRestaurant from './MenuRestaurant'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import { PlusCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Footer from './Footer'


function MyRestaurantProfile() {
  const [user_id, setUserId] = useState(localStorage.getItem("id"))
  const [restaurant_id, setRestaurantId] = useState(localStorage.getItem("resId"))
  const [restaurant, setRestaurant] = useState({})
  const [menus, setMenus] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [changeprofileCover, setChangeCover] = useState(false)
  const [newCover, setNewCover] = useState('')
  const [addMenuForm, setAddMenuForm] = useState(false)
  const [avg_rating, setAvgRating] = useState(0)

  const onFinish = values => {
    console.log(values)
    // window.location.replace('/home')
    // values["promotion"] = false
    values["average_rating"] = 0
    axios.post(`/menu/${localStorage.getItem("resId")}`, values).then(res => {
      window.location.reload()
    })
  };

  const addMenu = () => {
    setAddMenuForm(true)
  }

  useEffect(() => {
    axios.get(`/restaurant/${user_id}/${restaurant_id}`).then(res => {
      // console.log(res)
      setRestaurant(res.data)
      axios.get(`/menu/${restaurant_id}`).then(res => {
        setMenus(res.data)
        axios.get(`/feedback-rest/${restaurant_id}`).then(res => {
          console.log(res.data)
          setFeedbacks(res.data)
          let averageRating = 0
          let sum = 0
          for (let i = 0; i < res.data.length; i++) {
            sum += Number(res.data[i].no_of_stars)
          }
          averageRating = sum / res.data.length
          setAvgRating(averageRating)
        })
      })
    })
  }, [])

  const deleteComment = (targetId) => {
    axios.delete(`/feedback-rest/${restaurant_id}/${targetId}`).then(res => {
      window.location.reload()
    })
  }
  const reportComment = (targetId) => {
    axios.put(`/feedback-rest/${restaurant_id}/${targetId}`, { reported: true }).then(res => {
      window.location.reload()
    })
  }
  const changeCover = () => {
    setChangeCover(true)
  }
  const submitNewCover = () => {
    axios.put(`/restaurant/${restaurant_id}`, { cover_pic: newCover }).then(res => window.location.reload())
  }

  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"8"} /> : <RestaurantNav selected={"7"} />}
      <div className="topResOuter">
        {/* {restaurant.name} */}
        <div className="usermenuBanner">
          <img src={'../' + restaurant.cover_pic} />
          {!changeprofileCover && <Button className="changeCoverButton" onClick={() => { changeCover() }}>Change</Button>}
          {changeprofileCover && <span>
            <Input type="text" onChange={(e) => { setNewCover(e.target.value) }} value={newCover} />
            <Button onClick={() => { submitNewCover() }}>Submit</Button>
          </span>}
        </div>
        <div className="profileContents">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '730px' }}>
            <h3 style={{ marginLeft: '10px', fontSize: '40px' }}>{restaurant.name}</h3>
          </div>
          <p style={{ marginLeft: '10px', fontSize: '20px' }}>{restaurant.description}</p>
          <div style={{ margin: '10px', marginBottom: '30px' }}>
            <h3>Average Rating : {avg_rating}/5 <Rate allowHalf value={avg_rating} /></h3>
          </div>
          <h3 style={{ margin: '10px' }}>Comments</h3>
          {
            feedbacks.length > 0 && feedbacks.map((el, index) => {
              return (<div className="descriptionOwner" key={el.createdAt}>
                {!el.reported && <div className="commentTop">
                  <div>{el.comment}</div>
                  <div><div> <Rate allowHalf value={el.no_of_stars} /></div></div>
                </div>}
                {el.reported && <div className="commentTop">
                  <i>This comment is inappropriate, and was hidden by you</i>
                </div>}
                <div className="deleteReport">
                  <Button type="primary" onClick={() => deleteComment(el.user_id)}>Delete</Button>
                  {!el.reported && <Button type="dashed" onClick={() => reportComment(el.user_id)}>Report</Button>}
                </div>
              </div>)
            })
          }
          {
            feedbacks.length == 0 && <div className="emptyDiv"><h3>You currently have no comments</h3></div>
          }

        </div>

        <div className="retaurantMenusMap" style={{ marginTop: '25px' }}>
          {menus.map(el => {
            return (
              <div key={el.id} className="usermenuRestaurants">
                <div className="usermenuImageDiv">
                  <img src={'../' + el.menu_pic} />
                </div>
                <div className="usermenucontentDiv">
                  <div>
                    <div>{el.title}</div>
                    {/* <div>Rating : {el.average_rating}/5</div> */}
                  </div>
                </div>

              </div>
            )
          })}
          {!addMenuForm && <div className="addMenuRes" onClick={addMenu}>
            <PlusCircleOutlined />
          </div>}
          {addMenuForm && <div className="addMenuResForm">
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
                <Form.Item style={{ marginBottom: '5px' }}
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
                <Form.Item style={{ marginBottom: '5px' }}
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
              <Form.Item style={{ marginBottom: '10px' }}
                name="promotion"
              >
                <Input type="boolean" placeholder="Promotion? (true/false)" />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Button style={{ marginRight: 0 }} type="primary" htmlType="submit" className="login-form-button">Add Menu</Button>
                <Button style={{ marginLeft: 0 }} onClick={() => setAddMenuForm(false)}>Cancel</Button>
              </div>
            </Form>
          </div>}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default MyRestaurantProfile
