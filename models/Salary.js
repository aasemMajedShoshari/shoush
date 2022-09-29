const mongoose = require("mongoose");

const salariesSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  employeeName: {
    type: String,
  },
  month: { type: String },
  year: { type: String },
  basicSalary: { type: Number, default: 0 },
  accomodation: { type: Number, default: 0 },
  transportation: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
  SSC: { type: Number, default: 0 },
  incomeTax: { type: Number, default: 0 },
  medicalInsurance: { type: Number, default: 0 },
  loan: { type: Number, default: 0, default: null },
  totalEarnings: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
});
+salariesSchema.pre("save", function (next) {
  this.SSC = this.basicSalary * 0.07;
  this.totalEarnings =
    this.basicSalary + this.accomodation + this.transportation + this.bonus;
  this.totalDeductions =
    this.incomeTax + this.medicalInsurance + this.loan + this.SSC;
  this.netSalary = this.totalEarnings - this.totalDeductions;
  next();
});

salariesSchema.pre("updateOne", function (next) {
  this.set({ SSC: Number(this.get("basicSalary")) * 0.07 });
  this.set({
    totalDeductions:
      Number(this.get("incomeTax")) +
      Number(this.get("medicalInsurance")) +
      Number(this.get("loan")) +
      Number(this.get("SSC")),
  });

  this.set({
    totalEarnings:
      Number(this.get("basicSalary")) +
      Number(this.get("accomodation")) +
      Number(this.get("transportation")) +
      Number(this.get("bonus")),
  });

  this.set({
    netSalary:
      Number(this.get("totalEarnings")) - Number(this.get("totalDeductions")),
  });

  next();
});

module.exports = mongoose.model("salarie", salariesSchema);
