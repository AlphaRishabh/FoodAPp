import React, { useState,useRef, useEffect } from "react";
import {useDispatchCart, useCart} from './ContextReducer'

function Card(props)
 {
    let dispatch = useDispatchCart() 
    let data = useCart ()
    const priceRef = useRef()
  let options = props.options;
  let priceOptions = options ? Object.keys(options) : []; 
  const [qty,setQty]=useState(1)
  const [size,setSize] = useState("")

  const handleAddToCart =async ()=>{
let food = []
for(const item of data){
if(item.id === props.foodItem._id)
{
  food= item;
  break
}
  }
if (food !== []) {
  if (food.size === size) {
    await dispatch({ type: "UPDATE", id:props.foodItem._id, price: finalPrice, qty: qty })

    return
  }

else if(food.size!==size){
  await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice, qty: qty, size:size})
  return
  // console.log(data);
  }
  return
}
await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice, qty: qty, size:size})
}
  let finalPrice = qty * parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (

    <div class="card mt-4" style={{ "width": "18rem", "maxHeight": "470px", backgroundColor:"rgb(240, 230, 124)" }}>
      <img src={props.foodItem.img} class="card-img-top " alt="FoodImg" style={{height:"170px",objectFit:"fill"}} />
      <div class="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select className='m-2 h-100  bg-success text-light' onChange={(e)=> setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>
          <select className='m-2 h-100 bg-success text-light rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
            {priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })}
          </select>
          <div className='d-inline fs-5'>
            <b> ₹{finalPrice}/-</b>
          </div>
        </div>
        <hr>
        </hr>
        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Card;
