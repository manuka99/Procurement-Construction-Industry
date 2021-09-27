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

exports.updateMany = async (data) => {
  const siteItem = await SiteItem.deleteMany({ site: data[0].site });
  const result = await SiteItem.bulkWrite(
    data.map((item) => ({
      updateOne: {
        filter: { _id: item._id ? item._id : Types.ObjectId() },
        update: { $set: item },
        upsert: true,
      },
    }))
  );
  return result;
};
