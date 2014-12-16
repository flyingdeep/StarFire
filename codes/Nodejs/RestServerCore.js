var restify = require("restify");
var cors = require("cors");
var hashMapBaseClass = require("./helper_modules/hashMap.js");

var serviceOperation = require("./biz_modules/serviceFacade.js");

var HTTP_SUCCESS_CODE = "201";
var METHOD_POST = "post";
var METHOD_GET = "get";

var SERVER_PORT = "80";
var SYMBOL_SLASH="/";
var VERSION_V1 ="v1";
var CURRENT_VERSION = SYMBOL_SLASH + VERSION_V1;
var BASE_ROUTER = SYMBOL_SLASH + "zhaotantou" + SYMBOL_SLASH;

var ROUTER_AUTHENTICATEUSER = BASE_ROUTER + "AuthenticateUser";
var ROUTER_REGISTERUSER = BASE_ROUTER + "RegisterUser";
var ROUTER_UPDATEUSER = BASE_ROUTER + "UpdateUser";
var ROUTER_UPDATEUSERPREFERENCE = BASE_ROUTER + "UpdateUserPreference";
var ROUTER_CREATESTAND = BASE_ROUTER + "CreateStand";
var ROUTER_UPDATESTAND = BASE_ROUTER + "UpdateStand";
var ROUTER_CHANGEREALTIMELOCATIONSTATUS = BASE_ROUTER + "ChangeRealTimeLocationStatus";
var ROUTER_GETSTANDCUSTOMERMARKCOMMENTS = BASE_ROUTER + "GetStandCustomerMarkComments";
var ROUTER_CREATESTANDMARKCOMMENT = BASE_ROUTER + "CreateStandMarkComment";
var ROUTER_GETSTANDMARKCOMMENTEXIST = BASE_ROUTER + "GetStandMarkCommentExist";
var ROUTER_CREATESTANDOWNERMESSAGE = BASE_ROUTER + "CreateStandOwnerMessage";
var ROUTER_GETSTANDOWNERMESSAGES = BASE_ROUTER + "GetStandOwnerMessages";
var ROUTER_GETSTANDTYPES = BASE_ROUTER + "GetStandTypes";
var ROUTER_SETSTANDLOCATION = BASE_ROUTER + "SetStandLocation";
var ROUTER_GETIMAGEUPLOADSECURITYSTRING = BASE_ROUTER + "GetImageUploadSecurityString";
var ROUTER_GETAUTHCODE = BASE_ROUTER + "GetAuthCode";

var hashMap = new hashMapBaseClass();

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
    this.status = "Unknown";
    this.detail = "Unknown";
}

var authenticateUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
             "user_id" : e[0].user_id,
             "display_name":e[0].display_name,
            "user_name":e[0].user_name,
            "image_id":e[0].image_id,
            "user_preference":e[0].user_preference,
            "user_type":e[0].user_type,
            "cell_number":e[0].cell_number,
            "web_chart":e[0].web_chart,
            "qq_number":e[0].qq_number,
            "province_city_area":e[0].province_city_area,
            "createdate":e[0].createdate,
            "updatedate":e[0].updatedate
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.generateAuthenticateToken,callback,requestInputParameter );
};
var registerUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "user_name":requestInputParameter.user_name
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.registerUser,callback,requestInputParameter );



};
var updateUserCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "user_name":requestInputParameter.user_name
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateUser,callback,requestInputParameter );

};
var updateUserPreferenceCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "user_name":requestInputParameter.user_name
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateUserPreference,callback,requestInputParameter );
};
var createStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "stand_id":requestInputParameter.stand_id
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createStand,callback,requestInputParameter );

};
var updateStandCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "stand_id":requestInputParameter.stand_id
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.updateStand,callback,requestInputParameter );
};
var changeRealTimeLocationStatusCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "stand_id":requestInputParameter.stand_id
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

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
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "stand_id":requestInputParameter.stand_id
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);

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
var createStandMarkCommentCallbackPost = function(req, res, next)
{
    var paraToken = "token";
    var paraInputParameter = "inputParameter";
    var requestToken = getCommonParameters(req,paraToken,METHOD_POST);
    var requestInputParameter = getCommonParameters(req,paraInputParameter,METHOD_POST);
    var callback = function(e)
    {
        if (e && e!= -1)
        {
            var result = new commonResult();
            result.status = "True";
            result.detail = {
                "stand_id":requestInputParameter.stand_id
            };
        }
        else
        {
            result.status = "false";
            result.detail = {"message":"Internal Error!"};
        }
        res.json(HTTP_SUCCESS_CODE,result);
    };
    serviceOperation.tryPassTokenToProceedAction(requestToken,hashMap,
        serviceOperation.createStandOwnerMessage,callback,requestInputParameter );
};
var getStandMarkCommentExistCallbackGet = function(req, res, next)
{

};
var createStandOwnerMessageCallbackPost = function(req, res, next)
{

};
var getStandOwnerMessagesCallbackGet = function(req, res, next)
{

};
var getStandTypesCallbackGet = function(req, res, next)
{

};
var setStandLocationCallbackPost = function(req, res, next)
{

};
var getImageUploadSecurityStringCallbackGet = function(req, res, next)
{

};
var getAuthCodeCallbackGet = function(req, res, next)
{

};

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.post(ROUTER_AUTHENTICATEUSER + CURRENT_VERSION,cors(), authenticateUserCallbackPost);
server.post(ROUTER_REGISTERUSER + CURRENT_VERSION,cors(), registerUserCallbackPost);
server.post(ROUTER_UPDATEUSER + CURRENT_VERSION,cors(), updateUserCallbackPost);
server.post(ROUTER_UPDATEUSERPREFERENCE + CURRENT_VERSION,cors(), updateUserPreferenceCallbackPost);
server.post(ROUTER_CREATESTAND + CURRENT_VERSION,cors(), createStandCallbackPost);
server.post(ROUTER_UPDATESTAND + CURRENT_VERSION,cors(), updateStandCallbackPost);
server.post(ROUTER_CHANGEREALTIMELOCATIONSTATUS + CURRENT_VERSION,cors(), changeRealTimeLocationStatusCallbackPost);
server.get(ROUTER_GETSTANDCUSTOMERMARKCOMMENTS + CURRENT_VERSION,cors(), getStandCustomerMarkCommentsCallbackGet);
server.post(ROUTER_CREATESTANDMARKCOMMENT + CURRENT_VERSION,cors(), createStandMarkCommentCallbackPost);
server.get(ROUTER_GETSTANDMARKCOMMENTEXIST + CURRENT_VERSION,cors(), getStandMarkCommentExistCallbackGet);
server.post(ROUTER_CREATESTANDOWNERMESSAGE + CURRENT_VERSION,cors(), createStandOwnerMessageCallbackPost);
server.get(ROUTER_GETSTANDOWNERMESSAGES + CURRENT_VERSION,cors(), getStandOwnerMessagesCallbackGet);
server.get(ROUTER_GETSTANDTYPES + CURRENT_VERSION,cors(), getStandTypesCallbackGet);
server.post(ROUTER_SETSTANDLOCATION + CURRENT_VERSION,cors(), setStandLocationCallbackPost);
server.get(ROUTER_GETIMAGEUPLOADSECURITYSTRING + CURRENT_VERSION,cors(), getImageUploadSecurityStringCallbackGet);
server.get(ROUTER_GETAUTHCODE + CURRENT_VERSION,cors(), getAuthCodeCallbackGet);

server.listen(SERVER_PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});








