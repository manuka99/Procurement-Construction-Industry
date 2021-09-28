const Site = require("../Schemas/Site");
const SiteOrder = require("../Schemas/SiteOrder/SiteOrder");

exports.findAll = async () => {
  const sites = await Site.find({ parent: null });
  const newSites = [];
  for (let index = 0; index < sites.length; index++) {
    const site = sites[index];
    const phases = await Site.find({ parent: site._id });
    newSites.push({ ...site._doc, phases });
  }
  return newSites;
};

exports.findByID = async (id) => {
  const site = await Site.findById(id).populate("parent");
  const phases = await Site.find({ parent: site._id });
  return { ...site._doc, phases };
};

exports.create = async (data) => {
  // if site has parent, then parent must be of type phase
  var parent = data.parent;
  try {
    parent = await Site.findById(parent);
  } catch (error) {
    console.log(error);
    throw new Error(
      "Cannot create a phase site where parent site is unknown or not available."
    );
  }

  if (parent.type != "phase")
    throw new Error("Parent site must be of type 'PHASE' to create phases.");
  const site = await Site.create(data);
  return site;
};

exports.update = async (id, data) => {
  const site = await Site.findById(id);
  if (site.type == "phase" && site.type != data.type) {
    var childSiteCount = await Site.count({ parent: id });
    if (childSiteCount && childSiteCount > 0)
      throw new Error(
        "Cannot change site type which has phases, please review them before applying changes."
      );
  }
  const newSite = await Site.findByIdAndUpdate(id, data);
  return newSite;
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
