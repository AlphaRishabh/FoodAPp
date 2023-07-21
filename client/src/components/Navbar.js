import React, {useState} from "react";
import { Link,useNavigate, } from "react-router-dom";
import Modal from '../Modal';
import Cart from '../screens/Cart';
import Badge from 'react-bootstrap/Badge';
import {useCart} from './ContextReducer';

function Navbar(){
  const [cartView,setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = ()=>
  {
    localStorage.removeItem("authToken")
    navigate("/login")


  }
    return(
        <>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning " >
              <div className="container-fluid">
                <Link className="navbar-brand text-danger " to="/" style={{"fontSize": "2em" }}><i><b>FOODAPP</b></i></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto mb-2">
                    <li className="nav-item">
                      <Link className="nav-link active fs-5 ms-3" aria-current="page" to="/">Home</Link>
                    </li>
                    {(localStorage.getItem("authToken"))?
                    <li className="nav-item">
                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>  {/* index.css - nav-link color white */}
                </li> : ""}
                  
                  </ul>
                  {(!localStorage.getItem("authToken"))?
                  <div className="d-flex">
                  <Link className="btn bg-light text-success mx-1" to="/login">Login</Link>
                    
                    
                    <Link className="btn bg-light text-success mx-1 " to="/createuser">SignUp</Link>
                    </div>    
                   
                   :
                   
                   <div>
                   <div className="btn btn-light text-success mx-2" onClick={()=>{setCartView(true)}}>My Cart{" "}
                   <Badge variant="danger" pill>{data.length}</Badge>
                   </div>

                   {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                   <div className="btn btn-light text-danger mx-2" onClick={handleLogout}>Logout</div>

                   </div>
                    }


                </div>
              </div>
            </nav>
          </div>
        </>
    )
}
export default Navbar
