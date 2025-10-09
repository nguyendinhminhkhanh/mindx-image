const tokenProvider = require("../tokenProvider");
const UserModel = require("../../modules/auth/user");
const isAuth = async (req, res, next) => {
  const token = req.header.authorization;
  try {
    if (!token) {
      throw new Error("Not have token");
    }

    const identityData = tokenProvider.verify(token);
    if (!identityData.userId) {
      throw new Error("Invalid token ");
    }

    const existedUser = await UserModel.findById(identityData.userId);
    if (!existedUser) {
      throw new Error("Not found user");
    }

    req.user = existedUser;
    next();
  } catch (error) {
    res.status(401).send({
      success: 0,
      data: null,
      message: error.message || "UnAuthorization",
    });
  }
};

module.exports = isAuth;
