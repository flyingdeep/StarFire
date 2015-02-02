// creat a new postion


var baiduLBSClass = function(authClass) {

    var CONST_POI_CREATE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/CreatPoi/" +LASTED_VERSION;
    var CONST_POI_UPDATE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/UpdatePoi/" +LASTED_VERSION;
    var CONST_POI_DELETE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/DeletePoi/" +LASTED_VERSION;

    var baseAuth = new authClass(AUTH_USER,AUTH_PASS);
    function createLbsPositionBase(callback, token, Json_stand_position_info) {
        var jsonInput = {
            "title": Json_stand_position_info.title,
            "address": Json_stand_position_info.address,
            "tags": Json_stand_position_info.tags,
            "latitude": Json_stand_position_info.latitude,
            "longitude": Json_stand_position_info.longitude,
            // customized fields
            "creater_id": Json_stand_position_info.creater_id,
            "create_user": Json_stand_position_info.create_user,
            "description": Json_stand_position_info.description,
            "stand_image_tip": Json_stand_position_info.stand_image_tip
        };
        var inputString = JSON.stringify(jsonInput);
        var inputJson = {
            "token": token,
            "inputParameter": inputString
        };
        var output_json_result = createOutputJsonInstance();
        jQuery.post(CONST_POI_CREATE, inputJson
            , function (data, status) {
                // alert("response");
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = "true";
                    output_json_result.data = data.detail.result;
                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";
                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.message;
                }
                callback(output_json_result);

            });
    }

// update one point

    function updateLbsPositionBase(callback, token, Json_stand_position_info) {
        var jsonInput = {
            "id": Json_stand_position_info.idb,
            "title": Json_stand_position_info.title,
            "address": Json_stand_position_info.address,
            "tags": Json_stand_position_info.tags,
            "latitude": Json_stand_position_info.latitude,
            "longitude": Json_stand_position_info.longitude,

            // customized fields

            "realtime_location": Json_stand_position_info.realtime_location,
            "isactive": Json_stand_position_info.isactive,
            "mark": Json_stand_position_info.mark,
            "description": Json_stand_position_info.description,
            "stand_image_tip": Json_stand_position_info.stand_image_tip
        };
        var inputString = JSON.stringify(jsonInput);
        var inputJson = {
            "token": token,
            "inputParameter": inputString
        };
        var output_json_result = createOutputJsonInstance();
        jQuery.post(CONST_POI_UPDATE, inputJson
            , function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = "true";
                    output_json_result.data = data.detail.result;

                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";

                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.detail.message;

                }
                callback(output_json_result);

            });
    }

//delete one point

    function deleteLbsPositionBase(callback, token, id) {
        var jsonInput = {"id": id};
        var inputString = JSON.stringify(jsonInput);
        var inputJson = {
            "token": token,
            "inputParameter": inputString
        };
        var output_json_result = createOutputJsonInstance();
        jQuery.post(CONST_POI_DELETE,
            inputJson,
            function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = "true";
                    output_json_result.data = data.detail.result;

                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";

                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.detail.message;
                }
                callback(output_json_result);
            });
    }

    this.createLbsPosition = function(callback, Json_stand_position_info) {
        var result = null;
        alert("1");
        baseAuth.getAuthExternal(
            function (token) {
                alert("2");
                if (token) {

                    baseAuth.reformJsonObjectExternal(Json_stand_position_info);
                    createLbsPositionBase(callback, token, Json_stand_position_info);
                }
                else {
                    callback(null);
                }
            }
        );


    };

    this.updateLbsPosition = function(callback, Json_stand_position_info) {

        var result = null;
        baseAuth.getAuthExternal(
            function (token) {
                if (token) {

                    baseAuth.reformJsonObjectExternal(Json_stand_position_info);
                    updateLbsPositionBase(callback, token, Json_stand_position_info);
                }
                else {
                    callback(null);
                }
            }
        );
    };

    this.deleteLbsPosition = function(callback, id) {
        var result = null;
        baseAuth.getAuthExternal(
            function (token) {
                if (token) {

                    baseAuth.reformJsonObjectExternal(Json_stand_position_info);
                    deleteLbsPositionBase(callback, token, id);
                }
                else {
                    callback(null);
                }
            }
        );

    };

    // query one point by id


    this.queryLbsPostionList = function(Json_stand_queryone) {
        querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
        url = BAIDU_LBS_URI + "geodata/v3/poi/list?callback=?&" + querystring;
        var output_json_result = createOutputJsonInstance();
        jQuery.getJSON(url,
            function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = data.message;
                    output_json_result.data = data.poi;
                    successAction();
                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";
                    failedAction();

                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.message;
                    failedAction();
                }

            }
        );
    };


    // query one point by id


    this.queryLbsPostionSingleDetail = function(Json_stand_querymultiple) {
        querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
        url = BAIDU_LBS_URI + "geodata/v3/poi/detail?callback=?&" + querystring;
        var output_json_result = createOutputJsonInstance();
        jQuery.getJSON(url,
            function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = data.message;
                    output_json_result.data = data.poi;
                    successAction();
                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";
                    failedAction();

                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.detail.message;
                    failedAction();
                }

            }
        );
    };


//search point based on target postion

    this.searchStandPostionByPoint = function(callback, search_condition) {
        querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&location=" + search_condition.location + "&coord_type=" +
            search_condition.coord_type + "&radius=" + search_condition.radius + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
            + "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size;
        url = BAIDU_LBS_URI + "geosearch/v3/nearby?callback=?&" + querystring;
        var output_json_result = createOutputJsonInstance();
        jQuery.get(url,
            function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = "true";
                    output_json_result.data = data;

                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";


                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.message;

                }
                callback(output_json_result);

            }
        );

    };

//search point based on area

    this.searchStandPostionByArea = function(callback, search_condition) {
        querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&region=" + search_condition.region + "&coord_type=" +
            search_condition.coord_type + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
            + "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size;
        url = BAIDU_LBS_URI + "geosearch/v3/local?callback=?&" + querystring;
        var output_json_result = createOutputJsonInstance();
        jQuery.getJSON(url,
            function (data, status) {
                if (status == "success" && data.status == 0) {
                    output_json_result.status = "success";
                    output_json_result.message = "true";
                    output_json_result.data = data;

                }
                else if (status != "success") {
                    output_json_result.status = "failed";
                    output_json_result.message = "Post failed";


                }
                else {
                    output_json_result.status = "failed";
                    output_json_result.message = data.message;

                }
                callback(output_json_result);
            }
        );

    };
};

