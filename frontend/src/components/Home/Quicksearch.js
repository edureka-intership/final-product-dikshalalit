import React, { Component } from 'react'
import MealType from './Mealtype';

export default class Quicksearch extends Component {

    constructor() {
        super();
        this.state = {
            MealType: []
        }
    }


    componentDidMount() {
        fetch('https://diksha-project.herokuapp.com/mealtype', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ MealType: data.data }))
    }


    render() {

        const MealTypelist=this.state.MealType.length && this.state.MealType.map(item=>
                                                                
                                                                    <MealType key={item.name} item={item}></MealType>
                                                                ) 

        return (
            <div>
                <div className="container">
                    <div className="search">
                        <div className="quick">Quick Searches</div>
                        <div className="discover">Discover restaurants by type of meal</div>
                    </div>


                    <div className="row">
                        {MealTypelist}
                    </div>
                </div>
            </div>
        )




    }
}
