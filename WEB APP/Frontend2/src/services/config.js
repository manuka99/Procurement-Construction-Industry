let checkUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
};

exports.APP_URL = process.env.VUE_APP_URL;
exports.APP_USER_TOKEN = process.env.VUE_APP_TOKEN;
exports.checkUser = checkUser;
