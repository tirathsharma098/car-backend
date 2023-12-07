const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const makeSchema = new Schema({
    make: {
        type: String
    }
});

const Make = model("Make", makeSchema);

module.exports = Make;
