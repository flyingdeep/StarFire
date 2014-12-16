var bizOperation = require("./db_biz_operation.js");
var hashMapHelper = require("./../helper_modules/hashMapHelper.js");
var userInfoOperation =new bizOperation.userInfoClass();
var standInfoOperation =new bizOperation.standInfoClass();
var standCustomerMarkOperation =new bizOperation.standCustomerMarkClass();
var standUserLinkOperation =new bizOperation.standUserLinkClass();
var standImageOperation =new bizOperation.standImageClass();
var standOwnerMessageOperation = new bizOperation.standOwnerMessageClass();
var standTypeOperation = new bizOperation.standTypeClass();


var DEFAULT_OFFSET = 1;
var DEFAULT_PAGE_SIZE = 10;
var DEFAULT_ORDER = " create_date desc ";



exports.tryPassTokenToProceedAction = function()
{
    var token = arguments[0];
    var hashMap = arguments[1];
    var method = arguments[2];
    var callback = arguments[3];

    exports.tryMatchToken(function(e)
    {
        if (e==true)
        {
            method.apply(this,arguments.slice(3));
        }
        else
        {
            callback(e);
        }
    }, token, hashMap)
};


exports.generateAuthenticateToken = function(callback, user_name, password, hashMap)
{

    exports.authenticateUser(function(result)
    {
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

exports.tryMatchToken = function(callback, hashToken, hashMap)
{
    hashMapHelper.matchHash(callback,hashToken,hashMap);

};

exports.authenticateUser = function(callback, user_name, password)
{
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
