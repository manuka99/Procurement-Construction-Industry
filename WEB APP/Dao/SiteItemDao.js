const SiteItem = require("../Schemas/SiteItem");

exports.findAllBySite = async (siteID) => {
  const siteItems = await SiteItem.find({ site: siteID }).populate(
    "productType"
  );
  return siteItems;
};

exports.create = async (data) => {
  const siteItem = await SiteItem.create(data);
  return siteItem;
};

exports.delete = async (_id) => {
  const siteItem = await SiteItem.deleteOne({ _id });
  return { ...siteItem._id, _id };
};
