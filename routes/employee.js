const Employee = require("../models/Employee");
const Vacation = require("../models/Vacation");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(
      {},
      {
        "Account Number": "$accountNumber",
        "Employee Name ( AR )": "$nameAR",
        "Employee Name ( EN )": "$nameEN",
        Gender: "$gender",
        Age: "$age",
        "Marital Status": "$maritalStatus",
        Designation: "$designation",
        "Phone Number": "$phoneNumber",
        City: "$city",
        Manager: "$isManager",
        "Hire Date": "$hireDate",
        "Birth Date": "$birthDate",
        "Creation Date": "$createdAt",
        "Update Date": "$updatedAt",
      }
    );
    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const editEmployee = async (req, res) => {
  req.body["accountNumber"] = req.body["Account Number"];
  req.body["gender"] = req.body["Gender"];
  req.body["age"] = req.body["Age"];
  req.body["designation"] = req.body["Designation"];
  req.body["city"] = req.body["City"];
  req.body["nameAR"] = req.body["Employee Name ( AR )"];
  req.body["nameEN"] = req.body["Employee Name ( EN )"];
  req.body["hireDate"] = req.body["Hire Date"];
  req.body["birthDate"] = req.body["Birth Date"];
  req.body["maritalStatus"] = req.body["Marital Status"];
  req.body["phoneNumber"] = req.body["Phone Number"];
  req.body["isManager"] = req.body["Manager"];

  delete req.body["Account Number"];
  delete req.body["Gender"];
  delete req.body["Age"];
  delete req.body["Designation"];
  delete req.body["City"];
  delete req.body["Employee Name ( AR )"];
  delete req.body["Employee Name ( EN )"];
  delete req.body["Birth Date"];
  delete req.body["Hire Date"];
  delete req.body["Marital Status"];
  delete req.body["Phone Number"];
  delete req.body["Manager"];

  try {
    const employee = Employee.findById(req.body._id);
    await employee.updateOne({ $set: req.body });
    res.status(200).json("employee has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = Employee.findById(req.params.id);
    await employee.deleteOne();
    res.status(200).json("employee has been deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const getEmpReport = async (req, res) => {
  try {
    const { name, month, year } = req.body;
    const employee = await Employee.findOne({ nameAR: name });

    let vacationCount = {
      numberOfDays: 0,
      numberOfHours: 0,
    };

    const vacations = await Vacation.aggregate([
      {
        $match: {
          employeeId: employee._id,
          $expr: {
            $and: [
              { $eq: [{ $month: "$startDate" }, Number(month)] },
              { $eq: [{ $year: "$startDate" }, Number(year)] },
            ],
          },
        },
      },
    ]);

    vacations.map((vacation) => {
      vacationCount.numberOfHours =
        vacationCount.numberOfHours + Number(vacation.numberOfHours);
      vacationCount.numberOfDays =
        vacationCount.numberOfDays + Number(vacation.numberOfDays);
      vacationCount.numberOfHours = vacationCount.numberOfHours / 8;
    });

    Employee.aggregate([
      {
        $match: {
          nameAR: name,
        },
      },
      {
        $lookup: {
          from: "salaries",
          localField: "_id",
          foreignField: "employeeId",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$month", month] }, { $eq: ["$year", year] }],
                },
              },
            },
          ],
          as: "report",
        },
      },
    ]).exec(function (err, employee) {
      if (!employee[0].report[0]) return res.status(404).json(null);

      const absentDays = Math.floor(
        vacationCount.numberOfDays + vacationCount.numberOfHours
      );
      const numberOfDaysInMonth = new Date(
        employee[0]?.report[0]?.year,
        employee[0]?.report[0]?.month,
        0
      ).getDate();

      const dataObject = {
        name: employee[0]?.nameAR,
        id: employee[0]?._id,
        accNumber: employee[0]?.accountNumber,
        joiningDate: employee[0]?.createdAt,
        designation: employee[0]?.designation,
        dayPresent: numberOfDaysInMonth - absentDays,
        totalPaidLeaves: absentDays,
        month: employee[0]?.report[0]?.month,
        basicSalary: employee[0]?.report[0]?.basicSalary,
        accomodation: employee[0]?.report[0]?.accomodation,
        SSC: employee[0]?.report[0]?.SSC,
        incomeTax: employee[0]?.report[0]?.incomeTax,
        transportation: employee[0]?.report[0]?.transportation,
        medicalInsurance: employee[0]?.report[0]?.medicalInsurance,
        loan: employee[0]?.report[0]?.loan,
        bonus: employee[0]?.report[0]?.bonus,
        totalEarnings: employee[0]?.report[0]?.totalEarnings,
        totalDeductions: employee[0]?.report[0]?.totalDeductions,
        netSalary: employee[0]?.report[0]?.netSalary,
      };
      res.status(200).json(dataObject);
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
  getEmpReport,
};
