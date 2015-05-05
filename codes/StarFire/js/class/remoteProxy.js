var remoteClientClass = function()
{
//    var REST_SERVER_DOMAIN = "http://192.168.31.139";
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
    var ROUTER_ADDSTANDIMAGES = BASE_ROUTER + "AddStandImages";
    var ROUTER_REMOVESTANDIMAGES = BASE_ROUTER + "RemoveStandImages";
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

    this.registerUserBase = function(callback, token, userInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(userInfoJson)
        };
        var targetUrl = ROUTER_REGISTERUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.updateUserBase = function(callback,token, userInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(userInfoJson)
        };
        var targetUrl = ROUTER_UPDATEUSER + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.updateUserPreferenceBase = function(callback,token, userPreferenceJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(userPreferenceJson)
        };
        var targetUrl = ROUTER_UPDATEUSERPREFERENCE + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.createStandBase = function(callback, token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standInfoJson)
        };
        var targetUrl = ROUTER_CREATESTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.updateStandBase = function(callback, token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standInfoJson)
        };
        var targetUrl = ROUTER_UPDATESTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.addStandImagesBase = function(callback, token, standImagesJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standImagesJson)
        };
        var targetUrl = ROUTER_ADDSTANDIMAGES + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.removeStandImagesBase = function(callback, token, standImagesJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standImagesJson)
        };
        var targetUrl = ROUTER_REMOVESTANDIMAGES + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.changeRealTimeLocationStatusBase = function(callback, token, standInfoJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standInfoJson)
        };
        var targetUrl = ROUTER_CHANGEREALTIMELOCATIONSTATUS + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.getStandCustomerMarkCommentsBase = function(callback, token, username, standId,offset,pageSize, sort)
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
                    callback(data);
                }
                else
                {
                    callback(null);
                }
            }
        );
    };

    this.createStandMarkCommentsBase = function(callback, token, standMarkCommentsJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standMarkCommentsJson)
        };
        var targetUrl = ROUTER_CREATESTANDMARKCOMMENTS + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.getStandMarkCommentsExistBase = function(callback,token, username, standId)
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
                    callback(data);
                }
                else
                {
                    callback(null);
                }
            }
        );
    };

    this.createStandOwnerMessageBase = function(callback, token, standOwnerMessageJson)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(standOwnerMessageJson)
        };
        var targetUrl = ROUTER_CREATESTANDOWNERMESSAGE + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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

    this.getStandOwnerMessagesBase = function(callback, token, userId, standId,offset,pageSize,sort)
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
                    callback(data);
                }
                else
                {
                    callback(null);
                }
            }
        );
    };

    this.getStandTypesBase = function(callback, token)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        var targetUrl = ROUTER_GETSTANDTYPES + BASE_VERSION + paraString;
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

    this.getImageUploadSecurityStringBase = function(callback, token)
    {
        var paraString = "?";
        paraString =paraString + "token=" + encodeURIComponent(token);
        var targetUrl = ROUTER_GETIMAGEUPLOADSECURITYSTRING + BASE_VERSION + paraString;
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
    this.addLinkToStandBase = function(callback, token, linkToStandInfo)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(linkToStandInfo)
        };
        var targetUrl = ROUTER_ADDLINKTOSTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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
    this.removeLinkFromStandBase = function(callback, token, linkToStandInfo)
    {
        var inputJson = {
            "token":token,
            "inputParameter": JSON.stringify(linkToStandInfo)
        };
        var targetUrl = ROUTER_REMOVELINKFROMSTAND + BASE_VERSION;
        jQuery.post(targetUrl, inputJson,
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
    this.fetchLinkListBase = function(callback, token, userId, standId,offset,pageSize,sort)
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
                    callback(data);
                }
                else
                {
                    callback(null);
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
        remoteClient.getAuthCodeBase(function(resultJson)
        {

            if (resultJson && resultJson.status == "true" && resultJson.detail.success == "true") {
                result = resultJson.detail.result.token;
            }
            callback(result);
        },username, password);
    }

    //getAuth expose to outside
    this.getAuthExternal = function(callback)
    {
        getAuth(callback);
    };

    //reformJsonObject expose to outside
    this.reformJsonObjectExternal = function(e)
    {
        reformJsonObject(e);
    };


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

                    remoteClient.authenticateUserBase(function(resultJson)
                        {

                            if (resultJson && resultJson.status == "true")
                            {
                                result = resultJson.detail;

                            }
                            callback(result);
                        }
                        ,token,userAuthJson);
                }
                else
                {
                    callback(null);
                }
            }
        );

    };
    this.registerUser = function(callback, displayName, username, imageId, userPreference, userType, email, cellNumber,webChat, qqNumber,provinceCityArea,password)
    {
        var result = null;
        getAuth(
            function(token)
            {
                if (token)
                {
                    var userAuthJson = {
                        "user_name" : username,
                        "password": password,
                        "display_name":displayName,
                        "image_id" : imageId,
                        "user_preference":userPreference,
                        "user_type": userType,
                        "email":email,
                        "cell_number" : cellNumber,
                        "web_chat" : webChat,
                        "qq_number" :qqNumber,
                        "province_city_area" : provinceCityArea
                    };

                    reformJsonObject(userAuthJson);
                    remoteClient.registerUserBase(function(resultJson)
                        {
                            if (resultJson && resultJson.status == "true")
                            {
                                result = resultJson.detail;
                            }
                            callback(result);
                        },
                    token,userAuthJson);
                }
                else
                {
                    callback(null);
                }
            }

        );

    };
    this.updateUser = function(callback, displayName, username, imageId, userPreference, userType, cellNumber,webChat, qqNumber,provinceCityArea,password)
    {
        var result = null;
        getAuth(function(token)
            {
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
                    remoteClient.updateUserBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    }, token,userAuthJson);

                }
                else
                {
                    callback(null);
                }

            }
        );

    };
    this.updateUserPreference = function(callback, user_name,userPreference)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    var userPreferenceJson = {
                        "user_name" : user_name,
                        "user_preference":userPreference
                    };
                    reformJsonObject(userPreferenceJson);
                    remoteClient.updateUserPreferenceBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);

                    },token,userPreferenceJson);

                }
                else
                {
                    callback(null);
                }
            }
        );

    };
    this.createStand = function(callback, standId, creatorType, standType, standName, typeDetailDescription, description, createUserId, positionX, PositionY)
    {
        var result = null;
       getAuth(function(token)
           {
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
                   remoteClient.createStandBase(function(resultJson)
                   {

                       if (resultJson && resultJson.status == "true")
                       {
                           result = resultJson.detail;
                       }
                       callback(result);
                   },
                   token,standInfoJson);

               }
               else
               {
                   callback(null);
               }

           }
       );

    };
    this.updateStand = function(callback, standId, standName, typeDetailDescription, description, isActive, positionX, PositionY)
    {
        var result = null;
        getAuth(function(token)
            {
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
                    remoteClient.updateStandBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },
                    token,standInfoJson);

                }
                else
                {
                    callback(null);
                }


            }
        );

    };

    this.addStandImages = function(callback, standImages)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.addStandImagesBase(function(resultJson)
                        {
                            if (resultJson && resultJson.status == "true")
                            {
                                result = resultJson.detail;
                            }
                            callback(result);
                        },
                        token,standImages);
                }
                else
                {
                    callback(null);
                }
            }
        );

    };

    this.removeStandImages = function(callback, standImages)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.removeStandImagesBase(function(resultJson)
                        {
                            if (resultJson && resultJson.status == "true")
                            {
                                result = resultJson.detail;
                            }
                            callback(result);
                        },
                        token,standImages);
                }
                else
                {
                    callback(null);
                }
            }
        );

    };


    this.changeRealTimeLocationStatus = function(callback,standId,realTimeLocationActive)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    var standInfoJson = {
                        "stand_id" : standId,
                        "realtime_location_active":realTimeLocationActive
                    };
                    reformJsonObject(standInfoJson);
                    remoteClient.changeRealTimeLocationStatusBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);

                    },token,standInfoJson);
                }
                else
                {
                    callback(null);
                }

            }
        );

    };
    this.getStandCustomerMarkComments = function(callback, username, standId,offset,pageSize, sort)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.getStandCustomerMarkCommentsBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },
                    token,username, standId,offset,pageSize, sort);

                }
                else
                {
                    callback(null);
                }

            }
        );
    };
    this.createStandMarkComments = function(callback, standId,mark,comments,createUserId, createUserName)
    {
        var result = null;
        getAuth(function(token)
            {
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
                    remoteClient.createStandMarkCommentsBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);

                    },token,standMarkCommentsJson);

                }
                else
                {
                    callback(null);
                }


            }
        );
    };
    this.getStandMarkCommentsExist = function(callback, username, standId)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.getStandMarkCommentsExistBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },token,username, standId);

                }
                else
                {
                    callback(null);
                }
            }
        );
    };
    this.createStandOwnerMessage = function(callback,standId,message)
    {
        var result = null;
        getAuth(function(token)
        {
            if (token)
            {
                var standOwnerMessageJson = {
                    "stand_id" : standId,
                    "message":message
                };
                reformJsonObject(standOwnerMessageJson);
                remoteClient.createStandOwnerMessageBase(function(resultJson)
                {
                    if (resultJson && resultJson.status == "true")
                    {
                        result = resultJson.detail;
                    }
                    callback(result);
                },token,standOwnerMessageJson);

            }
            else{
                callback(null);
            }

        });

    };
    this.getStandOwnerMessages = function(callback, userId, standId,offset,pageSize,sort)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.getStandOwnerMessagesBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },token,userId, standId,offset,pageSize,sort);
                }
                else
                {
                    callback(null);
                }

            }
        );
    };
    this.getStandTypes = function(callback)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.getStandTypesBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },token);

                }
                else
                {
                    callback(null);
                }

            }
        );

    };
    this.getImageUploadSecurityString = function(callback)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    remoteClient.getImageUploadSecurityStringBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },
                    token);
                }
                else
                {
                    callback(null);
                }
            }
        );
    };
    this.addLinkToStand = function(callback, standId,userId)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    var linkToStandInfo = {
                        "stand_id" : standId,
                        "user_id" : userId
                    };
                    reformJsonObject(linkToStandInfo);
                    remoteClient.addLinkToStandBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },token,linkToStandInfo);

                }
                else
                {
                    callback(null);
                }

            }
        );

    };
    this.removeLinkFromStand = function(callback, standId,userId)
    {
        var result = null;
        getAuth(function(token)
            {
                if (token)
                {
                    var linkToStandInfo = {
                        "stand_id" : standId,
                        "user_id" : userId
                    };
                    reformJsonObject(linkToStandInfo);
                    remoteClient.removeLinkFromStandBase(function(resultJson)
                    {
                        if (resultJson && resultJson.status == "true")
                        {
                            result = resultJson.detail;
                        }
                        callback(result);
                    },token,linkToStandInfo);

                }
                else
                {
                    callback(null);

                }
            }
        );
    };
    this.fetchLinkList = function(callback, userId, standId,offset,pageSize,sort)
    {
        var result = null;
        getAuth(function(token)
        {
            if (token)
            {
                remoteClient.fetchLinkListBase(function(resultJson)
                {
                    if (resultJson && resultJson.status == "true")
                    {
                        result = resultJson.detail;
                    }
                },token,userId, standId,offset,pageSize,sort);

            }
            else
            {
                callback(null);
            }

        });
    };

};
