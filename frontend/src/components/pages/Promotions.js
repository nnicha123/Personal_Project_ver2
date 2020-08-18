import React, { useState, useEffect } from 'react'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'
import axios from '../../config/axios'
import '../css/Promotions.css'
import { Button, Rate } from 'antd'
import { StarFilled, ShoppingFilled } from '@ant-design/icons';
import Footer from './Footer'

function Promotions() {
  const [selectedProMenu, setSelectedProMenu] = useState([])
  const [randomRating, setRandomRating] = useState([])
  const [userId, setUserId] = useState(localStorage.getItem("id"))

  const buyItem = (index) => {
    console.log(selectedProMenu[index])
    let values = selectedProMenu[index]
    values["status"] = "pending"
    values["user_id"] = localStorage.getItem("id")
    axios.post(`/order/${userId}/${selectedProMenu[index].id}`, values).then(res => { window.location.replace('/your-orders') })
  }

  useEffect(() => {
    axios.get('/menu').then(res => {
      console.log(res)
      let promoOnly = res.data.filter(el => {
        return el.promotion === true
      })
      console.log(promoOnly)
      setSelectedProMenu(promoOnly)
      // console.log(promoOnly)
      let randRateArr = []
      for (let i = 0; i < res.data.length; i++) {
        let randRate = Math.floor(Math.random() * 6) + 1
        randRateArr.push(randRate)
        // console.log(randRateArr)
      }
      setRandomRating(randRateArr)
    })
  }, [])
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav selected={"4"} /> : <RestaurantNav selected={"4"} />}
      <div className="homeBanner">
        <img src="restaurants/fishchips.jpg" />
      </div>
      <div className="topResOuter">
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '30px' }}>
          <h2 className="descriptionTagsH2" style={{ margin: '30px 10px' }}>Today's Promotions!!!</h2>
        </div>
        <div className="myhomeRestaurants" style={{ margin: '0 auto' }}>
          {selectedProMenu.map((el, index) => {
            return (
              <div key={el.id} className="homeRestaurants">
                <div className="homeImageDiv">
                  <img src={el.menu_pic} />
                </div>
                <div className="contentDiv">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>{el.title}</div>
                    <div><b>${el.price}</b></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div><Rate allowHalf value={randomRating[index]} /></div>
                    <div><ShoppingFilled style={{ fontSize: '20px', color: '#001529' }} onClick={() => { buyItem(index) }} /></div>
                  </div>

                  <StarFilled style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'yellow' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Promotions
