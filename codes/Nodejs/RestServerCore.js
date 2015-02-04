var cluster = require('cluster');
var config = require("./config.js");
var restify = require("restify");
var cors = require("cors");
var hashMapOperation = require("./helper_modules/hashMap.js");
var serviceOperation = require("./biz_modules/serviceFacade.js");
var HTTP_SUCCESS_CODE = config.serverParameters.httpSuccessCode;
var METHOD_POST = "post";
var METHOD_GET = "get";

var BIZ_ERROR_WORDS = config.bizService.bizErrorWords;

var SERVER_PORT = config.serverParameters.serverPort;
var SYMBOL_SLASH="/";
var CURRENT_VERSION = SYMBOL_SLASH + config.serverParameters.lastedVersion;
var BASE_ROUTER = SYMBOL_SLASH + config.serverParameters.baseRouter + SYMBOL_SLASH;

var DEBUG_FLAG =config.globalCommon.debugFlag;

var ROUTER_AUTHENTICATEUSER = BASE_ROUTER + "AuthenticateUser";
var ROUTER_REGISTERUSER = BASE_ROUTER + "RegisterUser";
var ROUTER_UPDATEUSER = BASE_ROUTER + "UpdateUser";
var ROUTER_UPDATEUSERPREFERENCE = BASE_ROUTER + "UpdateUserPreference";
var ROUTER_CREATESTAND = BASE_ROUTER + "CreateStand";
var ROUTER_UPDATESTAND = BASE_ROUTER + "UpdateStand";
var ROUTER_CHANGEREALTIMELOCATIONSTATUS = BASE_ROUTER + "ChangeRealTimeLocationStatus";
var ROUTER_GETSTANDCUSTOMERMARKCOMMENTS = BASE_ROUTER + "GetStandCustomerMarkComments";
var ROUTER_CREATESTANDMARKCOMMENTS = BASE_ROUTER + "CreateStandMarkComments";
var ROUTER_GETSTANDMARKCOMMENTSEXIST = BASE_ROUTER + "GetStandMarkCommentsExist";
var ROUTER_CREATESTANDOWNERMESSAGE = BASE_ROUTER + "CreateStandOwnerMessage";
var ROUTER_GETSTANDOWNERMESSAGES = BASE_ROUTER + "GetStandOwnerMessages";
var ROUTER_GETSTANDTYPES = BASE_ROUTER + "GetStandTypes";
var ROUTER_GETIMAGEUPLOADSECURITYSTRING = BASE_ROUTER + "GetImageUploadSecurityString";
var ROUTER_GETAUTHCODE = BASE_ROUTER + "GetAuthCode";
var ROUTER_ADDLINKTOSTAND = BASE_ROUTER + "AddLinkToStand";
var ROUTER_REMOVELINKFROMSTAND = BASE_ROUTER + "RemoveLinkFromStand";
var ROUTER_FETCHLINKLIST = BASE_ROUTER + "FetchLinkList";

var ROUTER_test = BASE_ROUTER + "test";

var ROUTER_BAIDU_LBS_CREATEPOI = BASE_ROUTER + "BaiduLBS/CreatPoi";
//var ROUTER_BAIDU_LBS_QUERYPOILIST = BASE_ROUTER + "BaiduLBS/QueryPoiList";
//var ROUTER_BAIDU_LBS_QUERYSINGLEPOIDETAIL = BASE_ROUTER + "GeoData/QuerySinglePoiDetail";
var ROUTER_BAIDU_LBS_UPDATEPOI = BASE_ROUTER + "BaiduLBS/UpdatePoi";
var ROUTER_BAIDU_LBS_DELETEPOI = BASE_ROUTER + "BaiduLBS/DeletePoi";

//var ROUTER_BAIDU_LBS_QUERYNEARBY = BASE_ROUTER + "BaiduLBS/QueryNearby";
//var ROUTER_BAIDU_LBS_QUERYLOCAL = BASE_ROUTER + "BaiduLBS/QueryLocal";


var numCPUs = require('os').cpus().length;
var hashMap = new hashMapOperation.hashMapBaseClass();

var tryParseJsonString = function(e)
{

    var result = e;
    try {
        if (typeof(e) == "string")
        {
            result = JSON.parse(e);
        }
        reformJsonObject(result);
    }
    catch (ex)
    {
    }
    finally
    {
        return result;
    }
};

var reformJsonObject = function (e)
{
    for (var item in e)
    {
        if (e[item] == null)
        {
            delete e[item]
        }
    }
};


var getCommonParameters = function(req,paraName,method)
{

    var result = null;
    if (method == METHOD_GET)
    {
        result = req.query[paraName];

    }
    else if (method == METHOD_POST)
    {

        result = req.params[paraName];
    }
    return result;
};

var commonResult = function ()
{
    this.status = "unknown";
    this.detail = "unknown";
};

var authenticateUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {

        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }


        if (e && e!= -1)
        {

            if (e.length >0) {
                result.status = "true";
                result.detail = {
                    "success" : "true",
                    "result":
                    {
                        "user_id": e[0].user_id,
                        "display_name": e[0].display_name,
                        "user_name": e[0].user_name,
                        "image_id": e[0].image_id,
                        "user_preference": e[0].user_preference,
                        "user_type": e[0].user_type,
                        "cell_number": e[0].cell_number,
                        "web_chat": e[0].web_chat,
                        "qq_number": e[0].qq_number,
                        "province_city_area": e[0].province_city_area,
                        "createdate": e[0].createdate,
                        "updatedate": e[0].updatedate
                    }
                };


            }
            else
            {
                result.status = "false";
                result.detail = {"message": "Invalid user or password"};
            }
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.authenticateUser,callback,requestInputParameter );
};
var registerUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (e && e!= -1)
        {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "user_name":requestInputParameter.user_name
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.registerUser,callback,requestInputParameter );




};
var updateUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "user_name":requestInputParameter.user_name
                }
            };

        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateUser,callback,requestInputParameter );

};
var updateUserPreferenceCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "user_name":requestInputParameter.user_name
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateUserPreference,callback,requestInputParameter );
};
var createStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    //console.log(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestInputParameter.stand_id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createStand,callback,requestInputParameter );

};
var updateStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {

        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestInputParameter.stand_id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateStand,callback,requestInputParameter );
};
var changeRealTimeLocationStatusCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {

        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestInputParameter.stand_id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.changeRealTimeLocationStatus,callback,requestInputParameter);

};
var getStandCustomerMarkCommentsCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var paraUsername ="username";
    var paraStandId = "standId";
    var paraOffset = "offset";
    var paraPageSize = "pageSize";
    var paraSort = "sort";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var requestUsername = getCommonParameters(req,paraUsername,METHOD_GET);
    var requestStandId = getCommonParameters(req,paraStandId,METHOD_GET);
    var requestOffset = getCommonParameters(req,paraOffset,METHOD_GET);
    var requestPageSize = getCommonParameters(req,paraPageSize,METHOD_GET);
    var requestSort = getCommonParameters(req,paraSort,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
           var standCustomerMarkCommentsArray = [];

            for (var i= 0; i<e.length; i++) {
                standCustomerMarkCommentsArray.push({
                    "customer_message_id": e[i].customer_message_id,
                    "stand_id": e[i].stand_id,
                    "comments": e[i].comments,
                    "create_user_id": e[i].create_user_id,
                    "create_user_name": e[i].create_user_name,
                    "create_date": e[i].create_date
                });

            }
            result.detail = {
                "success" : "true",
                "result": standCustomerMarkCommentsArray
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };

    if (requestStandId != null && requestStandId!= "" && typeof(requestStandId) != "undefined") {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.getStandCustomerMarkCommentsByStandId, callback, requestStandId, requestOffset, requestPageSize, requestSort);
    }
    else if (requestUsername != null && requestUsername!= "" && typeof(requestUsername) != "undefined")
    {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.getStandCustomerMarkCommentsByUsername, callback, requestUsername, requestOffset, requestPageSize, requestSort);
    }
    else
    {
        callback(false);
    }
};
var createStandMarkCommentsCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestInputParameter.stand_id,
                    "create_user_name" : requestInputParameter.create_user_name
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createStandMarkComments,callback,requestInputParameter );
};
var getStandMarkCommentsExistCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var paraUsername ="username";
    var paraStandId = "standId";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var requestUsername = getCommonParameters(req,paraUsername,METHOD_GET);
    var requestStandId = getCommonParameters(req,paraStandId,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {

            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e>0)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestStandId,
                    "create_user_name" : requestUsername,
                    "isMarked": true
                }
            };
        }
        else if (e==0)
        {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestStandId,
                    "create_user_name" : requestUsername,
                    "isMarked": false
                }
            };

        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.getStandMarkCommentsExist,callback,requestStandId,requestUsername );
};
var createStandOwnerMessageCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":
                {
                    "stand_id":requestInputParameter.stand_id,
                    "create_user_name" : requestInputParameter.create_user_name
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createStandOwnerMessage,callback,requestInputParameter );

};
var getStandOwnerMessagesCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var paraUserId ="userId";
    var paraStandId = "standId";
    var paraOffset = "offset";
    var paraPageSize = "pageSize";
    var paraSort = "sort";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var requestUserId = getCommonParameters(req,paraUserId,METHOD_GET);
    var requestStandId = getCommonParameters(req,paraStandId,METHOD_GET);
    var requestOffset = getCommonParameters(req,paraOffset,METHOD_GET);
    var requestPageSize = getCommonParameters(req,paraPageSize,METHOD_GET);
    var requestSort = getCommonParameters(req,paraSort,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            var standOwnerMessageArray = [];

            for (var i= 0; i<e.length; i++) {
                standOwnerMessageArray.push({
                    "stand_owner_message_id": e[i].customer_message_id,
                    "stand_id": e[i].stand_id,
                    "message": e[i].message,
                    "create_date": e[i].create_date
                });

            }
            result.detail = {
                "success" : "true",
                "result":standOwnerMessageArray
            };

        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };

    if (requestStandId != null && requestStandId!= "" && typeof(requestStandId) != "undefined") {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.getStandOwnerMessagesByStandId, callback, requestStandId, requestOffset, requestPageSize, requestSort);
    }
    else if (requestUserId != null && requestUserId!= "" && typeof(requestUserId) != "undefined")
    {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.getStandOwnerMessagesByOwnerId, callback, requestUserId, requestOffset, requestPageSize, requestSort);
    }
    else
    {
        callback(false);
    }
};
var getStandTypesCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {
            result.status = "true";
            var standTypeArray = [];

            for (var i= 0; i<e.length; i++) {
                standTypeArray.push({
                    "stand_type_id": e[i].stand_type_id,
                    "type_name": e[i].type_name,
                    "type_parent_id": e[i].type_parent_id
                });

            }
            result.detail = {
                "success" : "true",
                "result":standTypeArray
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.getStandType,callback);
};

var getImageUploadSecurityStringCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var paraPolicy = "policy";
    var paraKey = "key";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var requestPolicy = getCommonParameters(req,paraPolicy,METHOD_GET);
    var requestKey = getCommonParameters(req,paraKey,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception,e) {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e != -1) {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":e
            };
        }
        else {
            result.status = "false";
            result.detail = {"message": "Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
    }
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.getImageUploadSecurityString,callback,requestPolicy,requestKey);
};
var getAuthCodeCallbackGet = function(req, res, next)
{
    var paraEncryptUsername = "username";
    var paraEncryptPassword = "password";
    var requestEncryptUsername = getCommonParameters(req,paraEncryptUsername,METHOD_GET);
    var requestEncryptPassword = getCommonParameters(req,paraEncryptPassword,METHOD_GET);
    var result = new commonResult();

    var callback = function(exception, e) {
        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e != -1) {
            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":e
            };
        }
        else if (e == -1)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":"Username or password is invalid"
            };
        }
        else {
            result.status = "false";
            result.detail = {"message": "Internal Error!"};
        }
        res.json(result);
       next();
    }
       serviceOperation.getAuthCode(callback,requestEncryptUsername,requestEncryptPassword,hashMap);
};

var addLinkToStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":{
                    "stand_id":requestInputParameter.stand_id,
                    "user_id" : requestInputParameter.user_id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.addLinkToStand,callback,requestInputParameter );

};
var removeLinkFromStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":{
                    "stand_id":requestInputParameter.stand_id,
                    "user_id" : requestInputParameter.user_id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.removeLinkFromStand,callback,requestInputParameter );

};
var fetchLinkListCallbackGet = function(req, res, next)
{
    var paraToken = "token";
    var paraUserId ="userId";
    var paraStandId = "standId";
    var paraOffset = "offset";
    var paraPageSize = "pageSize";
    var paraSort = "sort";
    var requestToken = getCommonParameters(req,paraToken,METHOD_GET);
    var requestUserId = getCommonParameters(req,paraUserId,METHOD_GET);
    var requestStandId = getCommonParameters(req,paraStandId,METHOD_GET);
    var requestOffset = getCommonParameters(req,paraOffset,METHOD_GET);
    var requestPageSize = getCommonParameters(req,paraPageSize,METHOD_GET);
    var requestSort = getCommonParameters(req,paraSort,METHOD_GET);
    var result = new commonResult();
    var callback = function(exception,e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {
            result.status = "true";
            var linkList = [];
            for (var i= 0; i<e.length; i++) {
                linkList.push({
                    "user_link_id": e[i].user_link_id,
                    "stand_id": e[i].stand_id,
                    "user_id": e[i].user_id,
                    "create_date": e[i].create_date
                });
            }
            result.detail = {
                "success" : "true",
                "result":linkList
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();

    };

    if (requestStandId != null && requestStandId!= "" && typeof(requestStandId) != "undefined") {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.fetchLinkListByStandId, callback, requestStandId, requestOffset, requestPageSize, requestSort);
    }
    else if (requestUserId != null && requestUserId!= "" && typeof(requestUserId) != "undefined")
    {
        serviceOperation.tryPassTokenToProceedAction(requestToken, hashMap,
            serviceOperation.fetchLinkListByUserId, callback, requestUserId, requestOffset, requestPageSize, requestSort);
    }
    else
    {
        callback(false);
    }
};

var createBaiduLBSGeoDataPoiCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":{
                    "stand_id":e.id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createBaiduLBSGeoDataPoi,callback,requestInputParameter);

};

var updateBaiduLBSGeoDataPoiCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":{
                    "stand_id":e.id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateBaiduLBSGeoDataPoi,callback,requestInputParameter);

};

var deleteBaiduLBSGeoDataPoiCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = tryParseJsonString(getCommonParameters(req,paraInputParameter,METHOD_POST));
    var result = new commonResult();
    var callback = function(exception, e)
    {
        if (exception && exception.Name == BIZ_ERROR_WORDS)
        {
            result.status = "true";
            result.detail = {
                "success" : "false",
                "result":exception.message
            };
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }

        if (exception && DEBUG_FLAG )
        {
            result.status = "false";
            result.detail = {"success" : "false","message":exception.message, "detail":exception.stack};
            console.log(exception.message);
            console.log(exception.stack);
            res.json(HTTP_SUCCESS_CODE,result);
            next();
            return;
        }
        if (e && e!= -1)
        {

            result.status = "true";
            result.detail = {
                "success" : "true",
                "result":{
                    "stand_id":e.id
                }
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
        next();
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateBaiduLBSGeoDataPoi,callback,requestInputParameter);

};


var startRestifyServer = function() {
    var server = restify.createServer();
    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.post(ROUTER_AUTHENTICATEUSER + CURRENT_VERSION, cors(), authenticateUserCallbackPost);
    server.post(ROUTER_REGISTERUSER + CURRENT_VERSION, cors(), registerUserCallbackPost);
    server.post(ROUTER_UPDATEUSER + CURRENT_VERSION, cors(), updateUserCallbackPost);
    server.post(ROUTER_UPDATEUSERPREFERENCE + CURRENT_VERSION, cors(), updateUserPreferenceCallbackPost);
    server.post(ROUTER_CREATESTAND + CURRENT_VERSION, cors(), createStandCallbackPost);
    server.post(ROUTER_UPDATESTAND + CURRENT_VERSION, cors(), updateStandCallbackPost);
    server.post(ROUTER_CHANGEREALTIMELOCATIONSTATUS + CURRENT_VERSION, cors(), changeRealTimeLocationStatusCallbackPost);
    server.get(ROUTER_GETSTANDCUSTOMERMARKCOMMENTS + CURRENT_VERSION, cors(), getStandCustomerMarkCommentsCallbackGet);
    server.post(ROUTER_CREATESTANDMARKCOMMENTS + CURRENT_VERSION, cors(), createStandMarkCommentsCallbackPost);
    server.get(ROUTER_GETSTANDMARKCOMMENTSEXIST + CURRENT_VERSION, cors(), getStandMarkCommentsExistCallbackGet);
    server.post(ROUTER_CREATESTANDOWNERMESSAGE + CURRENT_VERSION, cors(), createStandOwnerMessageCallbackPost);
    server.get(ROUTER_GETSTANDOWNERMESSAGES + CURRENT_VERSION, cors(), getStandOwnerMessagesCallbackGet);
    server.get(ROUTER_GETSTANDTYPES + CURRENT_VERSION, cors(), getStandTypesCallbackGet);
    server.get(ROUTER_GETIMAGEUPLOADSECURITYSTRING + CURRENT_VERSION, cors(), getImageUploadSecurityStringCallbackGet);
    server.get(ROUTER_GETAUTHCODE + CURRENT_VERSION, cors(), getAuthCodeCallbackGet);
    server.post(ROUTER_ADDLINKTOSTAND + CURRENT_VERSION, cors(), addLinkToStandCallbackPost);
    server.post(ROUTER_REMOVELINKFROMSTAND + CURRENT_VERSION, cors(), removeLinkFromStandCallbackPost);
    server.get(ROUTER_FETCHLINKLIST + CURRENT_VERSION, cors(), fetchLinkListCallbackGet);
    server.post(ROUTER_BAIDU_LBS_CREATEPOI + CURRENT_VERSION, cors(), createBaiduLBSGeoDataPoiCallbackPost);
    server.post(ROUTER_BAIDU_LBS_UPDATEPOI + CURRENT_VERSION, cors(), updateBaiduLBSGeoDataPoiCallbackPost);
    server.post(ROUTER_BAIDU_LBS_DELETEPOI + CURRENT_VERSION, cors(), deleteBaiduLBSGeoDataPoiCallbackPost);



    server.get(ROUTER_test + CURRENT_VERSION, cors(), function (req, res, next) {
        res.json("Hello, Success!!");
        next();

    });
    server.listen(SERVER_PORT, function() {
        console.log(numCPUs + "thread node activated...");
        console.log('%s listening at %s', server.name, server.url);
    });
};

startRestifyServer();

//if (cluster.isMaster) {
//    // Fork workers.
//    for (var i = 0; i < numCPUs; i++) {
//        cluster.fork();
//    }
//    if (DEBUG_FLAG) {
//        cluster.on('online', function (worker) {
//            console.log('worker ' + worker.process.pid + ' serve');
//        });
//        cluster.on('listening', function (worker, address) {
//            console.log('worker ' + worker.process.pid + " - " + address.address + ":" + address.port);
//        });
//        cluster.on('exit', function (worker, code, signal) {
//            console.log('worker ' + worker.process.pid + ' died');
//        });
//    }
//}
//else {
//    startRestifyServer();
//}





