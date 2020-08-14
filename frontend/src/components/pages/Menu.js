import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import '../css/Menu.css'
import { Button } from 'antd'

function Menu() {
  const buyItem = (index) => {
    console.log(selectedMenu[index])
    let values = selectedMenu[index]
    values["status"] = "pending"
    values["user_id"] = localStorage.getItem("id")
    axios.post(`/order/${userId}/${selectedMenu[index].id}`, values).then(res => console.log(res))
  }
  const [selectedMenu, setSelectedMenu] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("id"))
  useEffect(() => {
    axios.get('/menu').then(res => {
      console.log(res.data)
      setSelectedMenu(res.data)
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"3"} /> : <RestaurantNav selected={"3"} />}
      <div className="menuBanner">
        <img src="restaurants/fishships2.jpg" />
      </div>
      <div className="topResOuter">
        <h3 style={{ marginTop: '20px' }}>Not free to dine in? Not a problem! Checkout our takeaways!</h3>
        <div className="mymenuRestaurants">
          {selectedMenu.map((el, index) => {
            return (
              <div key={el.id} className="menuRestaurants">
                <div className="menuImageDiv">
                  <img src={el.menu_pic} />
                </div>
                <div className="menucontentDiv">
                  <div>
                    <div>{el.title}</div>
                    <div>Rating : {el.average_rating}/5</div>
                  </div>
                  <Button style={{ width: '70px' }} onClick={() => { buyItem(index) }}>Buy</Button>
                </div>

              </div>

            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Menu
