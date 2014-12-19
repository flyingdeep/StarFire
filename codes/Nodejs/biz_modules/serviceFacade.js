var config = require("./../config.js");
var bizOperation = require("./db_biz_operation.js");
var authOperation = require("./../helper_modules/accessServerAuth.js");
var hashMapHelper = require("./../helper_modules/hashMapHelper.js");
var userInfoOperation =new bizOperation.userInfoClass();
var standInfoOperation =new bizOperation.standInfoClass();
var standCustomerMarkOperation =new bizOperation.standCustomerMarkClass();
var standUserLinkOperation =new bizOperation.standUserLinkClass();
//var standImageOperation =new bizOperation.standImageClass();
var standOwnerMessageOperation = new bizOperation.standOwnerMessageClass();
var standTypeOperation = new bizOperation.standTypeClass();


var DEFAULT_OFFSET = config.bizService.defaultOffset;
var DEFAULT_PAGE_SIZE = config.bizService.defaultPageSize;
var DEFAULT_ORDER = config.bizService.defaultOrder;
var DES = "des";



exports.tryPassTokenToProceedAction = function()
{

    var token = arguments[0];
    var hashMap = arguments[1];
    var method = arguments[2];
    var exception = arguments[3];
    var callback = arguments[4];
    if (exception)
    {
        callback(exception,false);
        return;
    }
    exports.tryMatchToken(exception,function(err,e)
    {

        if (err)
        {
            callback(err,false);
            return;
        }
        if (e==true)
        {
            method.apply(this,arguments.slice(3));
        }
        else
        {
            callback(new Error("Token is invalid or Expired"),e);
        }
    }, token, hashMap)
};


exports.tryMatchToken = function(exception, callback, hashToken, hashMap)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    hashMapHelper.matchHash(callback,hashToken,hashMap);

};

exports.authenticateUser = function(exception, callback, logonUserInfo)
{

    if (exception)
    {
        callback(exception,false);
        return;
    }
    var user_name = logonUserInfo.user_name;
    var password = logonUserInfo.password;
    //console.log(logonUserInfo)
    userInfoOperation.fetchUserByUser(exception,callback,user_name,password);
};

exports.registerUser = function(exception, callback, userinfo)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    userInfoOperation.createUser(exception,callback, userinfo);

};

exports.updateUser =function(exception,callback, userinfo)
{

    if (exception)
    {
        callback(exception,false);
        return;
    }
    var whereObj = {"user_name":userinfo.user_name};
    delete userinfo.user_name;
    delete userinfo.user_id;
    userInfoOperation.updateUser(exception,callback, userinfo,whereObj);
};

exports.updateUserPreference = function(exception, callback,userinfo)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    var whereObj = {"user_name":userinfo.user_name};
    var userPreference  = {"user_preference":userinfo.user_preference};
    userInfoOperation.updateUser(exception,callback, userPreference,whereObj);
}

exports.createStand =function(exception, callback,standInfo)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    standInfoOperation.createStand(exception,callback,standInfo);

};

exports.updateStand = function(exception,callback,standInfo)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    var whereObj = {"stand_id": standInfo.stand_id};
    delete standInfo.stand_id;
    standInfoOperation.updateStand(exception,callback,standInfo,whereObj);

};

exports.changeRealTimeLocationStatus = function(exception,callback, standInfo)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    var whereObj = {"stand_id":standInfo.stand_id};
    var standRealTimeLocationStatus = {"realtime_location_active":standInfo.realtime_location_active};
    standInfoOperation.updateStand(exception,callback,standRealTimeLocationStatus,whereObj);
};

exports.getStandMarkCommentsExist = function(exception,callback, standId, username)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    standCustomerMarkOperation.checkMarkExistByStandUser(exception,callback, standId, username);
};

exports.getStandCustomerMarkCommentsByStandId = function(exception,callback, standId, offset, pageSize, order )
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standCustomerMarkOperation.fetchCustomerMarkDataByStandId(exception,callback,standId, offset, pageSize,order);

};

exports.getStandCustomerMarkCommentsByUsername = function(exception,callback, username,offset, pageSize, order )
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standCustomerMarkOperation.fetchCustomerMarkDataByUsername(exception,callback,username,offset, pageSize, order);

};

exports.createStandMarkComments = function(exception,callback, standMarkComment)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    standCustomerMarkOperation.createMarkCommentsWithCheck(exception,callback, standMarkComment);
};

exports.createStandOwnerMessage = function(exception,callback,standOwnerInfo )
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    standOwnerMessageOperation.createStandOwnerMessage(exception,callback, standOwnerInfo);
};

exports.getStandOwnerMessagesByStandId = function (exception,callback,standId, offset, pageSize, order)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standOwnerMessageOperation.fetchStandOwnerMessageByStandId(exception,callback,standId, offset, pageSize, order);

};

exports.getStandOwnerMessagesByOwnerId = function (exception,callback,OwnerId, offset, pageSize, order)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    offset = (offset == null || offset == "")?DEFAULT_OFFSET: offset;
    pageSize = (pageSize == null || pageSize == "")?DEFAULT_PAGE_SIZE: pageSize;
    order = (order == null || order == "")?DEFAULT_ORDER: order;
    standOwnerMessageOperation.fetchStandOwnerMessageByOwnerId(exception,callback,OwnerId, offset, pageSize, order);

};

exports.getStandType = function(exception,callback)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    standTypeOperation.getStandType(exception,callback);

};



exports.getImageUploadSecurityString = function(exception,callback,policy,key)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    var result = "";
    try {
        result = authOperation.authOSS(policy, key);
    }
    catch (e)
    {
        exception = e;
    }
    finally {
        callback(exception, result);
    }

};

exports.getAuthCode = function(exception,callback, encryptUsername, encryptPassword, hashMap)
{

    var user_name = authOperation.decryptSymString(encryptUsername, DES);
    var password = encryptPassword;
    if (exception)
    {
        callback(exception,false);
        return;
    }
    exports.authenticateUser(exception,function(err, result)
    {
        if (err)
        {
            callback(err,false);
            return;
        }
        if (result)
        {
            if (result && result!=-1)
            {
                hashMapHelper.pushHash(callback,user_name,hashMap);
            }
            else
            {
                callback(-1);
            }
        };
    },user_name,password);
};

exports.addLinkToStand = function(callback, userLinkInfo)
{

    standUserLinkOperation.addSandUserLink(callback, userLinkInfo);
};
exports.removeLinkFromStand = function(callback, userLinkInfo)
{
    standUserLinkOperation.removeSandUserLinkLogic(callback, userLinkInfo);
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
    standUserLinkOperation.fetchSandUserLinkByStandId(callback,standId, offset, pageSize, order);
};
