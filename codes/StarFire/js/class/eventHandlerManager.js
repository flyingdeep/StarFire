var eventHandlerManagerClass = function()
{
    this.toggleTarget_Sharp_Change = function()
    {
        if ($("#toggleTarget").prop("checked"))
        {
            $("#searchInput").prop("placeholder","搜索摊位");
        }
        else
        {
            $("#searchInput").prop("placeholder","搜索地址");
        }
    };
    this.searchForm_Sharp_Submit = function()
    {
        if ($("#toggleTarget").prop("checked"))
        {
            searchStand(map);
        }
        else
        {
            searchLocation(map);
        }
        return false;
    };

    this.map2SearchForm_Sharp_Submit = function()
    {
        searchSecLocation(mapCr);
        return false;


    };

    this.filterPanel_Sharp_SwipeRight = function(){
        $.afui.drawer.hide("#right_Filter","right");
    };


    this.createStandPanel1_Sharp_PanelBeforeLoad = function(){
        initialCreateStandFieldEvent();
        if ( $("#standTypeDiv").html() == "") {
            if (!staticStandTypeHtmlString) {
                commonHelper.constructStandTypeHTML(function (e) {

                    $("#standTypeDiv").html(e);
                    staticStandTypeHtmlString = e;
                }, "crStandType_");
            }
            else {
                $("#standTypeDiv").html(staticStandTypeHtmlString);

            }
        }

    };

    this.filterSettingIcon_Sharp_Click = function(){

        if ( $("#standTypeFilterContainer").html() == "") {
            var innerHtmlStr = '<div class="gcol2"><input id="filterStandType_all" type="radio"  name="filterStandType_Radio" value="0"><label for="filterStandType_all">所有类型</label></div>';
            if (!staticStandTypeHtmlString) {
                commonHelper.constructStandTypeHTML(function (e) {
                    $("#standTypeFilterContainer").html(innerHtmlStr+e);
                    staticStandTypeHtmlString = e;
                }, "filterStandType_");
            }
            else {
                $("#standTypeFilterContainer").html(innerHtmlStr+staticStandTypeHtmlString);
            }
        }
        $.afui.drawer.show('#right_Filter','right');
    };

    this.createStandPanel2_Sharp_PanelLoad = function(){
            var init_city = commonHelper.getUserBelongedLocation();

            mapCr.centerAndZoom("上海");
            //initMapLocation(mapCr);

    };

    this.mapPanel_Sharp_PanelLoad = function()
    {
        if (isLogon) {
            map.centerAndZoom("上海");
            isLogon = null;
        }
    };

    this.signUpButton_Sharp_Click = function()
    {
        initialCreateUserField();
        initialSignUpUserFieldEvent();
        transferToPanel("#signUpUserPanel1", "slide");
    };

    this.cancelSignUpButton_Sharp_Click = function()
    {
        var innerContent="";
        var uploadPopup = $.afui.popup({
            title: normal_Text.USER_CREATE_CANCEL,
            message: innerContent,
            doneText:normal_Text.YES,
            cancelText: normal_Text.NO,
            cancelCallback: function () {
                uploadPopup.hide();
            },
            doneCallback:function()
            {
                transferToPanel("#loginPanel", "slide",true);
                uploadPopup.hide();
            },
            cancelOnly: false
        });

    };

    this.signUpUserPanel1_Sharp_SwipeRight = function()
    {
        this.cancelSignUpButton_Sharp_Click();
    };

    this.signUpUserPanel1_Sharp_swipeLeft = function()
    {


        createUserEntity.userType = parseInt($("input[name='userTypeRadio']:checked").val());
        transferToPanel("#signUpUserPanel2", "slide");
    };

    this.signUpUserPanel2_Sharp_SwipeRight = function()
    {
        transferToPanel("#signUpUserPanel1", "invoke");
    };

    this.signUpUserPanel2_Sharp_swipeLeft = function()
    {

        if (fieldValidationCreateUserRequired()) {
            var userTypeName = "";
            if (createUserEntity.userType ==1)
            {
                userTypeName = "消费者";
            }
            else
            {
                userTypeName = "摊主";
            }
            var locationCombined = createUserEntity.provinceCityArea.province + " " + createUserEntity.provinceCityArea.city;
            if (createUserEntity.provinceCityArea.area && createUserEntity.provinceCityArea.area != "选择区县..")
            {
                locationCombined = locationCombined + " " + createUserEntity.provinceCityArea.area;
            }

            var innerContent ="";
            innerContent = innerContent + "用户名：" + createUserEntity.userName + "<BR />";
            innerContent = innerContent + "用户类型：" + userTypeName + "<BR />";
            innerContent = innerContent + "用户所在地：" + locationCombined + "<BR />";
            var uploadPopup = $.afui.popup({
                title: normal_Text.USER_CREATE_CONFIRM,
                message: innerContent,
                doneText:normal_Text.YES,
                cancelText: normal_Text.NO,
                cancelCallback: function () {
                    uploadPopup.hide();
                },
                doneCallback:function()
                {
                    $.afui.showMask(hint_Message.CREATE_USER_CREATING_HINT);
                    commonHelper.createUserRequired(function(e){
                        if(e)
                        {
                            //commonHelper.showToast()
//                            localStorageHelper.localUserInfo.userId(e.userId);
                            localStorageHelper.localUserInfo.userName(createUserEntity.userName);
                            localStorageHelper.localUserInfo.password(createUserEntity.password);
//                            localStorageHelper.localUserInfo.displayName(e.displayName);
//                            localStorageHelper.localUserInfo.userImage(e.userImage);
                            localStorageHelper.localUserInfo.userType(createUserEntity.userType);
//                            localStorageHelper.localUserInfo.email(e.email);
//                            localStorageHelper.localUserInfo.cellNumber(e.cellNumber);
//                            localStorageHelper.localUserInfo.webChat(e.webChat);
//                            localStorageHelper.localUserInfo.qqNumber(e.qqNumber);
                            localStorageHelper.localUserInfo.provinceCityArea(createUserEntity.provinceCityArea);
//                            localStorageHelper.localUserInfo.createDate(e.createDate);
//                            localStorageHelper.localUserInfo.updateDate(e.updateDate);
//                            localStorageHelper.localUserInfo.userPreference(e.userPreference);

                            userBasicInfoEntity.userName = createUserEntity.userName;
                            userBasicInfoEntity.password = createUserEntity.password;
                            userBasicInfoEntity.userType = createUserEntity.userType;
                            userBasicInfoEntity.provinceCityArea = createUserEntity.provinceCityArea;
                            transferToPanel("#signUpUserPanel3", "slide");
                            $.afui.hideMask();

                        }
                        else
                        {
                            $.afui.hideMask();
                            commonHelper.showToast(hint_Message.CREATE_USER_FAIL,"bc",true,"error");
                        }
                    },createUserEntity.userName,createUserEntity.userType,createUserEntity.provinceCityArea,createUserEntity.password);

                    uploadPopup.hide();
                },
                cancelOnly: false
            });

        }

    };

    this.signUpUserPanel3_Sharp_PanelLoad = function()
    {
        commonHelper.showToast(hint_Message.CREATE_USER_SUCCESS,"bc",true,"success");

    };

    this.loginButton_Sharp_Click = function() {
        if (!fieldValidationLogin())
        {
            return;
        }
        var username = $("#username").val();
        var password = $("#password").val();
        commonHelper.loginUser(function (e) {
            if (e) {

                localStorageHelper.localUserInfo.userId(e.userId);
                localStorageHelper.localUserInfo.userName(e.userName);
                localStorageHelper.localUserInfo.password(e.password);
                localStorageHelper.localUserInfo.displayName(e.displayName);
                localStorageHelper.localUserInfo.userImage(e.userImage);
                localStorageHelper.localUserInfo.userType(e.userType);
                localStorageHelper.localUserInfo.email(e.email);
                localStorageHelper.localUserInfo.cellNumber(e.cellNumber);
                localStorageHelper.localUserInfo.webChat(e.webChat);
                localStorageHelper.localUserInfo.qqNumber(e.qqNumber);
                localStorageHelper.localUserInfo.provinceCityArea(e.provinceCityArea);
                localStorageHelper.localUserInfo.createDate(e.createDate);
                localStorageHelper.localUserInfo.updateDate(e.updateDate);
                localStorageHelper.localUserInfo.userPreference(e.userPreference);

                userBasicInfoEntity = e;
                userPreference = userBasicInfoEntity.userPreference;
                transferToPanel("#mapPanel", "up-reveal:dismiss");
            }
            else {

                commonHelper.showToast(hint_Message.USER_LOGIN_FAIL,"bc",true,"error");
            }
        }, username, password);
    };

    this.panel_Dot_PanelLoad = function(){
        while(globalToasts.length!= 0)
        {
            globalToasts.pop().hide();
        }

        if (currentPanel == "#createStandPanel2")
        {
            commonHelper.showToast(hint_Message.STAND_CREATION_SET_POINT_HINT,"bc",true,"success");
        }


        if (currentPanel != "#createStandPanel1" && currentPanel != "#createStandPanel2" && currentPanel != "#createStandPanel3" ) {
            var currentCreatedPoiMarker = null;
            var currentCreatedPoint = null;
            if (mapCr)
            {
                mapCr.clearOverlays();
            }
        }

    };

    this.userPic_Sharp_Change = function()
    {

    };

    this.file_Sharp_Change = function(evt){
        inputSeed = (new Date()).getTime();
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            fileExtension = f.name.substring(f.name.indexOf("."));
            if (f.size > UPLOAD_IMAGE_MAXSIZE)
            {

                commonHelper.showToast(hint_Message.STAND_IMAGE_UPLOAD_SIZE_EXCEED,"bc",true,"error");
                continue;
            }
            var tFile = f;
            var cancelUploadTag = false;
            var innerContent = "<image src='./images/waiting.gif'>"
            var uploadPopup = $.afui.popup({
                title: normal_Text.STAND_UPLOADING,
                message: innerContent,
                cancelText: normal_Text.NO,
                cancelCallback: function () {
                    cancelUploadTag = true;
                    this.hide();
                    commonHelper.showToast(hint_Message.STAND_IMAGE_UPLOAD_CANCEL,"bc",true,"warning");
                },
                cancelOnly: true
            });


            uploadSingleStandImage(function(e)
            {
                uploadPopup.hide();
                if (cancelUploadTag)
                {
                    return;
                }
                if (e) {
                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = function () {
                        // Render thumbnail.

                        createStandEntity.images[e] = 1;

                        var imageContentString = generateImagePreviewBox(e, event.target.result,$("#standImageContainer").width());

                        $("#standImageContainer").append(imageContentString);

                    };

                    reader.readAsDataURL(tFile);
                }
                else
                {
                    commonHelper.showToast(hint_Message.STAND_IMAGE_UPLOAD_FAIL,"bc",true,"error");
                }
            });
            // Read in the image file as a data URL.

        }
    };


    this.map_dragend_event = function (){

    };
    this.map_click_event = function (e){
        var pt = e.point;
        Json_tap_position =
        {
            "point_x":pt.lng ,
            "point_y": pt.lat
        };
        alert(Json_tap_position.point_x + "  " + Json_tap_position.point_y);
        gc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            Json_decode_position2address = {
                "province": addComp.province,
                "city": addComp.city,
                "district": addComp.district,
                "street": addComp.street,
                "streetNumber": addComp.streetNumber
            };
        });
    };
    this.map_zoomend_event = function (){
        current_map_level = map.getZoom();
    };

    this.map_moveend_event = function (){
        mapCenterString = getMapCenter(map);

        //map.clearOverlays();
        removeMarkersByMarkers(currentDisplayStandsMarks,map);
        searchPoiNearbyPositionDisplay(mapCenterString,"",map,"#standList");
    };
    this.map_load_event = function(){
        mapCenterString = getMapCenter(map);

        //searchPoiNearbyPositionDisplay(mapCenterString,"",map,"#standList");
    };

    this.mapCr_moveend_event = function(){

        mapCenterString = getMapCenter(mapCr);
        //map.clearOverlays();
        removeMarkersByMarkers(currentDisplayStandsMarks,mapCr);
        searchPoiNearbyPositionDisplay(mapCenterString,"",mapCr,"#standList");
    };

    this.mapCr_click_event = function(e){

        var pt = e.point;
        Json_tap_position =
        {
            "point_x":pt.lng ,
            "point_y": pt.lat
        };
        popupCreateStandPointWindow(pt);


    };

    this.standName_Sharp_Change = function()
    {
        createStandEntity.standName = $("#standName").val();
    };

    this.standTypeDiv_Sharp_Change = function()
    {
        createStandEntity.standType = $("input[name='crStandType_Radio']:checked").val();
    };

    this.subStandType_Sharp_Change = function()
    {
        createStandEntity.standSubContent = $("#subStandType").val();
    };

    this.standDescription_Sharp_Change = function()
    {
        createStandEntity.description = $("#standDescription").val();
    };

    this.usernameCr_Sharp_Change = function()
    {
        createUserEntity.userName = $("#usernameCr").val();
    };

    this.passwordCr_Sharp_Change = function()
    {
        createUserEntity.password = $("#passwordCr").val();
    };

    this.province_Sharp_Change = function()
    {
        createUserEntity.provinceCityArea = {"province": $("#province").val(),"city":$("#city").val(),"area":$("#county").val()};
    };

    this.city_Sharp_Change = function()
    {
        createUserEntity.provinceCityArea = {"province": $("#province").val(),"city":$("#city").val(),"area":$("#county").val()};
    };

    this.county_Sharp_Change = function()
    {
        createUserEntity.provinceCityArea = {"province": $("#province").val(),"city":$("#city").val(),"area":$("#county").val()};
    };

    this.onDeviceReadPhoneGap = function()
    {

    };

    this.onBackKeyDownPhoneGap = function()
    {

    };

    this.onMenuKeyDownPhoneGap = function()
    {

    };

    this.onSearchKeyDownPhoneGap = function()
    {

    };


};