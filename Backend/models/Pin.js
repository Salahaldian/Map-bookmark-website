const mongoose = require("mongoose")

const PinSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3
    },
    desc: {
      type: String,
      required: true,
      min: 3
    },
    // الاحداثيات
    // خط العرض
    lat: {
      type: Number,
      required: true
    },
    // خط الطول
    long: {
      type: Number,
      required: true
    }
  }, 
  {
    timestamps:true
  } 
);

module.exports = mongoose.model("Pin", PinSchema);