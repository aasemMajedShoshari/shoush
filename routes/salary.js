const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find(
      {},
      {
        "Employee Name": "$employeeName",
        Month: "$month",
        Year: "$year",
        "Marital Status": "$maritalStatus",
        "Basic Salary": "$basicSalary",
        Accomodation: "$accomodation",
        Transportation: "$transportation",
        Bonus: "$bonus",
        "Social Security": "$SSC",
        "Income Tax": "$incomeTax",
        "Medical Insurance": "$medicalInsurance",
        Loan: "$loan",
        "Total Earnings": "$totalEarnings",
        "Total Deductions": "$totalDeductions",
        "Net Salary": "$netSalary",
      }
    );
    res.status(200).json(salaries);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const addSalary = async (req, res) => {
  try {
    const employee = await Employee.findOne({ nameAR: req.body.name });
    const salary = new Salary({
      employeeId: employee._id,
      employeeName: employee.nameAR,
      month: req.body.month,
      year: req.body.year,
      basicSalary: req.body.basicSalary,
      accomodation: req.body.accomodation,
      transportation: req.body.transportation,
      bonus: req.body.bonus,
      incomeTax: req.body.incomeTax,
      medicalInsurance: req.body.medicalInsurance,
      loan: req.body.loan,
    });
    await salary.save();
    res.status(200).json("salary has been added successfully");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const deleteSalary = async (req, res) => {
  try {
    const salary = Salary.findById(req.params.id);
    await salary.deleteOne();
    res.status(200).json("salary has been deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const editSalary = async (req, res) => {
  req.body["employeeName"] = req.body["Employee Name"];
  req.body["month"] = req.body["Month"];
  req.body["year"] = req.body["Year"];
  req.body["basicSalary"] = req.body["Basic Salary"];
  req.body["transportation"] = req.body["Transportation"];
  req.body["accomodation"] = req.body["Accomodation"];
  req.body["bonus"] = req.body["Bonus"];
  req.body["SSC"] = req.body["Social Security"];
  req.body["incomeTax"] = req.body["Income Tax"];
  req.body["medicalInsurance"] = req.body["Medical Insurance"];
  req.body["loan"] = req.body["Loan"];

  delete req.body["Employee Name"];
  delete req.body["Month"];
  delete req.body["Year"];
  delete req.body["Basic Salary"];
  delete req.body["Transportation"];
  delete req.body["Accomodation"];
  delete req.body["Bonus"];
  delete req.body["Social Security"];
  delete req.body["Income Tax"];
  delete req.body["Medical Insurance"];
  delete req.body["Loan"];
  try {
    const salary = Salary.findById(req.body._id);
    await salary.updateOne({ $set: req.body });
    res.status(200).json("salary has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  addSalary,
  getSalaries,
  deleteSalary,
  editSalary,
};
