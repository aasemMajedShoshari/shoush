const Vacation = require("../models/Vacation");
const Employee = require("../models/Employee");

const getVacations = async (req, res) => {
  try {
    const vacations = await Vacation.find(
      {},
      {
        "Employee Name": "$employeeName",
        Type: "$type",
        "Start Date": "$startDate",
        "End Date": "$endDate",
        "Number Of Hours": "$numberOfHours",
        "Number Of Days": "$numberOfDays",
        Status: "$status",
      }
    );
    res.status(200).json(vacations);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const requestVacation = async (req, res) => {
  try {
    const employee = await Employee.findOne({ nameAR: req.body.name });
    const vacation = new Vacation({
      employeeId: employee._id,
      employeeName: employee.nameAR,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numberOfHours: req.body.numberOfHours,
      numberOfDays: req.body.numberOfDays,
    });
    await vacation.save();
    res.status(200).json("vacation has been requested successfully");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const approveVacation = async (req, res) => {
  try {
    const vacation = await Vacation.findById(req.params.id);
    await vacation.updateOne({ status: "approved" });
    res.status(200).json("vacation has been approved sucessfully");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};
const rejectVacation = async (req, res) => {
  try {
    const vacation = await Vacation.findById(req.params.id);
    await vacation.updateOne({ status: "rejected" });
    res.status(200).json("vacation has been rejected sucessfully");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports = {
  requestVacation,
  getVacations,
  approveVacation,
  rejectVacation,
};
