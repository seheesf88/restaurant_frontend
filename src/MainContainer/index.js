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
      restaurantlist: [],
      search: '',
      byState: null,
      byGenre: null,
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

  handleSearchChange = (e) => {
    this.setState({
        ...this.state.restaurant,
        search : e.target.value
    })

    console.log('serch in the state',this.state.search)
  }

  handleByStateChange = (e) => {
    this.setState({
        ...this.state.restaurant,
        byState : e.target.value
    })
  }

  handleByGenreChange = (e) => {
    this.setState({
        ...this.state.restaurant,
        byGenre : e.target.value
    })
    console.log('9', this.state.byGenre)
  }



  render(){
    const states = [
      'Select', "All", 'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida', 'Georgia','Hawaii','Idaho','IllinoisIndiana',
      'Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','MontanaNebraska','Nevada','New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina','North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'PennsylvaniaRhode Island',
      'South Carolina','South Dakota','Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington','West Virginia','Wisconsin','Wyoming',
    ]

    const genres = ['Select', 'All', 'Fine Dining', 'Casual Dining', 'Family Style', 'Fast Food', 'Cafe', 'Buffet', 'Food Trucks']


    return(
      <div className="container">
        <div className="font-weight-bold">Restaurant List</div>

        <div className="row container">
          <div className="row">
            <form className="col">
              <input onChange={this.handleSearchChange} value={this.state.searchString}/>
              <button>SEARCH</button>
            </form>

            <div className="row">
            <label>Filter By</label>
            <select name="state" id="state" onChange={this.handleByStateChange} value={this.state.restaurant.state} >
              {states.map(st => {
                  return <option value={st} key={st} >{st}</option>
              })}
            </select>
            <select name="genres" id="genres" onChange={this.handleByGenreChange} value={this.state.restaurant.genres}>
              {genres.map(genre => {
                  return <option value={genre} key={genre} >{genre}</option>
              })}
            </select>
            </div>
          </div>
        </div>


        <form onSubmit={this.addRestaruant}>
          <label htmlFor="">Name:</label>
          <input name="name" onChange={this.handleChange} />
          <label htmlFor="">City:</label>
          <input name="city" onChange={this.handleChange} />
          <label htmlFor="">State:</label>
          <select name="state" id="state" onChange={this.handleChange} value={this.state.restaurant.state}>
            {states.map(st => {
                return <option value={st} key={st} >{st}</option>
            })}
          </select>
          <label htmlFor="">Phone Number:</label>
          <input name="phNumber" onChange={this.handleChange} />
          <label htmlFor="">Genres:</label>
          <select name="genres" id="genres" onChange={this.handleChange} value={this.state.restaurant.genres}>
            {genres.map(genre => {
                return <option value={genre} key={genre} >{genre}</option>
            })}
          </select>
          <button>ADD</button>
        </form>
        <ShowRestaurant
          restaurantlist={this.state.restaurantlist}
          deleteRestaurant={this.deleteRestaurant}
          search={this.state.search}
          byState={this.state.byState}
          byGenre={this.state.byGenre}
        />
      </div>
    )
  }
}


export default MainContainer
