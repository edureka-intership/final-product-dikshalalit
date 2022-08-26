import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';




export default function RestaurantPage() {

    const [restaurant, setRestaurant] = useState({})
    const [menu, setMenu] = useState({})
    const [isMenuOpen, setisMenuOpen] = useState(false)
    let { cName } = useParams()
    const [totalprice,settotalprice]=useState(0)

    useEffect(() => {
        fetch(`https://diksha-project.herokuapp.com/restaurant/name/${cName}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setRestaurant(data.data))
    }, [])

    const fetchMenu = () => {
        (
            fetch(`https://diksha-project.herokuapp.com/menu/${cName}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => setMenu(data.data))
        )
    }


    const CalTotalPrice = (item) => {
        
           let price=totalprice+item.itemPrice;
           settotalprice(price)
        
    }

    const loadScript=(rpScript)=>{
        console.log("script is getting added..",rpScript)
        return new Promise((resolve)=>{
            const script=document.createElement("script");
            script.src=rpScript;
            script.onload=()=>{
                console.log("sucess");
                openRazorpay();
                resolve(true)
            }

            script.onerror=()=>{
                console.log("failure");
                resolve(false);
            }
            document.body.appendChild(script);
            console.log(document.body.getElementsByTagName('script'))
        })
    }


    const openRazorpay=async()=>{
        try{
            let orderData;

            orderData=await fetch('https://diksha-project.herokuapp.com/payment',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({amount:totalprice})

        }).then(resp=>resp.json())

            console.log(orderData)

            const options={
            key:"rzp_test_4HtLWyd110aCIw",
            amount:orderData.amount,
            order_id:orderData.id,
            currency:orderData.currency,
            name:'Zomato food delivery app',

            prefill:{
                email:'abcdef@gmailll.com',
                contact:'202-555-0183'  
            },
            handler:function(response){
                console.log(response)
                fetch('https://diksha-project.herokuapp.com/payment/save',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    razorpay_orderid:response.razorpay_order_id,
                    razorpay_paymentid:response.razorpay_payment_id,
                    razorpay_signature:response.razorpay_signature,
                    razorpay_amount:orderData.amount
                })
                }).then(resp=>console.log(resp))
            }
        }
        const paymentWindow=new window.Razorpay(options);
        paymentWindow.open()
    }
    
    catch(error){
        console.log(error)
    }
}




    const { name, locality, thumb, address, cost, Cuisine } = restaurant
    const CuisineList = !(Cuisine == undefined) && Cuisine.length && <ul>{Cuisine.map(item => <li key={item.name}>{item.name}</li>)}</ul>


    return (
        <div>
            <Header />

            <div className="container mt-5">
                <img src={thumb} alt="wallpaper" className='deatil_img' />
                <div className="Rdetail">
                    <div className="deatil_head">{name}</div>
                    <button className="placeOrder" onClick={() => { fetchMenu(); setisMenuOpen(true) }}>Place an Order</button>
                </div>
            </div>

            <div className="container mt-3">
                <Tabs>
                    <TabList>
                        <Tab><h6 className="about_detail">Overview</h6></Tab>
                        <Tab><h6 className="about_detail">Contact</h6></Tab>
                    </TabList>

                    <TabPanel>
                        <h5 className="about_detail">About this place</h5>
                        <h6 className="haed_detail">Cuisine</h6>
                        {CuisineList}
                        <h6 className="haed_detail">Average cost</h6>
                        <p><i className="fa-solid fa-indian-rupee-sign"></i>{cost}</p>
                    </TabPanel>
                    <TabPanel>
                        <h5 className="about_detail">Get in Touch</h5>
                        <h6 className="haed_detail">Address</h6>
                        <p>{address}</p>
                        <h6 className="haed_detail">City</h6>
                        <p>{locality}</p>
                    </TabPanel>
                </Tabs>
            </div>


            <Modal isOpen={isMenuOpen}>

                <h4 className='menu'>Menu</h4>
                <div className="MenuHead">
                    <button onClick={() => setisMenuOpen(false)} className="closeMenuBtn">x</button>
                </div>
                <div>
                    <div>
                        <div className="container-fluid">
                            <div className="row">

                                {
                                    menu.length && menu.map((item, index) =>

                                        <div className="col-lg-4 col-md-6">
                                            <div key={index} className="menuBox">
                                                <div className="menuDisply">
                                                    <div><img src={item.thumb} className="menuThumb" /></div>
                                                    <div className="menuContent">
                                                        <div className='itemName'>{item.itemName}</div>
                                                        <div className='itemDescription'>{item.itemDescription}</div>
                                                        {item.isVeg ? <span className="veg-noveg"><span>Veg<input type='checkbox' className="veg" checked /></span>
                                                            <span> Non-Veg<input type='checkbox' className="nonveg" /></span></span>
                                                            :
                                                            <span className="veg-noveg"><span>Veg<input type='checkbox' className="veg"  /></span>
                                                            <span> Non-Veg<input type='checkbox' className="nonveg" checked/></span></span>
                                                        }

                                                        <div ><span className="cost">Cost:</span> <i className="fa-solid fa-indian-rupee-sign"></i>{item.itemPrice}</div>
                                                        <button className="AddBtn" onClick={()=>CalTotalPrice(item)}>Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}


                            </div>
                            <hr />
                            <h4 className='totalprice'>
                                <div>Total Price :{totalprice}</div>
                                <button className="payNowBtn" onClick={()=>{setisMenuOpen(false); loadScript('https://checkout.razorpay.com/v1/checkout.js')}}>Pay Now</button>
                            </h4>
                        </div>
                    </div>
                </div>


            </Modal>









        </div>
    )
}
