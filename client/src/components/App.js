import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"

import NavBar from './NavBar'
import Header from './Header'
import HotelList from './HotelList'
import NewHotelForm from './NewHotelForm'
import UpdateHotelForm from './UpdateHotelForm'

function App() {

  const [hotels, setHotels] = useState([])
  const [postFormData, setPostFormData] = useState({})
  const [idToUpdate, setIdToUpdate] = useState(0)
  const [patchFormData, setPatchFormData] = useState({})

  useEffect(() => {
    fetch('/hotels')
    .then(response => response.json())
    .then(hotelData => setHotels(hotelData))
  }, [])

  useEffect(() => {
    if(hotels.length > 0 && hotels[0].id){
      setIdToUpdate(hotels[0].id)
    }
  }, [hotels])

  function addHotel(event){
    event.preventDefault()

    fetch('/hotels', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postFormData)
    })
    .then(response => response.json())
    .then(newHotel => setHotels(hotels => [...hotels, newHotel]))
  }

  function updateHotel(event){
    event.preventDefault()
    fetch(`/hotels/${idToUpdate}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(patchFormData)
    })
    .then(response => response.json())
    .then(updatedHotel => {
      setHotels(hotels => {
        return hotels.map(hotel => {
          if(hotel.id === updatedHotel.id){
            return updatedHotel
          }
          else{
            return hotel
          }
        })
      })
    })
  }

  function deleteHotel(id){
    fetch(`/hotels/${id}`, {
      method: "DELETE"
    })
    .then(() => setHotels(hotels => {
      return hotels.filter(hotel => {
        return hotel.id !== id
      })
    }))
  }

  function updatePostFormData(event){
    setPostFormData({...postFormData, [event.target.name]: event.target.value})
  }

  function updatePatchFormData(event){
    setPatchFormData({...patchFormData, [event.target.name]: event.target.value})
  }

  return (
    <div className="app">
      <NavBar/>
      <Header />
      <Switch>
        <Route exact path="/">
          <h1>Welcome! Here is the list of hotels available:</h1>
          <HotelList hotels={hotels} deleteHotel={deleteHotel}/>
        </Route>
        <Route path="/add_hotel">
          <NewHotelForm addHotel={addHotel} updatePostFormData={updatePostFormData}/>
        </Route>
        <Route path="/update_hotel">
          <UpdateHotelForm updateHotel={updateHotel} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} hotels={hotels}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
