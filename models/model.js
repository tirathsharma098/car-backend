const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const modelSchema = new Schema({
    car_model: {    
        type: String,
    },
});

const CarModel = model("CarModel", modelSchema);

module.exports = CarModel;
