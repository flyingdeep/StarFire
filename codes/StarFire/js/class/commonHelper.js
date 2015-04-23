var commonHelperClass = function() {

    var processOperation = new processFacadeClass();
    this.constructStandTypeHTML = function (callback, baseIdName) {
        //console.log(baseIdName);
        var standTypesCallback = function (e) {

            if (e) {
                var radioText;
                var radioValue;
                var itemString = "";
                var standTypeRadioIdBase = baseIdName;
                var idString;
                var nameString = baseIdName + "Radio";

                for (var item in e) {

                    radioText = e[item].type_name;
                    radioValue = e[item].stand_type_id;
                    idString = standTypeRadioIdBase + item;
                    itemString = itemString + '<div class="gcol2"><input id="' + idString + '" type="radio"  name="' + nameString + '" value="' + radioValue
                        + '"><label for="' + idString + '">' + radioText + '</label></div>';
                }
                itemString = itemString + "&nbsp;";
                callback(itemString);

            }
            else {
                callback(null);
            }

        };
        processOperation.getStandTypes(standTypesCallback);
    };


    this.getOSSSignatureAndPolicy = function (callback) {

        processOperation.getImageUploadSecurityString(function (e) {
                if (e) {
                    callback(e);

                }
                else {
                    callback(null);
                }


            }
        );
    };

    this.getUserBelongedLocation = function () {
        return "上海";

    };

    this.initialStandEntity = function () {
        createStandEntity.standId = null;
        createStandEntity.creatorType = null;
        createStandEntity.creatorId = null;
        createStandEntity.standName = null;
        createStandEntity.standType = null;
        createStandEntity.standSubContent = null;
        createStandEntity.description = null;
        createStandEntity.position = null;
        createStandEntity.images = [];

    };

    this.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };

    this.createStandPoiDb = function (callback, address, creatorType, standType, standName, typeDetailDescription, description, createUserId, creatorName, position, majorPic, images) {
        var createStandJson = createUpdateJsonStandPositionInfoInstance();
        var positionArr = position.split(",");
        createStandJson.title = standName;
        createStandJson.address = address;
        createStandJson.longitude = positionArr[0];
        createStandJson.latitude = positionArr[1];
        createStandJson.creater_id = createUserId;
        createStandJson.create_user = creatorName;
        createStandJson.creator_type = creatorType;
        createStandJson.tags = standType;
        createStandJson.type_detail = typeDetailDescription;
        createStandJson.description = description;

        var baiduLBS = new baiduLBSClass(serverProxyClass);
        baiduLBS.createLbsPosition(function (e) {

                if (e && e.status == "success") {
                    if (e.data.status == "true" && e.data.detail.success == "true") {
                        var standId = e.data.detail.result.stand_id;
                        (new processFacadeClass()).createNewStand(function (ex) {
                                if (ex) {

                                    // this.addSelectedStandImages = function(callback, images)
                                    var imagesJson = formImagesToJsonArray(images, standId, majorPic);
                                    (new processFacadeClass()).addSelectedStandImages(function (exx) {
                                        if (exx) {
                                            callback(standId);
                                        }
                                        else {
                                            callback(null);
                                        }
                                    }, imagesJson);

                                }
                                else {
                                    callback(null);
                                }

                            }, standId, creatorType, standType, standName, typeDetailDescription, description, createUserId, position
                        );

                    }
                    else {

                        callback(null);
                    }
                }
                else {
                    callback(null);
                }
            }
            , createStandJson);
    };

    this.showToast = function (message, position, autoClose, type) {
        var tempToast = $.afui.toast({
            message: message,
            position: position,
            autoClose: autoClose, //have to click the message to close
            type: type
        });
        globalToasts.push(tempToast);
    };

    this.loginUser = function(callback,username,password)
    {
        password =b64_md5(password);
        (new processFacadeClass()).authenticateUser(function(e)
        {

            if (e)
            {
                var userInfoLocalContainer = {
                    "userId": e.user_id,
                    "userName": e.user_name,
                    "displayName": e.display_name,
                    "userImage": e.image_id,
                    "userPreference": JSON.stringify(e.user_preference),
                    "userType": e.user_type,
                    "email": e.email,
                    "cellNumber": e.cell_number,
                    "webChat": e.web_chat,
                    "qqNumber": e.qq_number,
                    "provinceCityArea": JSON.stringify(e.province_city_area),
                    "createDate": e.createdate,
                    "updateDate":e.updatedate
                };

                callback(userInfoLocalContainer);

            }
            else{
              callback(null);
            }

        },username,password);

    };

    var formImagesToJsonArray = function (images, standId, tipImageId) {

        var stand_image = null;
        var result = [];
        for (var i = 0; i < images.length; i++) {
            var commentsStr = "0";
            if (images[i] == tipImageId) {
                commentsStr = "1";
            }
            stand_image = {
                stand_Id: standId,
                image_Id: images[i],
                comments: commentsStr
            };
            result.push(stand_image);
        }
        return result;
    };

};
