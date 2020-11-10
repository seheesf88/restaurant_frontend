import React from 'react';
import { withRouter, Link } from 'react-router-dom';


const ShowRestaurant = (props) => {

  const list = props.restaurantlist
  const searchWord = props.search.toLowerCase()
  const byState = props.byState
  const byGenre = props.byGenre
  console.log('shiw', byGenre)

  // if(searchWord){
  //   console.log('true');
  //   const searchRestarunt = (searchWord) => {
  //     console.log('here?');
  //     for(let i = 0; i < list.length; i++){
  //       let each = list[i]
  //
  //       if(searchWord.indexOf(each['name']) > -1){
  //         return(
  //           <div>
  //             here
  //           </div>
  //         )
  //       }else{
  //         console.log('no')
  //       }
  //     }
  //
  //   }
  //
  // }



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
    const element = <tr key={restaurant._id}>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.city}</td>
                      <td>{restaurant.state}</td>
                      <td>{restaurant.phNumber}</td>
                      <td>{restaurant.genres}</td>
                      <td><button type="button" onClick={props.deleteRestaurant.bind(null, restaurant._id)}>DELETE</button></td>
                    </tr>

    if(byState === 'All'){
      return element
    }else{
      if(byState === restaurant.state){
        return element
      }
    }

    if(byGenre === 'All'){
      return element
    }else{
      if(byGenre === restaurant.genres){
        return element
      }
    }
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
    <div>{}</div>
  </div>

  )
}
export default ShowRestaurant
