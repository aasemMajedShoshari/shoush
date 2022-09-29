const User = require("../models/User");

const signUp = async (req, res, bcrypt, saltRounds) => {
  try {
    const { username, password } = req.body;

    const hashedPs = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username,
      password: hashedPs,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (req, res, bcrypt) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(404).json(false);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(false);
  }
};

module.exports = {
  signUp,
  logIn,
};
