const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const saltRounds = 10;
const cors = require("cors");
const user = require("./routes/user");
const employee = require("./routes/employee");
const vacation = require("./routes/vacation");
const salary = require("./routes/salary");
const career = require("./routes/career");
const multer = require("multer");
const path = require("path");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("connected to mongoDB");
// });

app.use("/files", express.static(path.join(__dirname, "public/files")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).array("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.post("/signup", (req, res) => {
  user.signUp(req, res, bcrypt, saltRounds);
});

app.post("/login", (req, res) => {
  user.logIn(req, res, bcrypt);
});

app.post("/add-employee", (req, res) => {
  employee.addEmployee(req, res);
});

app.get("/get-employees", (req, res) => {
  res.end("fuck off");
});

app.post("/edit-employee", (req, res) => {
  employee.editEmployee(req, res);
});

app.post("/delete-employee/:id", (req, res) => {
  employee.deleteEmployee(req, res);
});

app.post("/request-vacation", (req, res) => {
  vacation.requestVacation(req, res);
});

app.post("/approve-vacation/:id", (req, res) => {
  vacation.approveVacation(req, res);
});

app.post("/reject-vacation/:id", (req, res) => {
  vacation.rejectVacation(req, res);
});

app.get("/get-vacations", (req, res) => {
  vacation.getVacations(req, res);
});

app.post("/add-salary", (req, res) => {
  salary.addSalary(req, res);
});

app.get("/get-salaries", (req, res) => {
  salary.getSalaries(req, res);
});

app.post("/delete-salary/:id", (req, res) => {
  salary.deleteSalary(req, res);
});

app.post("/edit-salary", (req, res) => {
  salary.editSalary(req, res);
});

app.post("/report", (req, res) => {
  employee.getEmpReport(req, res);
});

app.post("/apply-career", (req, res) => {
  career.applyToCareer(req, res);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("listening at port 8000");
});
