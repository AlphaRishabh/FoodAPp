import React, { useState } from 'react'
import { Link } from "react-router-dom";

function SignUp()
{
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async(event)=>
{
    
event.preventDefault();
const response = await fetch("http://localhost:5000/api/createuser",{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password,location:credentials.geolocation})
});
const json = await response.json()
console.log(json)
if(!json.success)
alert("Enter a valid credentials")
}
const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
}

    return(
        <>
        <center><h1>REGISTRATION FORM</h1></center>
        <div className="container" style={{marginLeft : "450px",paddingTop:"30px",paddingLeft:"180px", marginTop:"50px", width:"600px", height:"500px",backgroundColor:"rgb(121, 122, 86)",borderStyle:"ridge",borderWidth:"3px", borderRadius:"20px"}}>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label HTMLfor="name" className="form-label text-white">Name</label>
    <input type="text" className="form-control w-50" name='name' value={credentials.name} onChange={onChange}/>

  </div>
  <div className="mb-3 ">
    <label HTMLfor="exampleInputEmail" className="form-label  text-white">Email address</label>
    <input type="email" className="form-control w-50" id="exampleInputEmail" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" class="form-text text-light">We'll never share your email with anyone.</div>
  </div>
  <div className="mb-3 ">
    <label HTMLfor="exampleInputPassword" className="form-label  text-white">Password</label>
    <input type="password" className="form-control w-50" id="exampleInputPassword" name='password' value={credentials.password} onChange={onChange}/>
  </div>
   <div className="mb-3 ">
    <label HTMLfor="exampleInputLocation" className="form-label  text-white">Address</label>
    <input type="text" className="form-control w-50" id="exampleInputLocation" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Already Registered</Link>
</form>
        </div>
        </>
    )
}
export default SignUp;