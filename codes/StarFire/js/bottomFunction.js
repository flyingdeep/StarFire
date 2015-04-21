function initialCreateStandFieldEvent()
{
    if (!createStandEntity.standName)
    {
        $("#standName").val("");
    }

    if (!createStandEntity.standType)
    {
        $("#standTypeDiv").children(":radio").prop("checked", false);
    }

    if (!createStandEntity.standSubContent)
    {
        $("#subStandType").val("");
    }

    if (!createStandEntity.description)
    {
        $("#standDescription").val("");
    }

    $("#standName").on("change",eventHandlerManager.standName_Sharp_Change);

    $("#standTypeDiv").on("change",eventHandlerManager.standTypeDiv_Sharp_Change);

    $("#subStandType").on("change",eventHandlerManager.subStandType_Sharp_Change);

    $("#standDescription").on("change",eventHandlerManager.standDescription_Sharp_Change);
}

function createUserStand()
{
    //*********** for test only ****************
    userBasicInfoEntity.userId = 5;
    userBasicInfoEntity.userName = "flyingdeep";
    userBasicInfoEntity.userType = 1;
    //*****************************
    var standImageTip = null;
    var images = [];
    for (var imageItem in createStandEntity.images)
    {
        if (createStandEntity.images[imageItem] != 0)
        {
            images.push(imageItem);
            if (images.length == 1)
            {
                standImageTip =imageItem;
            }
//            if (createStandEntity.images[imageItem] == 2)
//            {
//                standImageTip = imageItem;
//            }
        }
    }
    $.afui.showMask(hint_Message.CREATE_STAND_CREATING_HINT);
    commonHelper.createStandPoiDb(function(e)
    {
           if(e)
           {

               transferToPanel("#mapPanel","invoke");
               commonHelper.showToast(hint_Message.CREATE_STAND_CREATING_SUCCESS,"bc",true,"success");
               $.afui.hideMask();
           }
            else
           {
               commonHelper.showToast(hint_Message.CREATE_STAND_CREATING_ERROR,"bc",true,"error");
               $.afui.hideMask();
           }
    },
    createStandEntity.address,userBasicInfoEntity.userType,createStandEntity.standType,
    createStandEntity.standName,createStandEntity.standSubContent,createStandEntity.description,
    userBasicInfoEntity.userId,userBasicInfoEntity.userName,createStandEntity.position,standImageTip,images);
}

function standLocationNoneSetCheck()
{
    //
    if (!createStandEntity.position)
    {
        commonHelper.showToast(hint_Message.CREATE_STAND_SET_MAP_POINT_NONE_ERROR,"bc",true,"error");
        return false;
    }
    return true;
}

function fieldValidationCreateStand()
{

    var result = true;
    var messageContent = "";
    if (!createStandEntity.standName || commonHelper.trim(createStandEntity.standName).length==0)
    {
        messageContent = messageContent + hint_Message.CREATE_STAND_STAND_NAME_LENGTH_ERROR + "<br />";
        result = false;
    }
    else if (!REG_EXPRESSION_STAND_NAME.test(commonHelper.trim(createStandEntity.standName)))
    {
        messageContent = messageContent + hint_Message.CREATE_STAND_STAND_NAME_CHARACTER_ERROR + "<br />";
        result = false;
    }
    if (!createStandEntity.standType)
    {
        messageContent = messageContent + hint_Message.CREATE_STAND_STAND_TYPE_NO_SELECTED_ERROR + "<br />";
        result = false;
    }
    if (!createStandEntity.standSubContent || commonHelper.trim(createStandEntity.standSubContent).length == 0)
    {
        messageContent = messageContent + hint_Message.CREATE_STAND_SUB_STAND_TYPE_NO_FILLED_ERROR + "<br />";
        result = false;
    }
    else if (!REG_EXPRESSION_STAND_SUB_TYPE_NAME.test(commonHelper.trim(createStandEntity.standSubContent)))
    {
        messageContent = messageContent + hint_Message.CREATE_STAND_SUB_STAND_TYPE_CHARACTER_ERROR + "<br />";
        result = false;
    }



    if (!result)
    {
        commonHelper.showToast(messageContent,"bc",true,"error");
    }
    return result;
}



function searchSecLocation(mapObject)
{
    $("#resultList").html("");
    transferToPanel("#searchResultListPanel","pop");
    var searchString = $("#searchDivInner input").val();
    $("#searchDivResultInner input").val(searchString);
    $("#searchResultListForm").on("submit",function()
        {
            var searchStringInner = $("#searchDivResultInner input").val();
            $("#searchInput").val(searchStringInner);

            searchLocalPosition(searchStringInner,mapObject,$("#resultList"));
            return false;
        }
    );
    searchLocalPosition(searchString,mapObject,$("#resultList"));
}

function searchLocation(mapObject)
{
    $("#resultList").html("");
    transferToPanel("#searchResultListPanel","pop");
    var searchString = $("#searchInput").val();
    $("#searchDivResultInner input").val(searchString);
    $("#searchResultListForm").on("submit",function()
        {
            var searchStringInner = $("#searchDivResultInner input").val();
            $("#searchInput").val(searchStringInner);

            searchLocalPosition(searchStringInner,mapObject,$("#resultList"));
            return false;
        }
    );
    searchLocalPosition(searchString,mapObject,$("#resultList"));
}

function searchStand(mapObject)
{
    $("#resultList").html("");
    transferToPanel("#searchResultListPanel","pop");
    var searchString = $("#searchInput").val();
    $("#searchDivResultInner input").val(searchString);
    $("#searchResultListForm").on("submit",function()
        {
            var searchStringInner = $("#searchDivResultInner input").val();
            $("#searchInput").val(searchStringInner);
            searchPoiNearbyPosition(mapCenterString,mapObject,searchStringInner,$("#resultList"));
            return false;
        }
    );
    searchPoiNearbyPosition(mapCenterString,mapObject,searchString,$("#resultList"));
}

function initMapLocation(mapObject)
{

    var init_city = commonHelper.getUserBelongedLocation();
    var gpsPosition = fetchCurrentGPSPosition();
//        if (localStorage.position) {
//
//            currentGPSPosition = localStorage.position;
//        }
    if (localStorageHelper.commonVariables.majorMapCurrentPosition())
    {
        currentGPSPosition = localStorageHelper.commonVariables.majorMapCurrentPosition();
    }
    if (gpsPosition)
    {
        currentGPSPosition = gpsPosition;
        //localStorage.position = currentGPSPosition;
        localStorageHelper.commonVariables.majorMapCurrentPosition(currentGPSPosition);
        mapObject.centerAndZoom(transStringToPoint(currentGPSPosition), CONST_DISPLAY_LEVEL);
    }
    else if (currentGPSPosition)
    {
        mapObject.centerAndZoom(transStringToPoint(currentGPSPosition), CONST_DISPLAY_LEVEL);
    }
    else
    {
        mapObject.centerAndZoom(init_city);
    }
}
function initialMapParameter()
{
    iconFood  = new BMap.Icon("./images/food.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconFoodFa  = new BMap.Icon("./images/food_fa.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconToy = new BMap.Icon("./images/toy.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconToyFa = new BMap.Icon("./images/toy_fa.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconCloth= new BMap.Icon("./images/cloth.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconClothFa= new BMap.Icon("./images/cloth_fa.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconDigital= new BMap.Icon("./images/digital.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconDigitalFa= new BMap.Icon("./images/digital_fa.png", new BMap.Size(24, 35), {
        offset: new BMap.Size(12, 35)
    });
    iconLocate= new BMap.Icon("./images/locate.png", new BMap.Size(32, 32), {
        offset: new BMap.Size(16, 32)
    });
}

function popupCreateStandPointWindow(e)
{
    gc.getLocation(e, function(rs){
        var addComp = rs.addressComponents;
        Json_decode_position2address = {
            "province": addComp.province,
            "city": addComp.city,
            "district": addComp.district,
            "street": addComp.street,
            "streetNumber": addComp.streetNumber
        };
        var popupMessage = "";
        popupMessage = popupMessage + "省市区： " +  addComp.province + " " + addComp.city + " " + addComp.district + "<br/>";
        popupMessage = popupMessage + "街道： " +  addComp.street + "<br/>";
        popupMessage = popupMessage + "门牌： " +  addComp.streetNumber + "  附近";

        var standAddress =  addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber + "附近";

        $.afui.popup({
            title: normal_Text.STAND_CONFIRM_POINT,
            message: popupMessage,
            cancelText: normal_Text.NO,
            cancelCallback: function () {
            },
            doneText: normal_Text.YES,
            doneCallback: function () {
                if (currentCreatedPoiMarker) {
                    mapCr.removeOverlay(currentCreatedPoiMarker);
                }
                currentCreatedPoiMarker = addMarker(e, 0, mapCr, iconLocate);
                createStandEntity.position = e.lng + "," + e.lat;
                createStandEntity.address = standAddress;

            },
            cancelOnly: false
        });

    });

}
