import React, { useEffect, useState } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import axios from '../../config/axios'
import '../css/MyRestaurant.css'
import MyRestaurantProfile from './MyRestaurantProfile'
import { Button, Input } from 'antd'

function MyRestaurants() {

  const [user_id, setUserId] = useState(localStorage.getItem("id"))
  const [restaurants, setRestaurants] = useState([])
  const [chosenRestaurant, setChosenRestaurant] = useState({})
  const [showIndRestaurant, setShowIndRestaurant] = useState(false)
  const [changePic, setChangePic] = useState(false)
  const [newPic, setNewPic] = useState('')

  const changeProfilePicHandler = (index) => {
    axios.put(`/restaurant/${restaurants[index].id}`, { profile_pic: newPic }).then(res => console.log(res))
  }

  const showRestaurant = (index) => {
    setChosenRestaurant(restaurants[index])
    setShowIndRestaurant(true)
    console.log(restaurants[index])
    localStorage.setItem("resId", restaurants[index].id)
  }

  useEffect(() => {
    localStorage.removeItem("resId")
    axios.get(`/restaurant/${user_id}`).then(res => {
      console.log(res)
      setRestaurants(res.data)
    })
  }, [])
  return (
    <div>
      <RestaurantNav selected={"7"} />
      {!showIndRestaurant && <div className="myRestaurants">
        {restaurants.map((el, index) => {
          return (
            <div key={el.id} className="Restaurants">
              <div className="imageDiv">
                <img src={el.profile_pic} />
                {!changePic && <Button className="profilePicChangeButton" onClick={() => setChangePic(true)}>Change</Button>}
                {changePic && <span className="changePic">
                  <Input placeholder="Enter new profile pic url" value={newPic} onChange={(e) => { setNewPic(e.target.value) }} />
                  <Button onClick={() => changeProfilePicHandler(index)}>Submit</Button>
                </span>}
              </div>
              <div className="restaurantName">{el.name}</div>
              <Button onClick={() => showRestaurant(index)}>See Restaurant</Button>
            </div>

          )
        })}
      </div>}

      {showIndRestaurant && <MyRestaurantProfile chosen={chosenRestaurant} />}
    </div>
  )
}

export default MyRestaurants
