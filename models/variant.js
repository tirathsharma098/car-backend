const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const variantSchema = new Schema({
    variant: {
        type: String
    }
});

const Variant = model("Variant", variantSchema);

module.exports = Variant;
