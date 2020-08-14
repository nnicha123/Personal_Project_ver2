import React, { useState, useEffect } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import { Button } from 'antd'
import '../css/YourOrders.css'
import axios from '../../config/axios'
import { CheckCircleOutlined } from '@ant-design/icons';

function RequestRestaurant() {
  const [menuPost, setMenuPost] = useState([])
  const [previousMenu, setPreviousMenu] = useState([])
  const [allResIds, setAllResIds] = useState([])
  const [allMenuIds, setAllMenuIds] = useState([])
  useEffect(() => {
    axios.get(`/restaurant/${localStorage.getItem("id")}`).then(res => {
      setAllResIds(res.data)
      let allMenugenId = []
      for (let i = 0; i < res.data.length; i++) {
        axios.get(`/menu/${res.data[i].id}`).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            allMenugenId.push(res.data[i].id)
          }
        })
      }
      setAllMenuIds(allMenugenId)
      axios.get('/order/all').then(res => {
        let menuBought = []
        let previousBought = []
        for (let i = 0; i < res.data.length; i++) {
          if (allMenugenId.includes(res.data[i].menu_id) && res.data[i].status === 'pending') {
            console.log(res.data[i])
            let userId = res.data[i].user_id
            axios.get(`/menu/1/${res.data[i].menu_id}`).then(res => {
              let newRes = {}
              newRes = { ...res.data }
              newRes.orderedBy = userId
              // console.log(newRes)
              menuBought.push(newRes)
              setMenuPost([...menuBought])
            })
          }
          else if (allMenugenId.includes(res.data[i].menu_id)) {
            let userId = res.data[i].user_id
            axios.get(`/menu/1/${res.data[i].menu_id}`).then(res => {
              let previousRes = {}
              previousRes = { ...res.data }
              previousRes.orderedBy = userId
              // console.log(newRes)
              previousBought.push(previousRes)
              setPreviousMenu([...previousBought])
            })
          }

        }
      })
    })
  }, [])

  const acceptRequest = (userId, menuId) => {
    axios.put(`/order/${userId}/${menuId}`, { status: "completed" }).then(res => window.location.reload())
  }
  const declineRequest = (userId, menuId) => {
    axios.put(`/order/${userId}/${menuId}`, { status: "rejected" }).then(res => window.location.reload())
  }
  const deleteOrder = (userId, menuId) => {
    axios.delete(`/order/${userId}/${menuId}`).then(() => window.location.reload())
  }

  return (
    <div>
      <RestaurantNav selected={"5"} />
      <div className="orderOuter">
        <div className="orderBox">
          <h2 style={{ margin: '30px' }}>Current Orders</h2>
          <ul style={{ marginTop: '40px' }}>
            {menuPost.map((el, index) => {
              return (<li key={el.id}>
                <div className="order">
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.orderedBy}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => acceptRequest(el.orderedBy, el.id)}> ACCEPT</Button>
                    <Button onClick={() => declineRequest(el.orderedBy, el.id)}>DECLINE</Button>
                  </div>
                  {/* <div>
                    <CheckCircleOutlined />
                  </div> */}
                </div>
              </li>)
            })}
          </ul>
        </div>
        <div className="orderBox">
          <h2 style={{ margin: '30px' }}>Resolved Orders</h2>
          <ul style={{ marginTop: '40px' }}>
            {previousMenu.map((el, index) => {
              return (<li key={el.id} >
                <div className="order" style={{ background: 'grey' }}>
                  <img src={el.menu_pic} />
                  <div>{el.title}</div>
                  <div>${el.price}</div>
                  <div>{el.createdAt}</div>
                  <div>{el.status}</div>
                  <div>
                    <Button style={{ marginRight: '0' }} onClick={() => deleteOrder(el.orderedBy, el.id)}> Delete</Button>
                  </div>
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
