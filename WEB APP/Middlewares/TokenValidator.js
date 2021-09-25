var jwt = require("jsonwebtoken");
const UserDao = require("../Dao/UserDao");
const { AUTH_SECRET } = require("../Config/index");
const consola = require("consola");

// decode jwt token (if present) then if the jwt token is valid request will be authenticated
exports.TokenValidator = async (req, res, next) => {
  try {
    // access token in request (bearer token)
    var token = String(req.header("authorization")).slice(7);

    // verify and decode token to get data
    const decodedToken = jwt.verify(token, AUTH_SECRET);

    // fetch user by decoded rtoken user id
    const user = await UserDao.findUserById(decodedToken.data.user_id);

    // invalid user
    if (!user) throw new Error("Invalid user!");

    // user is authenicated, used by other middlewares to verify role etc
    req.user = user;
    req.user_jwt = token;
  } catch (error) {
    consola.error(`TokenValidator Middleware: ${error.message}`);
  } finally {
    next();
  }
};
