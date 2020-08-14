import React, { useState, useEffect } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { CheckCircleOutlined } from '@ant-design/icons';

function RequestRestaurant() {
  const [menuPost, setMenuPost] = useState([])
  const [allResIds, setAllResIds] = useState([])
  const [allMenuIds, setAllMenuIds] = useState([])
  useEffect(() => {
    axios.get(`/restaurant/${localStorage.getItem("id")}`).then(res => {
      setAllResIds(res.data)
      let allMenugenId = []
      for (let i = 0; i < res.data.length; i++) {
        axios.get(`/menu/${res.data[i].id}`).then(res => {
          // allMenus.push(res.data)
          // console.log(allMenus)
          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data[i])
            allMenugenId.push(res.data[i].id)
            // console.log(allMenugenId)
          }
        })
      }
      setAllMenuIds(allMenugenId)
      axios.get('/order/all').then(res => {
        // allMenugenId.forEach(el => console.log(el))
        console.log(res)
        let menuBought = []
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].menu_id)
          if (allMenugenId.includes(res.data[i].menu_id)) {
            // console.log(res.data[i].menu_id)
            axios.get(`/menu/1/${res.data[i].menu_id}`).then(res => {
              menuBought.push(res.data)
              // console.log(menuBought)
              // 
              setMenuPost([...menuBought])
            })
          }
        }
      })
    })
  }, [])

  const acceptRequest = (menuId, index) => {
    axios.put(`/order/${menuId}`, { status: "completed" }).then(res => { console.log(res.data) })
  }
  const declineRequest = (menuId) => {
    axios.put(`/order/${menuId}`, { status: "rejected" }).then(res => console.log(res.data))
  }

  return (
    <div>
      <RestaurantNav selected={"5"} />
      <div className="orderOuter">
        <div className="orderBox">
          <ul style={{ marginTop: '40px' }}>
            {menuPost.map((el, index) => {
              return (<li key={el.id}>
                <div className="order">
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.createdAt}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => acceptRequest(el.id, index)}> ACCEPT</Button>
                    <Button onClick={() => declineRequest(el.id)}>DECLINE</Button>
                  </div>
                  {/* <div>
                    <CheckCircleOutlined />
                  </div> */}
                </div>
              </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RequestRestaurant
