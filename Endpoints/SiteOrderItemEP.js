const { sendSuccess } = require("../Common/util");
const SiteOrderItemDao = require("../Dao/SiteOrderItemDao");

// find all
exports.GetAllOrderItemsBySiteOrder = async (req, res, next) => {
  try {
    var siteOrderItems = await SiteOrderItemDao.findAllBySiteOrder(
      req.params.id
    ); //site Order Id
    sendSuccess(res, { siteOrderItems });
  } catch (error) {
    next(error);
  }
};

exports.Create = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.create(req.body);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.update(req.params.id, req.body);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.delete(req.params.id);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};
