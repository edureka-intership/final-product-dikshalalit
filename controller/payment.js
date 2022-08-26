const Razorpay=require('razorpay');
const shortid=require('shortid');
const Transcation=require('../model/transcation')
const crypto=require('crypto')



var instance = new Razorpay({
    key_id: 'rzp_test_4HtLWyd110aCIw',
    key_secret: 'sGBbECgC0lXzgd5cVQV5VNXd'
})

exports.createOrder =async (req, res) => {
    let options={
            amount: req.body.amount *100,
            currency: "INR",
            receipt: shortid.generate(),
            notes: {
                key1: "value3",
                key2: "value2"}
            }

    


    try{const response=await instance.orders.create(options)
        console.log(response)
        res.json(response)
    }
    catch(error){
        console.log(error)
    }
}

exports.saveTranscation=(req,res)=>{
    console.log('saving transcation!!',req.body);
    const generateSignature=crypto.createHmac('sha256', instance.key_secret);

    generateSignature.update(req.body.razorpay_orderid+"|"+req.body.razorpay_paymentid)

    if(req.body.razorpay_signature == generateSignature.digest('hex')){
        console.log("created transcation object");
       const transcation=  new Transcation ({
            transcation_id:req.body.razorpay_paymentid,
            transcation_amount:req.body.razorpay_amount
        })

        transcation.save(function(err,saveTranscation){
            if(err)
            {
                console.log("error occured")
                return res.status(500).send("some error Occured",error)
            }
            res.status(200).send({transcation:transcation})
        })
    }
}



