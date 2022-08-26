import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../common/Header'
import "./Filter.css"

export default function Filter() {

    const [pageCount, setPageCount] = useState(0)
    let { fname } = useParams()
    const [restaurant, setRestaurant] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [setlocation, setLocationName] = useState([])

    const [filter, setFilter] = useState({
        city_id: '',
        cuisine: [],
        location: [],
        hcost: '',
        lcost: '',
        sort: 1,

    })


    useEffect(() => {
        fetch(`https://diksha-project.herokuapp.com/restaurant/filter/${fname}/${CurrentPage}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filter)
            }).then(response => response.json())
            .then(data => { setRestaurant(data.data); setPageCount(data.totalRecords / 2) })
    }, [filter, CurrentPage])



    useEffect(() => {
        fetch('https://diksha-project.herokuapp.com/location', { method: 'GET' })
            .then(response => response.json())
            .then(data => { setlocation(data.data) })
    }, [])






    const handleSort = (sort) => {
        filter.sort = sort;
        setFilter({ ...filter })
    }


    const handleLocation = (ll) => {
        filter.city_id = ll;
        setFilter({ ...filter })
    }



    const handleCost = (lcost, hcost) => {
        filter.lcost = lcost;
        filter.hcost = hcost;
        setFilter({ ...filter })
    }





    const handleCuisine = (e) => {
        if (e.target.checked)
            filter.cuisine.push(e.target.name)
        else {
            let index = filter.cuisine.indexOf(e.target.name)
            if (index > -1)
                filter.cuisine.splice(index, 1)
        }
        setFilter({ ...filter })
    }


    const displayLocation = (e)=>{
        if(e == 1)
            setLocationName( `in Delhi`)
        else if (e == 2)
            setLocationName( `in Mumbai`)
        else if (e == 3)
            setLocationName( `in Pune`)
        else if (e == 4)
            setLocationName( `in Bangalore`)
        else if (e == 5)
            setLocationName( `in Chandigarh`)
        else if (e == 6)
            setLocationName( `in Chennai`)
        else
            setLocationName('')

    }







    const paginationItems = [];
    for (let i = 1; i <= pageCount; i++)
        paginationItems[i] = <a href="#" key={i} className="page" onClick={() => setCurrentPage(i)}>{i}</a>

    // const locationlist = location.length && location.map(item => <option key={item.name} value={item.city_id}>{item.name}</option>)

    return (

        <div>
            <Header />
            <div className="container">
                <h1 className="heading">
                    {/* {restaurant.map((item,index)=>
                   <span>{item.meals}</span>
                )} */}{fname}
                    &nbsp; Places &nbsp;
                    {setlocation}
                    {/* {restaurant.map((item, index) =>
                        <span>{item.city_name}</span>
                    )} */}



                </h1>
            </div>





            <div className="contain">


                <div className="filter">

                    <div className="filterhead">Filters</div>

                    <div className="location">Select Location</div>

                    <div>
                        <select className="select" onChange={(ll) => {handleLocation(ll.target.value); displayLocation(ll.target.value)}}>
                            <option disabled selected value>Select Location</option>

                            <option value="1" className="optionStyle" >Delhi</option>
                            <option value="2" className="optionStyle" >Mumbai</option>
                            <option value="3" className="optionStyle" >Pune</option>
                            <option value="4" className="optionStyle" >Bangalore</option>
                            <option value="5" className="optionStyle" >Chandigarh</option>
                            
                        </select>
                    </div>

                    <div className="Cuisine">Cuisine</div>


                    <input type="checkbox" id="checkone" className="check" name="North Indain" onChange={(e) => handleCuisine(e)} />
                    <span className="checkhead">North Indian</span><br />
                    <input type="checkbox" className="check" name="South Indian" onChange={(e) => handleCuisine(e)} />
                    <span className="checkhead">South Indian</span><br />
                    <input type="checkbox" className="check" name="Chinese" onChange={(e) => handleCuisine(e)} />
                    <span className="checkhead">Chinese</span><br />
                    <input type="checkbox" className="check" name="Fast Food" onChange={(e) => handleCuisine(e)} />
                    <span className="checkhead">Fast Food</span><br />
                    <input type="checkbox" className="check" name="Street Food" onChange={(e) => handleCuisine(e)} />
                    <span className="checkhead">Street Food</span><br />




                    <div className="cost">Cost For Two</div>

                    <input type="radio" name="cost" className="radiobtn" onChange={() => handleCost(0, 500)}></input><span className="radiohead">Less than ' 500</span><br />
                    <input type="radio" name="cost" className="radiobtn" onChange={() => handleCost(500, 1000)}></input><span className="radiohead">' 500 to ' 1000</span><br />
                    <input type="radio" name="cost" className="radiobtn" onChange={() => handleCost(1000, 1500)}></input><span className="radiohead">' 1000 to ' 1500</span><br />
                    <input type="radio" name="cost" className="radiobtn" onChange={() => handleCost(1500, 2000)}></input><span className="radiohead">' 1500 to ' 2000</span><br />
                    <input type="radio" name="cost" className="radiobtn" onChange={() => handleCost(2000, 3500)}></input><span className="radiohead">' 2000+</span><br />


                    <div className="sort">Sort</div>

                    <input type="radio" name="sort" className="radiobtn" onChange={() => handleSort(1)} /><span className="radiohead">Price low to high</span><br />
                    <input type="radio" name="sort" className="radiobtn" onChange={() => handleSort(-1)} /><span className="radiohead">Price high to low</span><br />


                </div>






                <div>
                    {restaurant.length > 0 ? restaurant.map((item, index) =>
                        <div className="part">
                            <div className="part1">

                                <table>
                                    <tr>
                                        <td><img src={item.thumb} className="partimg" /></td>

                                        <td className="bigchill">
                                            <span className="Chead1">{item.name}</span><br />
                                            <span className="Chead2">{item.locality}</span><br />
                                            <span className="Chead3">{item.address}</span><br />
                                        </td>
                                    </tr>
                                </table>


                                <div className="line"></div>


                                <table>
                                    <tr>
                                        <td className="costtwo">CuisineS:</td>
                                        <td className="bakery700">{item.Cuisine.length && item.Cuisine.map((item) => item.name + "  ")}</td>
                                    </tr>

                                    <tr>
                                        <td className="costtwo">Cost</td>
                                        <td className="bakery700"><i className="fa-solid fa-indian-rupee-sign"></i>{item.cost}</td>
                                    </tr>

                                </table>


                            </div>
                        </div>) : <div>no data</div>}



                    <div className="Pagenation">

                        {paginationItems}


                    </div>




                </div>
            </div>
        </div>

    )
}
