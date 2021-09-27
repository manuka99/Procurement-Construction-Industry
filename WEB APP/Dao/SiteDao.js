const Site = require("../Schemas/Site");
const SiteOrder = require("../Schemas/SiteOrder/SiteOrder");

exports.findAll = async () => {
  const sites = await Site.find();
  const newSites = [];
  for (let index = 0; index < sites.length; index++) {
    const site = sites[index];
    const childSites = await Site.find({ parent: site._id });
    newSites.push({ ...site._doc, childSites });
  }
  return newSites;
};

exports.findByID = async (id) => {
  const site = await Site.findById(id);
  const childSites = await Site.find({ parent: site._id });
  return { ...site._doc, childSites };
};

exports.create = async (data) => {
  const site = await Site.create(data);
  return site;
};

exports.update = async (id, data) => {
  const site = await Site.findByIdAndUpdate(id, data);
  return site;
};

exports.delete = async (_id) => {
  var childSiteCount = await Site.count({ parent: _id });
  if (childSiteCount && childSiteCount > 0)
    throw new Error("Cannot delete a site which has phases");
  var siteOrderCount = await SiteOrder.count({ site: _id });
  if (siteOrderCount && siteOrderCount > 0)
    throw new Error("Cannot delete a site which has orders");
  const site = await Site.deleteOne({ _id });
  return { ...site._doc, _id };
};
