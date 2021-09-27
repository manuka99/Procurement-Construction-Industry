const SiteOfficer = require("../Schemas/SiteOfficer");

exports.findAllBasedOnSite = async (siteID) => {
  const siteOfficers = await SiteOfficer.find({ site: siteID }).populate(
    "officer"
  );
  return siteOfficers;
};

exports.create = async (data) => {
  const siteOfficer = await SiteOfficer.create(data);
  return siteOfficer;
};

exports.updateMany = async (data) => {
  const siteOfficers = await SiteOfficer.deleteMany({ site: data[0].site });
  const result = await SiteOfficer.bulkWrite(
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
