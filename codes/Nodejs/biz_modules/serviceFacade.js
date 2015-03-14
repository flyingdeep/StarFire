var config = require("./../config.js");
var bizOperation = require("./db_biz_operation.js");
var authOperation = require("./../helper_modules/accessServerAuth.js");
var hashMapHelper = require("./../helper_modules/hashMapHelper.js");
var baiduApiOperation = require("./baiduApiOperation.js");
var userInfoOperation =new bizOperation.userInfoClass();
var standInfoOperation =new bizOperation.standInfoClass();
var standCustomerMarkOperation =new bizOperation.standCustomerMarkClass();
var standUserLinkOperation =new bizOperation.standUserLinkClass();
//var standImageOperation =new bizOperation.standImageClass();
var standOwnerMessageOperation = new bizOperation.standOwnerMessageClass();
var standTypeOperation = new bizOperation.standTypeClass();
var authUserOperation =new bizOperation.authUserClass();

var baiduLBSOperation =new baiduApiOperation.baiduLBSClass();

var BIZ_ERROR_WORDS = config.bizService.bizErrorWords;
var DEFAULT_OFFSET = config.bizService.defaultOffset;
var DEFAULT_PAGE_SIZE = config.bizService.defaultPageSize;
var DEFAULT_ORDER = config.bizService.defaultOrder;
var DES = "des";

var MESSAGE_INVALIDTOKENKEY = config.messages.messageInvalidTokenKey;
var MESSAGE_NOUSER = config.messages.message_noUser;
var MESSAGE_AUTHENTICATEUSER_INNER = config.messages.message_authenticateUser_inner;
var NO_USER_PASSWORD = config.messages.message_noUserPass;
var INPUT_PARA_ERROR = config.messages.message_inputParaError;

var CONST_STAND_LOCATION_INFO_TABLEID = config.baiduLBS.stand_location_info_tableId;
var CONST_STAND_REALTIME_LOCATION_TABLEID = config.baiduLBS.stand_realTime_location_tableId;
var CONST_AK = config.baiduLBS.ak;
var CONST_COORDS_TYPE = config.baiduLBS.coords_type;
var CONST_REALTIME_LOCATION = config.baiduLBS.realTime_location;
var CONST_ISACTIVE = config.baiduLBS.isactive;
var OSS_ACCESS_KEY_SECRET = config.Ali_OSS.OSS_Access_Key_Secret;
var OSS_POLICY_EXPIRE_LAG = config.Ali_OSS.OSS_Policy_Expire_Lag;
var OSS_MAX_IMAGE_SIZE = config.Ali_OSS.OSS_Max_Image_Size;

var formatDate = function(date, format){
    var o = {
        "M+" : date.getMonth()+1, //month
        "d+" : date.getDate(), //day
        "h+" : date.getHours(), //hour
        "m+" : date.getMinutes(), //minute
        "s+" : date.getSeconds(), //second
        "q+" : Math.floor((date.getMonth()+3)/3), //quarter
        "S" : date.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

exports.tryPassTokenToProceedAction = function()
{
    var token = arguments[0];
    var hashMap = arguments[1];
    var method = arguments[2];
    var callback = arguments[3];

    var paraArray = [];
    for (var i= 3; i<arguments.length;i++)
    {
        paraArray.push(arguments[i]);

    }
    //console.log(paraArray);

    exports.tryMatchToken(function(err,e)
    {
        if (e == -1)
        {
            callback(err,-1);
            return;
        }
        if (err)
        {
            callback(err,false);
            return;
        }
        if (e==true)
        {
            method.apply(this,paraArray);
        }
        else
        {

            callback(new Error(MESSAGE_INVALIDTOKENKEY),e);
        }
    }, token, hashMap)
};


exports.tryMatchToken = function(callback, hashToken, hashMap)
{

    hashMapHelper.matchHash(callback,hashToken,hashMap);

};



exports.authenticateUser = function(callback, userInfo)
{

    var user_name = userInfo.user_name;
    var password  = userInfo.password;
    if (user_name && password) {
        userInfoOperation.fetchUserByUser(callback, user_name, password);
    }
    else
    {

        callback(new Error(NO_USER_PASSWORD),false);
    }
};



exports.registerUser = function(callback, userinfo)
{
    if (userinfo) {
        userInfoOperation.createUser(callback, userinfo);
    }
    else
    {

        callback(new Error(INPUT_PARA_ERROR),false);

    }

};

exports.updateUser =function(callback, userinfo)
{
    if (userinfo) {
        var whereObj = {"user_name": userinfo.user_name};
        delete userinfo.user_name;
        delete userinfo.user_id;
        userInfoOperation.updateUser(callback, userinfo, whereObj);
    }
    else
    {

        callback(new Error(INPUT_PARA_ERROR),false);

    }
};

exports.updateUserPreference = function(callback,userinfo)
{
    if (userinfo) {

        if (userinfo.user_preference) {
            var whereObj = {"user_name": userinfo.user_name};
            var userPreference = {"user_preference": userinfo.user_preference};
            userInfoOperation.updateUser(callback, userPreference, whereObj);
        }
        else
        {
            callback(new Error(INPUT_PARA_ERROR), false)
        }
    }
    else
    {
        callback(new Error(INPUT_PARA_ERROR),false);
    }
}

exports.createStand =function(callback,standInfo)
{
    if (standInfo) {
        standInfoOperation.createStand(callback, standInfo);
    }
    else
    {
        callback(new Error(INPUT_PARA_ERROR),false);
    }

};

exports.updateStand = function(callback,standInfo)
{
    if (standInfo && standInfo.stand_id) {
        var whereObj = {"stand_id": standInfo.stand_id};
        delete standInfo.stand_id;
        standInfoOperation.updateStand(callback, standInfo, whereObj);
    }
    else
    {
        callback(new Error(INPUT_PARA_ERROR),false);
    }

};

exports.changeRealTimeLocationStatus = function(callback, standInfo)
{
    if (standInfo && standInfo.stand_id && standInfo.realtime_location_active) {
        var whereObj = {"stand_id": standInfo.stand_id};
        var standRealTimeLocationStatus = {"realtime_location_active": standInfo.realtime_location_active};
        standInfoOperation.updateStand(callback, standRealTimeLocationStatus, whereObj);
    }
    else
    {
        callback(new Error(INPUT_PARA_ERROR),false);
    }
};

exports.getStandMarkCommentsExist = function(callback, standId, username)
{
    standCustomerMarkOperation.checkMarkExistByStandUser(callback, standId, username);
};

exports.getStandCustomerMarkCommentsByStandId = function(callback, standId, offset, pageSize, order )
{
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standCustomerMarkOperation.fetchCustomerMarkDataByStandId(callback,standId, offset, pageSize,order);

};

exports.getStandCustomerMarkCommentsByUsername = function(callback, username,offset, pageSize, order )
{

    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standCustomerMarkOperation.fetchCustomerMarkDataByUsername(callback,username,offset, pageSize, order);

};

exports.createStandMarkComments = function(callback, standMarkComment)
{
    if (standMarkComment) {
        standCustomerMarkOperation.createMarkCommentsWithCheck(callback, standMarkComment);
    }
    else
    {
        callback(new Error(INPUT_PARA_ERROR),false);
    }
};

exports.createStandOwnerMessage = function(callback,standOwnerInfo )
{
    if (standOwnerInfo) {
        standOwnerMessageOperation.createStandOwnerMessage(callback, standOwnerInfo);
    }
    else {
        callback(new Error(INPUT_PARA_ERROR), false);
    }
};

exports.getStandOwnerMessagesByStandId = function (callback,standId, offset, pageSize, order)
{
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standOwnerMessageOperation.fetchStandOwnerMessageByStandId(callback,standId, offset, pageSize, order);

};

exports.getStandOwnerMessagesByOwnerId = function (callback,OwnerId, offset, pageSize, order)
{

    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standOwnerMessageOperation.fetchStandOwnerMessageByOwnerId(callback,OwnerId, offset, pageSize, order);

};

exports.getStandType = function(callback)
{
    standTypeOperation.fetchStandType(callback);

};



exports.getImageUploadSecurityString = function(callback)
{
    var currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes()+OSS_POLICY_EXPIRE_LAG);
    var expiration = formatDate(currentDate,"yyyy-MM-ddThh.mm.000Z");
    var policy =  '{"expiration":'+expiration+',"conditions":[[“content-length-range”, 1, '+OSS_MAX_IMAGE_SIZE+']]}';
    var exception = null;

    var result = null;
    try {
        result = authOperation.authOSS(policy,OSS_ACCESS_KEY_SECRET);
    }
    catch (e)
    {
        exception = e;
    }
    finally {
        if (exception)
        {
            callback(exception,false);
        }
        else {
            callback(null, result);
        }
    }

};


exports.getAuthCode = function(callback, encryptUsername, encryptPassword, hashMap)
{
   var user_name = encryptUsername;
    var password = encryptPassword;
    authUserOperation.checkAuthUser(function(err, result)
    {

        if (err)
        {
            callback(err,false);
            return;
        }
        if (result && result!=-1)
        {

            if (result.length && result.length == 1)
            {
                hashMapHelper.pushHash(function(exception,e)
                {
                    var returnResult = {
                        "token":e,
                        "area" : result[0].area
                    }

                    callback(exception,returnResult)
                },user_name,hashMap);
            }
            else
            {
                var bizError = new Error(MESSAGE_NOUSER);
                bizError.Name = BIZ_ERROR_WORDS;
                callback(bizError,-1);
            }
        }
        else
        {

            callback(new Error(MESSAGE_AUTHENTICATEUSER_INNER),false);
        }
    },user_name,password);
};

exports.addLinkToStand = function(callback, userLinkInfo)
{
    if (userLinkInfo) {
        standUserLinkOperation.addSandUserLink(callback, userLinkInfo);
    }
    else {
         callback(new Error(INPUT_PARA_ERROR), false);
    }
};
exports.removeLinkFromStand = function(callback, userLinkInfo)
{
    if (userLinkInfo) {
        standUserLinkOperation.removeSandUserLinkLogic(callback, userLinkInfo);
    }
    else {
        callback(new Error(INPUT_PARA_ERROR), false);
    }
};
exports.fetchLinkListByUserId = function(callback,userId, offset, pageSize, order)
{
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standUserLinkOperation.fetchSandUserLinkByUserId(callback,userId, offset, pageSize, order);
};
exports.fetchLinkListByStandId = function(callback,standId, offset, pageSize, order)
{
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standUserLinkOperation.fetchSandUserLinkByStandId( callback,standId, offset, pageSize, order);
};

exports.createBaiduLBSGeoDataPoi = function(callback, standInfo)
{
    var geotable_id =  CONST_STAND_LOCATION_INFO_TABLEID;
    var ak = CONST_AK;
    var coord_type = CONST_COORDS_TYPE;
    var realtime_location = CONST_REALTIME_LOCATION;
    var isactive = CONST_ISACTIVE;
    var create_date = (new Date()).getTime();
    var update_date = create_date;
    var mark =0;
    var PoiInfoJson = {
        "stand_image_tip": standInfo.stand_image_tip,
        "title" : standInfo.title,
        "address" : standInfo.address,
        "tags":standInfo.tags,
        "latitude" : standInfo.latitude,
        "longitude":standInfo.longitude,
        "coord_type":coord_type,
        "geotable_id": geotable_id,
        "ak":ak,
        "create_date" : create_date,
        "update_date" : update_date,
        "realtime_location" : realtime_location,
        "isactive" : isactive,
        "mark" : mark,
        "description":standInfo.description,
        "create_user":standInfo.create_user,
        "creater_id" : standInfo.creater_id
    };
    baiduLBSOperation.createBaiduLBSGeoDataPoi(callback,PoiInfoJson);

};

exports.updateBaiduLBSGeoDataPoi = function(callback,standInfo)
{
    var geotable_id =  CONST_STAND_LOCATION_INFO_TABLEID;
    var ak = CONST_AK;
    var coord_type = CONST_COORDS_TYPE;
    var update_date = (new Date()).getTime();;
    var mark =0;
    var PoiInfoJson = {
        "id":standInfo.id,
        "stand_image_tip": standInfo.stand_image_tip,
        "title" : standInfo.title,
        "address" : standInfo.address,
        "tags":standInfo.tags,
        "latitude" : standInfo.latitude,
        "longitude":standInfo.longitude,
        "coord_type":coord_type,
        "geotable_id": geotable_id,
        "ak":ak,
        "update_date" : update_date,
        "realtime_location" : standInfo.realtime_location,
        "isactive" : standInfo.isactive,
        "mark":mark,
        "description":standInfo.description
    };
    baiduLBSOperation.updateBaiduLBSGeoDataPoi(callback,PoiInfoJson);
};

exports.deleteBaiduLBSGeoDataPoi = function(callback, standInfo)
{
    var geotable_id =  CONST_STAND_LOCATION_INFO_TABLEID;
    var ak = CONST_AK;
    var PoiInfoJson = {
        "id" : standInfo.id,
        "geotable_id": geotable_id,
        "ak":ak
    };
    baiduLBSOperation.deleteBaiduLBSGeoDataPoi(callback,PoiInfoJson);
};
