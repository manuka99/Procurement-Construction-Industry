const SiteManager = require("../Schemas/Users/SiteManager");

exports.createNewSiteManager = async (data) => {
  var sm = await SiteManager.create(data);
  sm.password = null;
  return sm;
};
