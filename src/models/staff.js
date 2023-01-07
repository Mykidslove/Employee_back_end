const express = require("express");
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staff_id: {
    type: String,
  },
  staff_name: {
    type: String,
  },
  designation: {
    type: String,
  },
  
});

const Staff = new mongoose.model("Staff", staffSchema);

module.exports = Staff;
