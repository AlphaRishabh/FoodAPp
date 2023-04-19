const express = require('express')
const app = express()
const mongoDB = require('./mDB')
const bodyParser = require('body-parser')
app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept"); 
   next();
})
mongoDB();
app.get('/', (req,res)=>{
    res.send("Hello Everyone--"  )
    
});



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(5000,()=>{
    console.log("Port is running succesfully")
})