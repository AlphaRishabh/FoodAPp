const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
  if (!req.body.order_data || req.body.order_data.length === 0) {
    res.status(400).send("Order data is missing or empty");
    return;
  }

  let data = req.body.order_data;
  data.splice(0, 0, { Order_date: req.body.order_date });

  try {
    let eId = await Order.findOne({ 'email': req.body.email });
    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
      res.status(200).json({ success: true });
    } else {
      await Order.findOneAndUpdate({ email: req.body.email },
        { $push: { order_data: data } });
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error", error.message);
  }
});

router.post('/myorderData', async (req, res) => {
  try {
    let myData = await Order.findOne({ 'email': req.body.email });
    if (myData === null) {
      res.status(404).send("Order data not found");
    } else {
      res.json({ orderData: myData });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error", error.message);
  }
});

module.exports = router;
