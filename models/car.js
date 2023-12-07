const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const carSchema = new Schema({
    make: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Make",
    },
    carModel: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarModel",
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
    },
    reg_number: {
        type: String,
        unique: true
    },
});

const Car = model("Car", carSchema);

module.exports = Car;
