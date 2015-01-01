var remoteClientClass = function()
{
    var REST_SERVER_DOMAIN = "http://localhost";
    var APP_URI = "zhaotantou";
    var PORT = "8080";
    var BASE_ROUTER = REST_SERVER_DOMAIN + ":" + PORT + "/" + APP_URI + "/";
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


    this.authenticateUserBase = function(callback, token, userAuthJson)
    {
        var inputJson = {
           "token":token,
            "inputParameter": JSON.stringify(userAuthJson)
        };
        var targetUrl = ROUTER_AUTHENTICATEUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
            function(data,status){
                if (status == "success")
                {

                     callback(data);
                }
                else
                {
                    callback(null);
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

    this.getAuthCodeBase = function(callback, username, password)
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
                    callback(data);
                }
                else
                {
                    callback(null);
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

var serverProxyClass = function(username,password)
{
    this.username = username;
    this.password = password;
    var remoteClient = new remoteClientClass();
    var result = null;
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
    var getAuth = function(callback) {
        var result = null;
        var resultJson = remoteClient.getAuthCodeBase(function(resultJson)
        {
            if (resultJson && resultJson.status == "true") {
                result = resultJson.detail;
            }
            callback(result);
        },username, password);
    }

    this.authenticateUser = function(callback,username,password)
    {
        var result = null;
        getAuth(
            function(token)
            {

                if (token)
                {
                    var userAuthJson = {
                        "user_name" : username,
                        "password": password
                    };

                    var resultJson = remoteClient.authenticateUserBase(function(resultJson)
                        {

                            if (resultJson && resultJson.status == "true")
                            {
                                result = resultJson.detail;

                            }
                            callback(result);
                        }
                        ,token,userAuthJson);
                }
            }
        );

    };
    this.registerUser = function(displayName, username, imageId, userPreference, userType, cellNumber,webChat, qqNumber,provinceCityArea,password)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var userAuthJson = {
                "user_name" : username,
                "password": password,
                "display_name":displayName,
                "image_id" : imageId,
                "user_preference":userPreference,
                "user_type": userType,
                "cell_number" : cellNumber,
                "web_chat" : webChat,
                "qq_number" :qqNumber,
                "province_city_area" : provinceCityArea
            };
            reformJsonObject(userAuthJson);
            var resultJson = remoteClient.authenticateUserBase(token,userAuthJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.updateUser = function(displayName, username, imageId, userPreference, userType, cellNumber,webChat, qqNumber,provinceCityArea,password)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var userAuthJson = {
                "user_name" : username,
                "password": password,
                "display_name":displayName,
                "image_id" : imageId,
                "user_preference":userPreference,
                "user_type": userType,
                "cell_number" : cellNumber,
                "web_chat" : webChat,
                "qq_number" :qqNumber,
                "province_city_area" : provinceCityArea
            };
            reformJsonObject(userAuthJson);
            var resultJson = remoteClient.authenticateUserBase(token,userAuthJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.updateUserPreference = function(user_name,userPreference)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var userPreferenceJson = {
                "user_name" : username,
                "user_preference":userPreference
            };
            reformJsonObject(userPreferenceJson);
            var resultJson = remoteClient.updateUserPreferenceBase(token,userPreferenceJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.createStand = function(standId, creatorType, standType, standName, typeDetailDescription, description, createUserId, positionX, PositionY)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var standInfoJson = {
                "stand_id" : standId,
                "creator_type":creatorType,
                "stand_type":standType,
                "stand_name":standName,
                "type_detail_description":typeDetailDescription,
                "description":description,
                "create_user_id":createUserId,
                "isactive" :1,
                "mark": 0,
                "position_x": positionX,
                "position_y": PositionY,
                "realtime_location_active": 0
            };
            reformJsonObject(standInfoJson);
            var resultJson = remoteClient.createStandBase(token,standInfoJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.updateStand = function(standId, standName, typeDetailDescription, description, isActive, positionX, PositionY)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var standInfoJson = {
                "stand_id" : standId,
                "stand_name":standName,
                "type_detail_description":typeDetailDescription,
                "description":description,
                "isactive" :isActive,
                "position_x": positionX,
                "position_y": PositionY
            };
            reformJsonObject(standInfoJson);
            var resultJson = remoteClient.createStandBase(token,standInfoJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.changeRealTimeLocationStatus = function(standId,realTimeLocationActive)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var standInfoJson = {
                "stand_id" : standId,
                "realtime_location_active":realTimeLocationActive
            };
            reformJsonObject(standInfoJson);
            var resultJson = remoteClient.createStandBase(token,standInfoJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.getStandCustomerMarkComments = function(username, standId,offset,pageSize, sort)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.getStandCustomerMarkCommentsBase(token,username, standId,offset,pageSize, sort);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.createStandMarkComments = function(standId,mark,comments,createUserId, createUserName)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var standMarkCommentsJson = {
                "stand_id" : standId,
                "mark":mark,
                "comments":comments,
                "create_user_id":createUserId,
                "create_user_name":createUserName
            };
            reformJsonObject(standMarkCommentsJson);
            var resultJson = remoteClient.createStandMarkCommentsBase(token,standMarkCommentsJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.getStandMarkCommentsExist = function(username, standId)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.getStandMarkCommentsExistBase(token,username, standId);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.createStandOwnerMessage = function(standId,message)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var standOwnerMessageJson = {
                "stand_id" : standId,
                "message":message
            };
            reformJsonObject(standOwnerMessageJson);
            var resultJson = remoteClient.createStandOwnerMessageBase(token,standOwnerMessageJson);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.getStandOwnerMessages = function(userId, standId,offset,pageSize,sort)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.getStandOwnerMessagesBase(token,userId, standId,offset,pageSize,sort);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.getStandTypes = function()
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.getStandTypesBase(token);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.getImageUploadSecurityString = function(policy,key)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.getImageUploadSecurityStringBase(token,policy,key);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.addLinkToStand = function(standId,userId)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var linkToStandInfo = {
                "stand_id" : standId,
                "user_id" : userId
            };
            reformJsonObject(linkToStandInfo);
            var resultJson = remoteClient.addLinkToStandBase(token,linkToStandInfo);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.removeLinkFromStand = function(standId,userId)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var linkToStandInfo = {
                "stand_id" : standId,
                "user_id" : userId
            };
            reformJsonObject(linkToStandInfo);
            var resultJson = remoteClient.removeLinkFromStandBase(token,linkToStandInfo);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };
    this.fetchLinkList = function(userId, standId,offset,pageSize,sort)
    {
        var result = null;
        var token = getAuth();
        if (token)
        {
            var resultJson = remoteClient.fetchLinkListBase(token,userId, standId,offset,pageSize,sort);
            if (resultJson && resultJson.status == "true")
            {
                result = resultJson.detail;
            }
        }
        return result;
    };

};
