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
      const response = await fetch( `${process.env.REACT_APP_API}/api/v1/restaurant`, {
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

    console.log('hi?');
  }


  addRestaruant  = async(e) => {
    console.log('here?');

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/restaurant/`, {
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

      console.log('parsedResponse', parsedResponse);

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
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/restaurant/` + id, {
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
      'States', "All", 'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida', 'Georgia','Hawaii','Idaho','IllinoisIndiana',
      'Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','MontanaNebraska','Nevada','New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina','North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'PennsylvaniaRhode Island',
      'South Carolina','South Dakota','Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington','West Virginia','Wisconsin','Wyoming',
    ]

    const genres = ['Genres', 'All', 'Fine Dining', 'Casual Dining', 'Family Style', 'Fast Food', 'Cafe', 'Buffet', 'Food Trucks']


    return(
      <div>
        <div className="font-weight-bold text-center mt-5 h1">Restaurant List</div>

        <div className="container mt-5">
          <form className="row offset-3">
            <input onChange={this.handleSearchChange} value={this.state.searchString} className="col-5"/>
            <button type="button" className="col-2 ml-2 btn btn-secondary">SEARCH</button>
          </form>
          <div className="row mt-3 offset-2">
            <label className="mr-2 mt-2">Filter By:</label>
            <select className="col-3 mr-3" name="state" id="state" onChange={this.handleByStateChange} value={this.state.state} >
              {states.map(st => {
                  return <option value={st} key={st} >{st}</option>
              })}
            </select>
            <select className="col-3" name="genres" id="genres" onChange={this.handleByGenreChange} value={this.state.genres}>
              {genres.map(genre => {
                  return <option value={genre} key={genre} >{genre}</option>
              })}
            </select>
          </div>
        </div>

        <form onSubmit={this.addRestaruant} className="contianer mt-5 offset-1">
          <div className="row ml-5">
            <div className="form-group mr-1 ml-1">
              <input className="form-control" name="name" onChange={this.handleChange} value={this.state.restaurant.name} placeholder="Restaurant Name"/>
            </div>
            <div className="form-group mr-1">
              <input className="form-control" name="city" onChange={this.handleChange} value={this.state.restaurant.city} placeholder="City"/>
            </div>
            <div className="form-group mr-1">
              <select className="form-control" name="state" id="state" onChange={this.handleChange} value={this.state.restaurant.state}>
                {states.map(st => {
                    return <option value={st} key={st} >{st}</option>
                })}
              </select>
            </div>
            <div className="form-group mr-1">
              <input className="form-control" name="phNumber" onChange={this.handleChange} value={this.state.restaurant.phNumber}placeholder="Phone Number"/>
            </div>
            <div className="form-group mr-1">
              <select className="form-control" name="genres" id="genres" onChange={this.handleChange} value={this.state.restaurant.genres}>
                {genres.map(genre => {
                    return <option value={genre} key={genre} >{genre}</option>
                })}
              </select>
            </div>
            <div className="form-group">
              <button className="form-control btn btn-secondary pl-4 pr-4">ADD</button>
            </div>
          </div>
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
