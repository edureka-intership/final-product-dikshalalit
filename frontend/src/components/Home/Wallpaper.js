import React, { Component } from 'react'
import '../style/Wallpaper.css'
import {Link} from 'react-router-dom'


export default class Wallpaper extends Component {

    constructor(){
        super();
        this.state={
            location:[],
            restaurant:[]
        }
    }

    componentDidMount(){
        fetch('https://diksha-project.herokuapp.com/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({location:data.data}))
    }

    fetchRestaurantbylocation=(event)=>{
        fetch(`https://diksha-project.herokuapp.com/restaurant/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurant:data.data}))
    }

   
    


  render() {
    console.log(this.state.location)
    console.log(this.state.restaurant)

    const locationlist=this.state.location.length && this.state.location.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)

    const restaurantlist=this.state.restaurant.length && <ul className='ultag'>
                                                            {this.state.restaurant.map(item=>
                                                            <li key={item.name}>
                                                                <Link to={`/detail/${item.name}`}>{item.name}</Link>
                                                            </li>)}
                                                         </ul>


    return (
      <div>
    <div className="container-fluid banner-img">
    <div className="container">

         
    <div className="bannerbtn">
        <button type="button" className="loginbtn">Login</button>
        <button type="button" className="accountbtn">Create an account</button>
    </div>


    <div className="logo mx-auto">e!</div>


    <div className="bcontent text-center">
        Find the best restaurants, cafes, and bars
    </div>

    <div className="locationbtn">

        <select className="locationDropdown" onChange={this.fetchRestaurantbylocation}>
            <option value="0" selected disabled>Please type a location</option>
            {locationlist}
        </select>

        <div>
            <input className="restsearch" type="search" placeholder=" Search for restaurants" aria-label="Search"/>
            {restaurantlist}
        </div>

    </div>

    </div>
    </div>
      </div>
    )
  }
}

