
import React from 'react'
import {Link} from 'react-router-dom'
export default function MealType(props) {
    return (
       

            <div className=" col-lg-4 col-md-6">
                <div className="card  mx-auto" >
                    <div className="card-content">
                    <Link to={`/filter/${props.item.name}`}  ><img src={require(`../`+props.item.image)} alt="breakfast" className="card-img"/>
                    </Link><div className="ms-4">
                            <div className="cardhead"  style={{ textDecoration: 'none' }}>{props.item.name}</div>
                            <div className="cardtext">{props.item.content}</div>
                        </div>
                    </div>
                </div>
            </div>

       
    )
}

