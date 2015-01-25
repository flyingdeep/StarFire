var config = require("./../config.js");
var restify = require("restify");

var CONST_RETRY = config.baiduLBS.retries;
var BIZ_ERROR_WORDS = config.bizService.bizErrorWords;

var BASE_DOMAIN = "http://api.map.baidu.com";
var URI_BAIDU_LBS_GEODATA_POI_CREATE = "/geodata/v3/poi/create";
//var URI_BAIDU_LBS_GEODATA_POI_DETAIL = "/geodata/v3/poi/detail";
//var URI_BAIDU_LBS_GEODATA_POI_LIST = "/geodata/v3/poi/list";
var URI_BAIDU_LBS_GEODATA_POI_UPDATE = "/geodata/v3/poi/update";
var URI_BAIDU_LBS_GEODATA_POI_DELETE = "/geodata/v3/poi/delete";

//var URI_BAIDU_LBS_GEOSEARCH_NEARBY = "/geosearch/v3/nearby";
//var URI_BAIDU_LBS_GEOSEARCH_LOCAL = "/geosearch/v3/local";

var client = restify.createJsonClient({
    url: BASE_DOMAIN
});

exports.baiduLBSClass = function() {
    this.createBaiduLBSGeoDataPoi = function (callback, PoiInfoJson) {
        var options = {
            path: URI_BAIDU_LBS_GEODATA_POI_CREATE,
            retry: {'retries': CONST_RETRY},
            agent: false
        };
        client.post(options, PoiInfoJson,
            function (err, req, res, data) {
                if (err) {
                    callback(err, false);
                    return;
                }
                if (data.status == 0) {
                    callback(data.id, true);

                }
                else {
                    var bizError = new Error(data.message);
                    bizError.Name = BIZ_ERROR_WORDS;
                    callback(bizError, -1);
                }
            });
    };

    this.updateBaiduLBSGeoDataPoi = function (callback, PoiInfoJson) {
        var options = {
            path: URI_BAIDU_LBS_GEODATA_POI_UPDATE,
            retry: {'retries': CONST_RETRY},
            agent: false
        };
        client.post(options, PoiInfoJson,
            function (err, req, res, data) {
                if (err) {
                    callback(err, false);
                    return;
                }
                if (data.status == 0) {
                    callback(data.id, true);

                }
                else {
                    var bizError = new Error(data.message);
                    bizError.Name = BIZ_ERROR_WORDS;
                    callback(bizError, -1);
                }
            });
    };

    this.deleteBaiduLBSGeoDataPoi = function (callback, PoiInfoJson) {
        var options = {
            path: URI_BAIDU_LBS_GEODATA_POI_DELETE,
            retry: {'retries': CONST_RETRY},
            agent: false
        };
        client.post(options, PoiInfoJson,
            function (err, req, res, data) {
                if (err) {
                    callback(err, false);
                    return;
                }
                if (data.status == 0) {
                    callback(data.id, true);

                }
                else {
                    var bizError = new Error(data.message);
                    bizError.Name = BIZ_ERROR_WORDS;
                    callback(bizError, -1);
                }
            });
    };

};