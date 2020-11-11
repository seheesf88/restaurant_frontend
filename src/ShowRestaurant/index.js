import React from 'react';

const ShowRestaurant = (props) => {

  const list = props.restaurantlist;
  const findStates = props.findStates;
  const findGenres = props.findGenres;

  //alphabeticall order
  function order(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();

     return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  list.sort(function(a, b) {
    return order(a.name, b.name);
  })


  const restaurantlist = list.slice(0, 11).map(restaurant => {
      return (
        <tr key={restaurant._id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.city}</td>
          <td>{restaurant.state}</td>
          <td>{restaurant.phNumber}</td>
          <td>{restaurant.genres}</td>
          <td><button type="button" onClick={props.deleteRestaurant.bind(null, restaurant._id)}>DELETE</button></td>
        </tr>
        )
  });

  const findRestaurant = <tr key={props.findRestaurant._id}>
                    <td>{props.findRestaurant.name}</td>
                    <td>{props.findRestaurant.city}</td>
                    <td>{props.findRestaurant.state}</td>
                    <td>{props.findRestaurant.phNumber}</td>
                    <td>{props.findRestaurant.genres}</td>
                    <td><button onClick={props.deleteRestaurant.bind(null, props.findRestaurant._id)}>DELETE</button></td>
                  </tr>


  const byState = findStates.slice(0, 11).map(res => {
      return (
        <tr key={res._id}>
          <td>{res.name}</td>
          <td>{res.city}</td>
          <td>{res.state}</td>
          <td>{res.phNumber}</td>
          <td>{res.genres}</td>
          <td><button type="button" onClick={props.deleteRestaurant.bind(null, res._id)}>DELETE</button></td>
        </tr>
        )
  });


  const byGenre = findGenres.slice(0, 11).map(res => {
      return (
        <tr key={res._id}>
          <td>{res.name}</td>
          <td>{res.city}</td>
          <td>{res.state}</td>
          <td>{res.phNumber}</td>
          <td>{res.genres}</td>
          <td><button type="button" onClick={props.deleteRestaurant.bind(null, res._id)}>DELETE</button></td>
        </tr>
        )
  });



return(
  <div>
    <div className="container mb-5">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col" className="mr-0">NAME</th>
              <th scope="col">CITY</th>
              <th scope="col">STATE</th>
              <th scope="col">PHONE NUMBER</th>
              <th scope="col">GENRES</th>
              <th scope="col" className="pr-0">delete</th>
            </tr>
          </thead>
          <tbody>
             { restaurantlist }
          </tbody>
        </table>
    </div>
    <div>{}</div>
  </div>

  )
}
export default ShowRestaurant
