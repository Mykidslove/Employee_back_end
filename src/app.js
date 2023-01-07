const express = require("express");
const app = express();
require("../src/db/conn");
const Employee = require("../src/models/employee");
const User = require("../src/models/user");
const Staff = require("../src/models/staff");
const cors = require("cors");
const Crec = require("./models/login");

app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  res.set("Access-Control-Allow-Origin", "http://localhost:4200");
  next();
});

app.post("/signUp", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
    const userInsert = await user.save();
    res.json({ message: "User signedup successfully." });
  } catch (e) {
    res.status(404).send(e);
  }
});

// app.post("/login", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     console.log(req.body);
//     const userInsert = await user.save();
//     res.json({message: "User Login successfully."});
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email, password: password }, (err, crec) => {
      if (crec) {
        res.send(crec);
      } else {
        res.send(err);
      }
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

app.post("/employee", async (req, res) => {
  try {
    const addEmployee = new Employee(req.body);
    console.log(req.body);
    const insertemployee = await addEmployee.save();
    res.status(201).send(insertemployee);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.delete("/delete_employee", async (req, res) => {
  try {
    const emp_detail = await Employee.deleteOne({ empId: req.body.empId });
    res.status(201).send("Deleted sucess");
  } catch (err) {
    res.send(err);
  }
});
app.put("/updateEmployee/:id", async (req, res) => {
  Employee.findOneAndUpdate(
    { empId: req.params.id },
    {
      $set: {
        name: req.body.name,
        designation: req.body.designation,
        department:req.body.department,
        salary:req.body.salary

        
      },
    },

    (err, Employee) => {
      if (err) {
        res.send(err);
      } else res.json(Employee);
    }
  );
});

app.get("/employees", async (req, res) => {
  try {
    const getemployees = await Employee.find({});
    res.status(200).send(getemployees);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.get("/employees/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const getemployees = await Employee.find({ empId });
    res.status(201).send(getemployees);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.put("/updateStaff/:id", async (req, res) => {
  Staff.findOneAndUpdate(
    { staff_id: req.params.id },
    {
      $set: {
        staff_name: req.body.staff_name,
        designation: req.body.designation,
        
      },
    },

    (err, Staff) => {
      if (err) {
        res.send(err);
      } else res.json(Staff);
    }
  );
});

// app.put("/updateAccount", async (req, res) => {
//   try {
//     let data = {
//       staff_name: req.body.staff_name,
//       staff_id: req.body.staff_id,
//     };
//     const acc_detail = await Accounts.findByIdAndUpdate(req.body._id, {
//       $set: data,
//     });
//     res.status(201).send("data updated successfully");
//   } catch (err) {
//     res.send(err);
//   }
// });

app.post("/staff", async (req, res) => {
  try {
    const addstaff = new Staff(req.body);
    console.log(req.body);
    const insertstaff = await addstaff.save();
    res.status(201).send(insertstaff);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/getstaff", async (req, res) => {
  try {
    const getstaff = await Staff.find({});
    res.status(201).send(getstaff);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/getstaff/:id", async (req, res) => {
  try {
    const staff_id = req.params.id;
    const getstaff = await Staff.find({ staff_id });
    res.status(201).send(getstaff);
  } catch (e) {
    res.status(404).send(e);
  }
});


app.delete("/delete_staff", async (req, res) => {
  try {
    const staff_detail = await Staff.deleteOne({ staff_id: req.body.staff_id });
    res.status(201).send("Deleted sucess");
  } catch (err) {
    res.send(err);
  }
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
