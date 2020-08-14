import React, { useState, useEffect } from 'react'
import '../css/MyRestaurantProfile.css'
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import MenuRestaurant from './MenuRestaurant'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import LocalStorageService from '../../services/LocalStorageService'

function MyRestaurantProfile() {
  const [user_id, setUserId] = useState(localStorage.getItem("id"))
  const [restaurant_id, setRestaurantId] = useState(localStorage.getItem("resId"))
  const [restaurant, setRestaurant] = useState({})
  const [menus, setMenus] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [changeprofileCover, setChangeCover] = useState(false)
  const [newCover, setNewCover] = useState('')

  useEffect(() => {
    axios.get(`/restaurant/${user_id}/${restaurant_id}`).then(res => {
      // console.log(res)
      setRestaurant(res.data)
      axios.get(`/menu/${restaurant_id}`).then(res => {
        setMenus(res.data)
        axios.get(`/feedback-rest/${restaurant_id}`).then(res => {
          console.log(res.data)
          setFeedbacks(res.data)
        })
      })
    })
  }, [])

  const deleteComment = (targetId) => {
    axios.delete(`/feedback-rest/${restaurant_id}/${targetId}`).then(res => {
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
      <div className="outerProfile">
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
            <span>CURRENT RATING : {restaurant.average_rating}/5</span>
          </div>
          <h3 style={{ margin: '10px' }}>Comments</h3>
          {
            feedbacks.length > 0 && feedbacks.map((el, index) => {
              return (<div className="descriptionOwner" key={el.createdAt}>
                <div className="commentTop">
                  <div>{el.comment}</div>
                  <div>{el.no_of_stars}/5</div>
                </div>
                <div className="deleteReport">
                  <Button type="primary" onClick={() => deleteComment(el.user_id)}>Delete</Button>
                  <Button type="dashed">Report</Button>
                </div>
              </div>)
            })
          }
          {
            feedbacks.length == 0 && <div className="emptyDiv"><h3>You currently have no comments</h3></div>
          }

        </div>
      </div>
      <div className="retaurantMenusMap">
        {menus.map(el => {
          return (
            <div key={el.id} className="usermenuRestaurants">
              <div className="usermenuImageDiv">
                <img src={'../' + el.menu_pic} />
              </div>
              <div className="usermenucontentDiv">
                <div>
                  <div>{el.title}</div>
                  <div>Rating : {el.average_rating}/5</div>
                </div>
                <Button style={{ width: '70px' }}>View</Button>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyRestaurantProfile
