const SiteOfficer = require("../Schemas/SiteOfficer");

exports.findAllBasedOnSite = async (siteID) => {
  const siteOfficers = await SiteOfficer.find({ site: siteID });
  return siteOfficers;
};

exports.create = async (data) => {
  const siteOfficer = await SiteOfficer.create(data);
  return siteOfficer;
};

exports.delete = async (_id) => {
  const siteOfficer = await SiteOfficer.deleteOne({ _id });
  return { ...siteOfficer._doc, _id };
};
