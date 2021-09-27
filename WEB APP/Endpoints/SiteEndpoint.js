const { sendSuccess } = require("../Common/util");
const SiteDao = require("../Dao/SiteDao");
const SiteItemDao = require("../Dao/SiteItemDao");
const SiteOfficerDao = require("../Dao/SiteOfficerDao");

// find all
exports.GetAllSites = async (req, res, next) => {
  try {
    var sites = await SiteDao.findAll();
    sendSuccess(res, { sites });
  } catch (error) {
    next(error);
  }
};

exports.GetSite = async (req, res, next) => {
  try {
    var site = await SiteDao.findByID(req.params.id);
    sendSuccess(res, { site });
  } catch (error) {
    next(error);
  }
};

// create site
exports.CreateSite = async (req, res, next) => {
  try {
    if (req.body.type != "phase") req.body.parent = undefined;
    var site = await SiteDao.create(req.body);
    sendSuccess(res, { site });
  } catch (error) {
    next(error);
  }
};

exports.UpdateSite = async (req, res, next) => {
  try {
    if (req.body.type != "phase") req.body.parent = undefined;
    var site = await SiteDao.update(req.params.id, req.body);
    sendSuccess(res, { site });
  } catch (error) {
    next(error);
  }
};

// delete site
exports.DeleteSite = async (req, res, next) => {
  try {
    var site = await SiteDao.delete(req.params.id);
    sendSuccess(res, { site });
  } catch (error) {
    next(error);
  }
};

// ------------ Site Item --------------------

// find site's site items
exports.GetSiteItems = async (req, res, next) => {
  try {
    var siteItems = await SiteItemDao.findAllBySite(req.params.id);
    sendSuccess(res, { siteItems });
  } catch (error) {
    next(error);
  }
};

// create site item
exports.CreateSiteItem = async (req, res, next) => {
  try {
    var siteItem = await SiteItemDao.create(req.body);
    sendSuccess(res, { siteItem });
  } catch (error) {
    next(error);
  }
};

// delete and replace site item
exports.UpdateSiteItems = async (req, res, next) => {
  try {
    var siteItems = await SiteItemDao.updateMany(req.body);
    sendSuccess(res, { siteItems });
  } catch (error) {
    next(error);
  }
};

// ------------ SiteOfficerDao --------------------

// find site's Site Officers
exports.GetSiteOfficers = async (req, res, next) => {
  try {
    var siteOfficers = await SiteOfficerDao.findAllBasedOnSite(req.params.id);
    sendSuccess(res, { siteOfficers });
  } catch (error) {
    next(error);
  }
};

// create Site Officer
exports.CreateSiteOfficer = async (req, res, next) => {
  try {
    var siteOfficer = await SiteOfficerDao.create(req.body);
    sendSuccess(res, { siteOfficer });
  } catch (error) {
    next(error);
  }
};

// delete and replace Site Officer
exports.UpdateSiteOfficer = async (req, res, next) => {
  try {
    var siteOfficers = await SiteOfficerDao.updateMany(req.body);
    sendSuccess(res, { siteOfficers });
  } catch (error) {
    next(error);
  }
};
