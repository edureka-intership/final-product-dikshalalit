//import signin schema from model
const signin = require("../model/signin")

exports.getAllsignin = async (req, res) => {

        let signdata = new signin(req.body);
        let result = await signdata.save();
        result = result.toObject();
        delete result.password
        res.send(result)
}




exports.getAlllogin = async (req, res) => {
        console.log(req.body)
        if (req.body.email && req.body.password ) {
                let signdata = await signin.findOne(req.body).select("-password");
                if (signdata) { res.send(signdata)} 
                
                else { res.send({ result: "No User Found" })}
        }
        else
                res.send({ result: "No User Found" })
        }
        



