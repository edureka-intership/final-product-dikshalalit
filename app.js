const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
//import bodyparser
const bodyparser=require('body-parser')

//import routes
const locationRoute=require('./routes/location')
const mealtypeRoute=require('./routes/mealtype')
const restaurantRoute=require('./routes/restaurant')
const menuRouter=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
const signinRoutes=require('./routes/signin')

//create PORT
const PORT=process.env.PORT || 9700;

//create DBSTRING
const DBSTRING=process.env.MONGO_URI ||"mongodb+srv://root:rppt@cluster0.5s7dfff.mongodb.net/assignment_7";
// const DBSTRING="mongodb://localhost/assignment_7"

//connect mongoose
mongoose.connect(DBSTRING,()=>{
    console.log('mongodb connected'),
    e=>console.log('error',e)
})

//create server
var app=express();

//middlewares
app.use(bodyparser.json())
app.use(cors())
app.use('/',locationRoute)

app.use('/',mealtypeRoute)

app.use('/restaurant',restaurantRoute)

app.use('/menu',menuRouter)

app.use('/payment',paymentRoutes)

app.use('/',signinRoutes)


//heroku confirguation
if(process.env.NODE_ENV=='production'){
    console.log("in production")
    app.use(express.static("frontend/build"))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}


//listen
app.listen(PORT,()=>{
    console.log(`this server using port: ${PORT}`)
})