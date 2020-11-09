import React from 'react';
import { withRouter, Link } from 'react-router-dom';


const ShowRestaurant = (props) => {

console.log(props)
  const list = props.restaurantlist
  console.log('??', typeof list);
  const restaurantlist = list.map(restaurant => {
    console.log(restaurant)
    return(

        <tr key={restaurant._id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.city}</td>
          <td>{restaurant.state}</td>
          <td>{restaurant.phNumber}</td>
          <td>{restaurant.genres}</td>
          <td><button type="button" onClick={props.deleteRestaurant.bind(null, restaurant._id)}>DELETE</button></td>

        </tr>

    )
  })

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
             {restaurantlist}
          </tbody>
        </table>
    </div>
  </div>

  )
}
export default ShowRestaurant
