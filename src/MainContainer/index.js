import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ShowRestaurant from '../ShowRestaurant';


class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      restaurant : {
        name: '',
        city: '',
        state: '',
        phNumber: '',
        genres: ''
      },
      restaurantlist: []
    }
  }

  componentDidMount(){
    this.getRestaurant()
  }

  //get
  
  getRestaurant = async() => {
    try{
      const response = await fetch( `http://localhost:9000/api/v1/restaurant`, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const restaurantParsed = await response.json();

      this.setState({
        restaurantlist: restaurantParsed.data
      })

    }catch(err){
      return err
    }
  }

  //post!

  handleChange = (e) => {
    this.setState({
      restaurant : {
        ...this.state.restaurant,
        [e.target.name] : e.target.value
      }
    })
  }


  addRestaruant  = async(e) => {

    try {
      const response = await fetch(`http://localhost:9000/api/v1/restaurant/`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state.restaurant),
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json();

      this.setState({
        restaurantlist: [...this.state.restaurantlist, parsedResponse],
      })

    }catch(err){
      return err
    }
  }


  //Delete!

  deleteRestaurant = async(id, e) => {
  try{
    const response = await fetch(`http://localhost:9000/api/v1/restaurant/` + id, {
      method: 'DELETE'
    })

    if(!response.ok){
      throw Error(response.statusText)
    }

    // const parsedResponse = await response.json()

    this.setState({
      restaurantlist: this.state.restaurantlist.filter((restaurant) => restaurant._id !== id)
    })

  }catch(err){
    return err
  }
}

  render(){
    console.log(this.state.restaurantlist)
    return(
      <div>

        <div>Restaurant List</div>
        <form>
          <input />
          <button>SEARCH</button>
        </form>
        <form onSubmit={this.addRestaruant}>
          <label htmlFor="">Name:</label>
          <input name="name" onChange={this.handleChange} />
          <label htmlFor="">City:</label>
          <input name="city" onChange={this.handleChange} />
          <label htmlFor="">State:</label>
          <input name="state" onChange={this.handleChange} />
          <label htmlFor="">Phone Number:</label>
          <input name="phNumber" onChange={this.handleChange} />
          <label htmlFor="">Genres:</label>
          <input name="genres" onChange={this.handleChange} />
          <button>ADD</button>
        </form>
        <ShowRestaurant restaurantlist={this.state.restaurantlist} deleteRestaurant={this.deleteRestaurant} />
      </div>
    )
  }
}


export default MainContainer
