const bcrypt = require("bcryptjs");
const UserModel = require("./user");

//[POST] /api/auth/signup
const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check  điều kiện, mặc dù clien đã check
    if (!username) {
      throw new Error("username không được để trống");
    }
    if (password && password.length < 6) {
      throw new Error("password cần ít nhất 6 kí tự"); // promise reject nhảy xuống catch
    }

    //kiểm tra db có tồn tại user không ? nếu có thì không đăng kí được
    const existedUser = await UserModel.findOne({ username });

    if (existedUser) {
      throw new Error("Đăng kí thất bại");
    }

    const salt = await bcrypt.genSalt(10); // mã hoá
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      password: hashPassword,
    });

    res.send({
      success: 1,
      data: {
        _id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

//[POST] /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validate user input
    const existedUser = await UserModel.findOne({ username });
    if (!existedUser) {
      throw new Error("Đăng nhập thất bại không có username");
    }

    const hashPassword = existedUser.password;
    const matchedPassword = await bcrypt.compare(password, hashPassword);
    if (!matchedPassword) {
      throw new Error("Đăng nhập thất bại(password không đúng )");
    }

    res.send({
      success: 1,
      data: {
        _id: existedUser._id,
        username: existedUser.username,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  signUp,
  login,
};
