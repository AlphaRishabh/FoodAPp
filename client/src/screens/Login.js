import React , {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
function Login()
{
    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate()
    const handleSubmit = async(event)=>
   
{
   
event.preventDefault();
const response = await fetch("http://localhost:5000/api/loginuser",{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({ email:credentials.email, password:credentials.password})
});
const json = await response.json()
console.log(json)

if(!json.success)
alert("Enter a valid credentials")

if(json.success)
localStorage.setItem("userEmail",credentials.email)
localStorage.setItem("authToken",json.authToken)
console.log(localStorage.getItem("authToken"))
navigate("/")
}
const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
}
    return(
        <>
         <center><h1>LOGIN PANEL</h1></center>
        <div className="container " style={{marginLeft : "490px", marginTop:"70px", width:"500px", height:"500px",backgroundColor:"rgb(121, 122, 86)",paddingLeft:"160px",paddingTop:"120px",borderStyle:"ridge",borderWidth:"3px", borderRadius:"20px"}}>
        <form onSubmit={handleSubmit}>
    
  <div className="mb-3 ">
    <label HTMLfor="exampleInputEmail" className="form-label  text-white">Email address</label>
    <input type="email" className="form-control w-50" id="exampleInputEmail" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" class="form-text text-white">We'll never share your email .</div>
  </div>
  <div className="mb-3 ">
    <label HTMLfor="exampleInputPassword" className="form-label  text-white">Password</label>
    <input type="password" className="form-control w-50" id="exampleInputPassword" name='password' value={credentials.password} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className="m-3 btn btn-danger">I'm a new user</Link>
</form>
        </div>
        </>
    )
}
export default Login