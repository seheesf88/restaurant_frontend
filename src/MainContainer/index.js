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
      findRestaurant: '',
      findStates: [],
      findGenres: []
    }
  }

  componentDidMount(){
    this.getRestaurant()
  }

  //get

  getRestaurant = async() => {
    try{
      const response = await fetch( `${process.env.REACT_APP_API}/api/v1/restaurant`, {
        credentials: 'include',
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
        search : e.target.value,
        byState : e.target.value,
        byGenre : e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();

    let restaurant = this.state.search.toLowerCase();
    let findState = this.state.byState;
    let findGenre = this.state.byGenre;
    let mylist = this.state.restaurantlist;
    let stateArr = [];
    let genreArr = [];


    for(let i = 0; i < mylist.length; i++){
      let ele = mylist[i]
      console.log(ele['genres'])
      if(ele['name'] === restaurant){
        this.setState({
          ...this.state,
          findRestaurant : ele
        })
      }else if(ele['state'] === findState){
        stateArr.push(ele)
        this.setState({
          ...this.state,
          findStates : stateArr
        })
      }else if(ele['genres'] === findGenre){
        genreArr.push(ele)
        this.setState({
          ...this.state,
          findGenres : genreArr
        })
      }
    }

  }


  render(){
    console.log(this.state.findGenres)
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
          <form onSubmit={this.handleSubmit} className="row offset-3">
            <div className="row col-6">
              <input onChange={this.handleSearchChange} value={this.state.searchString} className="container"/>
                <div className="row mt-3 ml-1">
                  <label className="mt-2 mr-2">Filter By:</label>
                  <select className="col-4 mr-1" name="state" id="state" onChange={this.handleSearchChange} value={this.state.state} >
                    {states.map(st => {
                        return <option value={st} key={st} >{st}</option>
                    })}
                  </select>
                  <select className="col-4" name="genre" id="genre" onChange={this.handleSearchChange} value={this.state.genre}>
                    {genres.map(genre => {
                        return <option value={genre} key={genre} >{genre}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-2 ">
                <button className="btn btn-secondary py-4 mt-1 ml-1">SEARCH</button>
              </div>
            </form>
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
          findRestaurant={this.state.findRestaurant}
          findStates={this.state.findStates}
          findGenres={this.state.findGenres}
          byState={this.state.byState}
        />
      </div>
    )
  }
}


export default MainContainer
