import React, { useEffect, useState } from 'react'
import RestaurantNav from './Navigation/RestaurantNav'
import axios from '../../config/axios'
import '../css/MyRestaurant.css'
import MyRestaurantProfile from './MyRestaurantProfile'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'

function MyRestaurants() {

  const [user_id, setUserId] = useState(localStorage.getItem("id"))
  const [restaurants, setRestaurants] = useState([])
  const [chosenRestaurant, setChosenRestaurant] = useState({})
  const [changePic, setChangePic] = useState(false)
  const [newPic, setNewPic] = useState('')
  const [firstName, setFirstName] = useState('User')

  const changeProfilePicHandler = (index) => {
    axios.put(`/restaurant/${restaurants[index].id}`, { profile_pic: newPic }).then(res => console.log(res))
  }

  const showRestaurant = (index) => {
    setChosenRestaurant(restaurants[index])
    localStorage.setItem("resId", restaurants[index].id)
    window.location.replace('/my-restaurants/profile')
  }

  useEffect(() => {
    localStorage.removeItem("resId")
    axios.get(`/restaurant/${user_id}`).then(res => {
      console.log(res)
      setRestaurants(res.data)
      axios.get(`/user/${user_id}`).then(res => {
        setFirstName(res.data.first_name)
      })
    })
  }, [])
  return (
    <div>
      <RestaurantNav selected={"7"} />
      <h2 style={{ margin: '40px' }}>Welcome {firstName}, Here are your current restaurants!</h2>
      <div className="myRestaurants">
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
              <div className="restaurantName">
                <h4>{el.name}</h4>
                <Button onClick={() => { showRestaurant(index) }} className="seeRestaurantButton">
                  See Restaurant
              </Button>
              </div>

            </div>

          )
        })}
      </div>
    </div>
  )
}

export default MyRestaurants
