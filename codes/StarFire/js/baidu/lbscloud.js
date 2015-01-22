// creat a new postion
 function creatLbsPostion( Json_stand_position_info, output_json_result, successAction, failedAction)
 {
    var jsonInput ={
        "title":  Json_stand_position_info.title,
        "address": Json_stand_position_info.address,
        "tags": Json_stand_position_info.tags,
        "latitude": Json_stand_position_info.latitude,
        "longitude": Json_stand_position_info.longitude,
        "coord_type": Json_stand_position_info.coord_type,
        "geotable_id": Json_stand_position_info.geotable_id,
        "ak" : Json_stand_position_info.ak,
        // customized fields

        "realtime_location":Json_stand_position_info.realtime_location,
        "isactive":Json_stand_position_info.isactive,
        "mark":Json_stand_position_info.mark,
        "update_date":Json_stand_position_info.update_date,
        "creater_id" : Json_stand_position_info.creater_id,
        "create_user" : Json_stand_position_info.create_user,
        "description" : Json_stand_position_info.description,
        "create_date" : Json_stand_position_info.create_date,
        "stand_image_tip" : Json_stand_position_info.stand_image_tip
    };
    var inputString =  JSON.stringify(jsonInput);

	jQuery.post("http://api.map.baidu.com/geodata/v3/poi/create",inputString
	 ,function(data,status){
            alert("response");
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data.id;
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
    
  });
 }





 // query one point by id


function queryLbsPostion(Json_stand_queryone, output_json_result)
{
	querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
	url = "http://api.map.baidu.com/geodata/v3/poi/detail?" + querystring;

	jQuery.get(url, 
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


function queryLbsPostion(Json_stand_querymultiple, output_json_result)
{
	querystring = "id=" + Json_stand_queryone.id + "&geotable_id=" + Json_stand_queryone.geotable_id + "&ak=" + Json_stand_queryone.ak;
	url = "http://api.map.baidu.com/geodata/v3/poi/detail?" + querystring;

	jQuery.get(url, 
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



// update one point

 function updateLbsPostion( Json_stand_position_info, output_json_result,  successAction, failedAction)
 {
	jQuery.post("http://api.map.baidu.com/geodata/v3/poi/update",
	 {
		"id" : Json_stand_position_info.idb,
		"title":  Json_stand_position_info.title,
		"address": Json_stand_position_info.address,
		"tags": Json_stand_position_info.tags,
		"latitude": Json_stand_position_info.latitude,
		"longitude": Json_stand_position_info.longitude,
		"coord_type": Json_stand_position_info.coord_type,
		"geotable_id": Json_stand_position_info.geotable_id,
		"ak" : Json_stand_position_info.ak,
	// customized fields

		"realtime_location":Json_stand_position_info.realtime_location,
			"isactive":Json_stand_position_info.isactive,
			"mark":Json_stand_position_info.mark,
			"update_date":Json_stand_position_info.update_date,
			"creater_id" : Json_stand_position_info.creater_id,
			"create_user" : Json_stand_position_info.create_user,
			"description" : Json_stand_position_info.description,
			"working_time" : Json_stand_position_info.working_time,
			"week_working_day" : Json_stand_position_info.week_working_day,
			"create_date" : Json_stand_position_info.create_date,
			"stand_image_tip" : Json_stand_position_info.stand_image_tip
	},function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data.id;
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
    
  });
 }

 //delete one point

 function deleteLbsPostion( id, output_json_result,  successAction, failedAction)
 {
	jQuery.post("http://api.map.baidu.com/geodata/v3/poi/delete", 
	 {"id":id},
		function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data.id;
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
    
  });

 
 }

//search point based on target postion

function searchStandPostionByPoint(search_condition, output_json_result,  successAction, failedAction)
{
	querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&location=" + search_condition.location+"&coord_type=" +
		search_condition.coord_type + "&radius=" + search_condition.radius + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
		+ "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size ;
	url = "http://api.map.baidu.com/geosearch/v3/nearby?" + querystring;

	jQuery.get(url, 
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data;
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

//search point based on area

function searchStandPostionByArea(search_condition, output_json_result,  successAction, failedAction)
{
	querystring = "ak=" + search_condition.ak + "&geotable_id=" + search_condition.geotable_id + "&region=" + search_condition.region+"&coord_type=" +
		search_condition.coord_type  + "&tags=" + search_condition.tags + "&sortby=" + search_condition.sortby
		+ "&filter=" + search_condition.filter + "&page_index=" + search_condition.page_index + "&page_size=" + search_condition.page_size ;
	url = "http://api.map.baidu.com/geosearch/v3/local?" + querystring;

	jQuery.get(url, 
	function(data,status){
			if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = data.message;
				output_json_result.data = data;
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

