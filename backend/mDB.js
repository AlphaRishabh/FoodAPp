const mongoose = require('mongoose');
const mongoURL ='mongodb+srv://rishabh07:Rishabh07@cluster0.bn3hvk0.mongodb.net/FoodApp?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true });
        console.log("Connected");

        const fetched_data = await mongoose.connection.db.collection('food_items');
        const data = await fetched_data.find({}).toArray();

        const food_category = await mongoose.connection.db.collection('food_category');
        const catData = await food_category.find({}).toArray();

        global.food_items = data;
        global.food_category = catData;
    } catch (err) {
        console.log("--" + err);
    }
};

module.exports = mongoDB;
