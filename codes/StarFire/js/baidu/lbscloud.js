// creat a new postion
 var CONST_POI_CREATE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/CreatPoi/" +LASTED_VERSION;
var CONST_POI_UPDATE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/UpdatePoi/" +LASTED_VERSION;
var CONST_POI_DELETE = CONST_ZHAOTANTOU_API_URI + "BaiduLBS/DeletePoi/" +LASTED_VERSION;


 function creatLbsPostion( callback, Json_stand_position_info)
 {
    var jsonInput ={
        "title":  Json_stand_position_info.title,
        "address": Json_stand_position_info.address,
        "tags": Json_stand_position_info.tags,
        "latitude": Json_stand_position_info.latitude,
        "longitude": Json_stand_position_info.longitude,
        // customized fields
        "creater_id" : Json_stand_position_info.creater_id,
        "create_user" : Json_stand_position_info.create_user,
        "description" : Json_stand_position_info.description,
        "stand_image_tip" : Json_stand_position_info.stand_image_tip
    };
    var inputString =  JSON.stringify(jsonInput);
    var output_json_result = createOutputJsonInstance();
	jQuery.post(CONST_POI_CREATE,inputString
	 ,function(data,status){
           // alert("response");
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = "true";
				output_json_result.data = data.detail.result;
			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.message;
			}
            callback(output_json_result);
    
  });
 }





 // query one point by id


function queryLbsPostionList(Json_stand_queryone)
{
	querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
	url = BAIDU_LBS_URI+"geodata/v3/poi/list?callback=?&" + querystring;
    var output_json_result = createOutputJsonInstance();
	jQuery.getJSON(url,
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data.poi;
				successAction();
			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";
				failedAction();
				
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.message;
				failedAction();
			}
    
  }

	);
}



 // query one point by id


function queryLbsPostionSingleDetail(Json_stand_querymultiple)
{
	querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
	url = BAIDU_LBS_URI+"geodata/v3/poi/detail?callback=?&" + querystring;
    var output_json_result = createOutputJsonInstance();
	jQuery.getJSON(url,
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data.poi;
				successAction();
			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";
				failedAction();
				
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.detail.message;
				failedAction();
			}
    
  }

	);
}



// update one point

 function updateLbsPostion(callback,Json_stand_position_info)
 {
     var output_json_result = createOutputJsonInstance();
	jQuery.post(CONST_POI_UPDATE,
	 {
		"id" : Json_stand_position_info.idb,
		"title":  Json_stand_position_info.title,
		"address": Json_stand_position_info.address,
		"tags": Json_stand_position_info.tags,
		"latitude": Json_stand_position_info.latitude,
		"longitude": Json_stand_position_info.longitude,

	// customized fields

		"realtime_location":Json_stand_position_info.realtime_location,
			"isactive":Json_stand_position_info.isactive,
			"mark":Json_stand_position_info.mark,
			"description" : Json_stand_position_info.description,
			"stand_image_tip" : Json_stand_position_info.stand_image_tip
	},function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = "true";
				output_json_result.data = data.detail.result;

			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";

			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.detail.message;

			}
            callback(output_json_result);
    
  });
 }

 //delete one point

 function deleteLbsPostion( id, output_json_result)
 {
     var output_json_result = createOutputJsonInstance();
	jQuery.post(CONST_POI_DELETE,
	 {"id":id},
		function(data,status){
            if (status == "success" && data.status == 0 )
            {
                output_json_result.status = "success";
                output_json_result.message = "true";
                output_json_result.data = data.detail.result;

            }
            else if (status != "success")
            {
                output_json_result.status = "failed";
                output_json_result.message = "Post failed";

            }
            else
            {
                output_json_result.status = "failed";
                output_json_result.message = data.detail.message;

            }
            callback(output_json_result);
    
  });

 
 }

//search point based on target postion

function searchStandPostionByPoint(callback,search_condition)
{
	querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&location=" + search_condition.location+"&coord_type=" +
		search_condition.coord_type + "&radius=" + search_condition.radius + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
		+ "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size ;
	url = BAIDU_LBS_URI+"geosearch/v3/nearby?callback=?&" + querystring;
    var output_json_result = createOutputJsonInstance();
	jQuery.get(url, 
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = "true";
				output_json_result.data = data;

			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";

				
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.message;

			}
        callback(output_json_result);
    
  }

	);

}

//search point based on area

function searchStandPostionByArea(callback, search_condition)
{
	querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&region=" + search_condition.region+"&coord_type=" +
		search_condition.coord_type  + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
		+ "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size ;
	url = BAIDU_LBS_URI+"geosearch/v3/local?callback=?&" + querystring;
    var output_json_result = createOutputJsonInstance();
	jQuery.getJSON(url,
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = "true";
				output_json_result.data = data;

			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";

				
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = data.message;

			}
        callback(output_json_result);
        }
	);

}

