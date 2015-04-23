var localStorageHelperClass = function()
{

    this.fetchStorageObject = function()
    {
        return localStorage;
    };
    var localStorageActual = this.fetchStorageObject();

    this.localUserInfo ={
        loadLocal: function()
        {
            var resultJson = {
                "userId": localStorageActual.localUserInfo_userId,
                "userName": localStorageActual.localUserInfo_userName,
                "displayName": localStorageActual.localUserInfo_displayName,
                "userImage": localStorageActual.localUserInfo_userImage,
                "userPreference": localStorageActual.localUserInfo_userPreference?JSON.parse(localStorageActual.localUserInfo_userPreference):null,
                "userType": localStorageActual.localUserInfo_userType,
                "email": localStorageActual.localUserInfo_email,
                "cellNumber": localStorageActual.localUserInfo_cellNumber,
                "webChat": localStorageActual.localUserInfo_webChat,
                "qqNumber": localStorageActual.localUserInfo_qqNumber,
                "provinceCityArea": localStorageActual.localUserInfo_provinceCityArea?JSON.parse(localStorageActual.localUserInfo_provinceCityArea):null,
                "createDate": localStorageActual.localUserInfo_createDate,
                "updateDate":localStorageActual.localUserInfo_updateDate
            };
            return resultJson;
        },
        refreshFromServer:function()
        {

        },
        userId: function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_userId = e;
                return e;
            }
            else
            {
               return localStorageActual.localUserInfo_userId;
            }
        },
        userName : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_userName = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_userName;
            }
        },
        displayName : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_displayName = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_displayName;
            }
        },
        userImage : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_userImage = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_userImage;
            }
        },
        userType : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_userType = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_userType;
            }
        },
        email : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_email = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_email;
            }
        },
        cellNumber : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_cellNumber = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_cellNumber;
            }
        },
        webChat : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_webChat = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_webChat;
            }
        },
        qqNumber : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_qqNumber = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_qqNumber;
            }
        },
        provinceCityArea : function(e)
        {
            if (e)
            {

                localStorageActual.localUserInfo_provinceCityArea = JSON.stringify(e);
                return e;
            }
            else
            {
                return JSON.parse(localStorageActual.localUserInfo_provinceCityArea);
            }
        },
        createDate : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_createDate = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_createDate;
            }
        },
        updateDate : function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_updateDate = e;
                return e;
            }
            else
            {
                return localStorageActual.localUserInfo_updateDate;
            }
        },
        userPreference: function(e)
        {
            if (e)
            {
                localStorageActual.localUserInfo_userPreference = JSON.stringify(e);
                return e;
            }
            else
            {
                return JSON.parse(localStorageActual.localUserInfo_userPreference);
            }
        }
    };
    this.userPreference = {

        displayDistance:function(e)
        {
            if (e)
            {
                localStorageActual.userPreference_displayDistance = e;
                return e;
            }
            else
            {
                return localStorageActual.userPreference_displayDistance;
            }
        },
        standType:function(e)
        {
            if (e)
            {
                localStorageActual.userPreference_standType = e;
                return e;
            }
            else
            {
                return localStorageActual.userPreference_standType;
            }
        },
        displayClientCreatedStand:function(e)
        {
            if (e)
            {
                localStorageActual.userPreference_displayClientCreatedStand = e;
                return e;
            }
            else
            {
                return localStorageActual.userPreference_displayClientCreatedStand;
            }
        },
        displayLinkedStandOnly:function(e)
        {
            if (e)
            {
                localStorageActual.userPreference_displayLinkedStandOnly = e;
                return e;
            }
            else
            {
                return localStorageActual.userPreference_displayLinkedStandOnly;
            }
        }

    };

    this.commonVariables =
    {
        majorMapCurrentPosition:function(e)
        {
            if (e)
            {
                localStorageActual.commonVariables_majorMapCurrentPosition = e;
                return e;
            }
            else
            {
                return localStorageActual.commonVariables_majorMapCurrentPosition;
            }
        }
    };

};
