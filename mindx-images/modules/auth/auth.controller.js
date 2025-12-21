const bcrypt = require("bcryptjs");
const UserModel = require("./user");
const tokenProvider = require("../../common/tokenProvider");
const HttpError = require("../../common/httpError");
//[POST] /api/auth/signup
const signUp = async (req, res, next) => {
  const { username, password } = req.body;

  //check  điều kiện, mặc dù clien đã check
  if (!username) {
    throw new HttpError("username không được để trống", 422);
  }
  if (password && password.length < 6) {
    throw new HttpError("password cần ít nhất 6 kí tự", 422); // promise reject nhảy xuống catch
  }

  //kiểm tra db có tồn tại user không ? nếu có thì không đăng kí được
  const existedUser = await UserModel.findOne({ username });

  if (existedUser) {
    throw new HttpError("Đăng kí thất bại", 400);
  }

  const salt = await bcrypt.genSalt(10); // mã hoá
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    username,
    password: hashPassword,
  });

  const token = tokenProvider.sign(newUser._id);

  res.send({
    success: 1,
    data: {
      _id: newUser._id,
      username: newUser.username,
      token,
    },
  });
};

//[POST] /api/auth/login
const login = async (req, res, next) => {
  const { username, password } = req.body;

  //validate user input
  const existedUser = await UserModel.findOne({ username });
  if (!existedUser) {
    throw new HttpError("Đăng nhập thất bại không có username", 400);
  }

  const hashPassword = existedUser.password;
  const matchedPassword = await bcrypt.compare(password, hashPassword);
  if (!matchedPassword) {
    throw new HttpError("Đăng nhập thất bại(password không đúng )", 400);
  }

  const token = tokenProvider.sign(existedUser._id);
  console.log(token);
  res.send({
    success: 1,
    data: {
      _id: existedUser._id,
      username: existedUser.username,
      token,
    },
  });
};
const getUserInfor = async (req, res) => {
  const { user } = req;
  const userInfor = user ? { username: user.username, _id: user._id } : null;
  res.send({ success: 1, data: userInfor });
};

module.exports = {
  signUp,
  login,
  getUserInfor,
};
