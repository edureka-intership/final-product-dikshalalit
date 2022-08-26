import React, { useState } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


Modal.setAppElement('#root');


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function Header() {
  const [isLoginModelOpen, setIsLoginModalOpen] = useState(false)
  const [isCreateModelOpen, setIsCreateModalOpen] = useState(false)
  const [isLogoutModelOpen, setIsLogoutModalOpen] = useState(false)
  const [fname, setfname] = useState("")
  const [lname, setlname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")






  const fbCallback=(response)=> {
    console.log("facebook callback responses",response); 
  }



  const collectData = async () => {
    console.warn (fname,lname,email,phone,password);
    let result = await fetch('https://diksha-project.herokuapp.com/usersdata', {
    method: 'post',
    body: JSON.stringify({ fname,lname,email,phone,password }),
    headers: {
    'Content-Type': 'application/json'
    },
    });
    result = await result.json()
    console.warn(result); 
    localStorage.setItem("user",JSON.stringify(result))
  
 
}





  const auth=localStorage.getItem('user');
 

    let hy=JSON.parse(auth);


  


  const LogOut=()=>localStorage.clear('user');


  const handleLogIN = async() =>{
    console.warn ("email,password",email,password);
    let result= await fetch('https://diksha-project.herokuapp.com/userlogin',{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    });
    result = await result.json();
    console.log(result)
      if(result.fname){
        localStorage.setItem("user",JSON.stringify(result));
        
      }
      else{
        alert("check email or password")
      }
    
    
  }


  return (
    <div>
      <div className="navbg">
        <div className="navcontainer container">
          <Link to={`/`} className="navlogo">e!</Link>
          <div className="navbtn">
            {auth ?
            <button type="button" className="navuserbtn"><i class="fa-solid fa-user"  onClick={() => setIsLogoutModalOpen(true)}></i></button>:
            <span><button type="button" className="navloginbtn" onClick={() => setIsLoginModalOpen(true)}>  Login</button> 
            <button type="button" className="navaccountbtn" onClick={() => setIsCreateModalOpen(true)}>Create an account</button></span>
            
            }
          </div>

        </div>
      </div>

      <Modal isOpen={isLoginModelOpen}
        style={customStyles}>

        <h4 className='modelheading'>Login</h4>
        <button onClick={() => setIsLoginModalOpen(false)} className="closeBtn">x</button>

        <form>
          <input type="text" placeholder='Enter Your email' className='loginInput' onChange={(e)=>setemail(e.target.value)} /><br />
          <input type="password" placeholder='password' className='loginInput' onChange={(e)=>setpassword(e.target.value)} /><br />
          <div className='signInBtn'><button className='submitBtn' onClick={handleLogIN}>SignIn</button></div>
        </form>
        <div className="googleFB">
          <div className='or'>Or</div>
          <div>
            <FacebookLogin
            cssClass="facebookStyle"
            appId="1077713396264311"
            callback={()=>fbCallback()}
            />
          </div>

          <div>
            <GoogleLogin className='googleStyle' 
            clientId="1043656881472-jtvobugjgf47etl4n368kvqqh0tkh39c.apps.googleusercontent.com">

            </GoogleLogin>
          </div>
        </div>



      </Modal>



      <Modal isOpen={isCreateModelOpen}
        style={customStyles}>
        <h4 className='modelheading'>Create an Account</h4>
        <button onClick={() => setIsCreateModalOpen(false)} className="closeBtn">x</button>

        <form>
          <input type="text" placeholder='First Name' className='loginInput' 
          value={fname} onChange={(e)=>setfname(e.target.value)}/><br />

          <input type="text" placeholder='Last Name' className='loginInput' 
           value={lname} onChange={(e)=>setlname(e.target.value)}/><br />
          
          <input type="text" placeholder='email Id' className='loginInput'
           value={email} onChange={(e)=>setemail(e.target.value)}/><br />

          <input type="Number" placeholder='phone Number' className='loginInput'
          value={phone} onChange={(e)=>setphone(e.target.value)}/><br />

          <input type="password" placeholder='Create password' className='loginInput'
          value={password} onChange={(e)=>setpassword(e.target.value)}/><br />

          <div className="loginBTn">
            <button className='submitBtn' onClick={collectData}>CreateAccount</button>
            <button className='submitBtn'>SignIn</button>
          </div>

        </form>
      </Modal>




      <Modal isOpen={isLogoutModelOpen}
        style={customStyles} >
        <button onClick={() => setIsLogoutModalOpen(false)} className="closeBtn">x</button>

       <div className='loginInput'>
        <div  className=' navuserbtn2'><i class="fa-solid fa-user fa-user2"></i></div>

        {auth ?<h6 class="username">{hy.fname}{hy.lname}<br/><span style={{fontSize:"15px"}}>{hy.email}</span></h6>:<p>no user found</p>}
        
        <button className='LogOutBtn' onClick={()=>{LogOut(); setIsLogoutModalOpen(false);}}>LogOut</button>
        </div>
      </Modal>







    </div>


  )
}
