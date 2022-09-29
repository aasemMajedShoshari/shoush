const Career = require("../models/Career");

const applyToCareer = async (req, res) => {
  try {
    const career = new Career(req.body);
    await career.save();
    res.status(200).json("career has been applied successfully");
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  applyToCareer,
};
