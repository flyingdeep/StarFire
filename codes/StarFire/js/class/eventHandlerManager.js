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
        commonHelper.initialStandEntity();
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
        if(!mapCr) {
            var init_city = commonHelper.getUserBelongedLocation();
            mapCr = new BMap.Map("mapContainerCr");
            mapCr.addEventListener("moveend", mapCr_moveend_event);
            mapCr.addEventListener("click", mapCr_click_event);
            mapCr.centerAndZoom(init_city);
            //initMapLocation(mapCr);
        }
        toastObj  = $.afui.toast({
            message: hint_Message.STAND_CREATION_SET_POINT_HINT,
            position:"bc",
            autoClose:true, //have to click the message to close
            type:"success"
        });

    };

    this.panel_Dot_PanelLoad = function(){
        if (currentPanel != "#createStandPanel2") {
            if (toastObj) {
                toastObj.hide();
                toastObj = null;
            }
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
                $.afui.toast({
                    message: hint_Message.STAND_IMAGE_UPLOAD_SIZE_EXCEED,
                    position:"bc",
                    autoClose:true, //have to click the message to close
                    type:"success"
                });
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
                    $.afui.toast({
                        message: hint_Message.STAND_IMAGE_UPLOAD_CANCEL,
                        position:"bc",
                        autoClose:true, //have to click the message to close
                        type:"warning"
                    });
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

                        toCreateImageCollection[e] = 0;

                        var imageContentString = generateImagePreviewBox(e, event.target.result,$("#standImageContainer").width());

                        $("#standImageContainer").append(imageContentString);

                    };

                    reader.readAsDataURL(tFile);
                }
                else
                {
                    $.afui.toast({
                        message: hint_Message.STAND_IMAGE_UPLOAD_FAIL,
                        position:"bc",
                        autoClose:true, //have to click the message to close
                        type:"error"
                    });
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


};