var remoteClientClass = function()
{
    var REST_SERVER_DOMAIN = "http://localhost/";
    var APP_URI = "zhaotantou";
    var BASE_ROUTER = REST_SERVER_DOMAIN + APP_URI + "/";
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
    var BASE_VERSION = "/v1";
    this.authenticateUserBase = function(token, userAuthJson)
    {
        var inputJson = {
           "token":token,
            "inputParameter": userAuthJson
        };
        var targetUrl = ROUTER_AUTHENTICATEUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.registerUserBase = function(token, userInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": userInfoJson
        };
        var targetUrl = ROUTER_REGISTERUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.updateUserBase = function(token, userInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": userInfoJson
        };
        var targetUrl = ROUTER_UPDATEUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.updateUserPreferenceBase = function(token, userPreferenceJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": userPreferenceJson
        };
        var targetUrl = ROUTER_UPDATEUSERPREFERENCE + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.createStandBase = function(token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": standInfoJson
        };
        var targetUrl = ROUTER_CREATESTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.updateStandBase = function(token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": standInfoJson
        };
        var targetUrl = ROUTER_UPDATESTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.changeRealTimeLocationStatusBase = function(token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": standInfoJson
        };
        var targetUrl = ROUTER_CHANGEREALTIMELOCATIONSTATUS + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getStandCustomerMarkCommentsBase = function(token, username, standId,offset,pageSize, sort)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        paraString =paraString + "&username=" + encodeURIComponent(username);
        paraString =paraString + "&standId=" + encodeURIComponent(standId);
        paraString =paraString + "&offset=" + encodeURIComponent(offset);
        paraString =paraString + "&pageSize=" + encodeURIComponent(pageSize);
        paraString =paraString + "&sort=" + encodeURIComponent(sort);
        var targetUrl = ROUTER_GETSTANDCUSTOMERMARKCOMMENTS + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.createStandMarkCommentsBase = function(token, standMarkCommentsJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": standMarkCommentsJson
        };
        var targetUrl = ROUTER_CREATESTANDMARKCOMMENTS + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getStandMarkCommentsExistBase = function(token, username, standId)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        paraString =paraString + "&username=" + encodeURIComponent(username);
        paraString =paraString + "&standId=" + encodeURIComponent(standId);
        var targetUrl = ROUTER_GETSTANDMARKCOMMENTSEXIST + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.createStandOwnerMessageBase = function(token, standOwnerMessageJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": standOwnerMessageJson
        };
        var targetUrl = ROUTER_CREATESTANDOWNERMESSAGE + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getStandOwnerMessagesBase = function(token, userId, standId,offset,pageSize,sort)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        paraString =paraString + "&userId=" + encodeURIComponent(userId);
        paraString =paraString + "&standId=" + encodeURIComponent(standId);
        paraString =paraString + "&offset=" + encodeURIComponent(offset);
        paraString =paraString + "&pageSize=" + encodeURIComponent(pageSize);
        paraString =paraString + "&sort=" + encodeURIComponent(sort);
        var targetUrl = ROUTER_GETSTANDOWNERMESSAGES + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getStandTypesBase = function(token)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        var targetUrl = ROUTER_GETSTANDTYPES + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getImageUploadSecurityStringBase = function(token, policy, key)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        paraString =paraString + "&policy=" + encodeURIComponent(policy);
        paraString =paraString + "&key=" + encodeURIComponent(key);
        var targetUrl = ROUTER_GETIMAGEUPLOADSECURITYSTRING + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };

    this.getAuthCodeBase = function(username, password)
    {
        var paraString = "?";
        paraString =paraString + "username=" + encodeURIComponent(username);
        paraString =paraString + "&password=" + encodeURIComponent(password);
        var targetUrl = ROUTER_GETAUTHCODE + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };
    this.addLinkToStandBase = function(token, linkToStandInfo)
    {
        var inputJson = {
            "token":token,
            "inputParameter": linkToStandInfo
        };
        var targetUrl = ROUTER_ADDLINKTOSTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };
    this.removeLinkFromStandBase = function(token, linkToStandInfo)
    {
        var inputJson = {
            "token":token,
            "inputParameter": linkToStandInfo
        };
        var targetUrl = ROUTER_REMOVELINKFROMSTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };
    this.fetchLinkListBase = function(token, userId, standId,offset,pageSize,sort)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        paraString =paraString + "&userId=" + encodeURIComponent(userId);
        paraString =paraString + "&standId=" + encodeURIComponent(standId);
        paraString =paraString + "&offset=" + encodeURIComponent(offset);
        paraString =paraString + "&pageSize=" + encodeURIComponent(pageSize);
        paraString =paraString + "&sort=" + encodeURIComponent(sort);
        var targetUrl = ROUTER_FETCHLINKLIST + BASE_VERSION + paraString;
        jQuery.get(targetUrl,
            function(data,status)
            {
                if (status == "success")
                {
                    return data;
                }
            }
        );
    };
};

var remoteProxyClass = function()
{



};
