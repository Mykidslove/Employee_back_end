const express = require("express");
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
  },
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  department: {
    type: String,
  },
  salary: {
    type: String,
  },
});

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee;
