import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import '../css/Menu.css'
import { Button, Rate } from 'antd'
import { StarFilled, ShoppingFilled } from '@ant-design/icons';
import Footer from './Footer'

function Menu() {
  const buyItem = (index) => {
    console.log(selectedMenu[index])
    let values = selectedMenu[index]
    values["status"] = "pending"
    values["user_id"] = localStorage.getItem("id")
    axios.post(`/order/${userId}/${selectedMenu[index].id}`, values).then(res => { window.location.replace('/your-orders') })
  }
  const [selectedMenu, setSelectedMenu] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("id"))
  const [randomRating, setRandomRating] = useState([])
  useEffect(() => {
    axios.get('/menu').then(res => {
      console.log(res.data)
      setSelectedMenu(res.data)
      let randRateArr = []
      for (let i = 0; i < res.data.length; i++) {
        let randRate = Math.floor(Math.random() * 6) + 1
        randRateArr.push(randRate)
        console.log(randRateArr)
      }
      setRandomRating(randRateArr)
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"3"} /> : <RestaurantNav selected={"3"} />}
      <div className="menuBanner">
        <img src="restaurants/fishships2.jpg" />
      </div>
      <div className="topResOuter">
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '30px' }}>
          <h2 className="descriptionTagsH2" style={{ margin: '30px 10px' }}>Not free to dine in? Not a problem! Checkout our takeaways!</h2>
        </div>

        <div className="myhomeRestaurants" style={{ margin: '0 auto' }}>
          {selectedMenu.map((el, index) => {
            return (
              <div key={el.id} className="homeRestaurants">
                <div className="homeImageDiv">
                  <img src={el.menu_pic} />
                </div>
                {el.promotion && <StarFilled style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'yellow' }} />}
                <div className="contentDiv">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>{el.title}</div>
                    <div><b>${el.price}</b></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div><Rate allowHalf value={randomRating[index]} /></div>
                    <div>
                      <ShoppingFilled style={{ fontSize: '20px', color: '#001529' }} onClick={() => { buyItem(index) }} />
                    </div>
                  </div>
                </div>
              </div>

            )
          })}
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default Menu
