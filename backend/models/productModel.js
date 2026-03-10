const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},
description: {
type: String
},
price: {
type: Number,
required: true
},
category: {
type: String
},
image: {
type: String
},
seller: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
},
{ timestamps: true }
);

module.exports = mongoose.model("product", productSchema);