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
            callback(new Error("Token is invalid or Expired"),e);
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


    userInfoOperation.fetchUserByUser(callback,user_name,password);
};



exports.registerUser = function(callback, userinfo)
{
    userInfoOperation.createUser(callback, userinfo);

};

exports.updateUser =function(callback, userinfo)
{
    var whereObj = {"user_name":userinfo.user_name};
    delete userinfo.user_name;
    delete userinfo.user_id;
    userInfoOperation.updateUser(callback, userinfo,whereObj);
};

exports.updateUserPreference = function(callback,userinfo)
{
    var whereObj = {"user_name":userinfo.user_name};
    var userPreference  = {"user_preference":userinfo.user_preference};
    userInfoOperation.updateUser(callback, userPreference,whereObj);
}

exports.createStand =function(callback,standInfo)
{
    standInfoOperation.createStand(callback,standInfo);

};

exports.updateStand = function(callback,standInfo)
{
    var whereObj = {"stand_id": standInfo.stand_id};
    delete standInfo.stand_id;
    standInfoOperation.updateStand(callback,standInfo,whereObj);

};

exports.changeRealTimeLocationStatus = function(callback, standInfo)
{
    var whereObj = {"stand_id":standInfo.stand_id};
    var standRealTimeLocationStatus = {"realtime_location_active":standInfo.realtime_location_active};
    standInfoOperation.updateStand(callback,standRealTimeLocationStatus,whereObj);
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
    standCustomerMarkOperation.createMarkCommentsWithCheck(callback, standMarkComment);
};

exports.createStandOwnerMessage = function(callback,standOwnerInfo )
{
    standOwnerMessageOperation.createStandOwnerMessage(callback, standOwnerInfo);
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
    standTypeOperation.getStandType(callback);

};



exports.getImageUploadSecurityString = function(callback,policy,key)
{
    var exception = null;

    var result = "";
    try {
        result = authOperation.authOSS(policy, key);
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


  // var user_name = authOperation.decryptSymString(encryptUsername, DES);
   var user_name = encryptUsername;
    var password = encryptPassword;
    var userInfo = {"user_name":user_name,"password":password};
    exports.authenticateUser(function(err, result)
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
                hashMapHelper.pushHash(err,callback,user_name,hashMap);
            }
            else
            {
                var bizError = new Error("No user found!");
                bizError.Name = "biz";
                callback(bizError,-1);
            }
        }
        else
        {
            callback(new Error("authenticateUser - innerException"),false);
        }
    },userInfo);
};

exports.addLinkToStand = function(callback, userLinkInfo)
{
    standUserLinkOperation.addSandUserLink(exception,callback, userLinkInfo);
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
    standUserLinkOperation.fetchSandUserLinkByStandId( callback,standId, offset, pageSize, order);
};
