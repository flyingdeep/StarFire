
function formatDate(e, format)
{
var o = {
"M+" : e.getMonth()+1, //month
"d+" : e.getDate(), //day
"h+" : e.getHours(), //hour
"m+" : e.getMinutes(), //minute
"s+" : e.getSeconds(), //second
"q+" : Math.floor((e.getMonth()+3)/3), //quarter
"S" : e.getMilliseconds() //millisecond
}
if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(e.getFullYear()+"").substr(4- RegExp.$1.length));
for(var k in o)if(new RegExp("("+ k +")").test(format))
format = format.replace(RegExp.$1,
RegExp.$1.length==1? o[k] :
("00"+ o[k]).substr((""+ o[k]).length));
return format;
}



// Get Center x,y of the current map
function getMapCenter()
{
	var mapcenter = 
	{
		"point_x": map.getCenter().lng,
		"point_y": map.getCenter().lat
	}
	return mapcenter;
}

// creat a blank Json output structure
function createOutputJsonInstance()
{
	var output = 
		{
			"status": null,
			"message": null,
			"data": null
	
		}

	return output;

}

// link to lbs "creatLbsPostion"
function createNewJsonStandPositionInfoInstance()
{
	//var datetime_string = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
	var datetime_int = (new Date()).getTime();
	var resultJson = {
		"title":  null,
		"address": null,
		"tags": null,
		"latitude": null,
		"longitude": null,
		"coord_type": 3,
		"geotable_id": CONST_GEOTABLE_ID,
		"ak" : CONST_AK,
	// customized fields
		"realtime_location":CONST_REALTIME_LOCATION,
		"isactive":CONST_ISACTIVE,
		"mark":CONST_INIT_MARK,
		"update_date":datetime_int,
		"creater_id" : null,
		"create_user" : null,
		"description" : null,
		"working_time" : null,
		"week_working_day" : null,
		"create_date" : datetime_int,
		"stand_image_tip" : null
	}

	return resultJson;
}

// link to lbs "creatLbsPostion"
function createUpdateJsonStandPositionInfoInstance()
{
	var datetime_string = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
	var resultJson = {
		"id": null,
		"title":  null,
		"address": null,
		"tags": null,
		"latitude": null,
		"longitude": null,
		"coord_type": 3,
		"geotable_id": CONST_GEOTABLE_ID,
		"ak" : CONST_AK,


		"realtime_location":CONST_REALTIME_LOCATION,
		"isactive":CONST_ISACTIVE,
		"mark":CONST_INIT_MARK,
		"update_date":datetime_int,
		"creater_id" : null,
		"create_user" : null,
		"description" : null,
		"working_time" : null,
		"week_working_day" : null,
		"create_date" : datetime_int,
		"stand_image_tip" : null
	}

	return resultJson;
}

// link to lbs "queryLbsPostion"

function createJsonStandQueryOne()
{
	var resultJson = {
		"id":  null,
		"geotable_id": CONST_GEOTABLE_ID,
		"ak": CONST_AK
	}
	return resultJson;


}


function transferCoords(geo_x, geo_y, ak, coords_source, coords_target,output_json_result)
{
	url = "http://api.map.baidu.com/geoconv/v1/?" + "coords=" + geo_x + ","+geo_y+"&ak="+ak + "&from=" + coords_source + "&to=" +coords_target;
	

	jQuery.get(url,function(data,status){
    	if (status == "success" && data.status == 0 )
			{
				output_json_result.status = "success";
				output_json_result.message = null;
				output_json_result.data = {
					"position_x":data.result[0].x,
					"position_y":data.result[0].y
				}
				
			}
			else if (status != "success")
			{
				output_json_result.status = "failed";
				output_json_result.message = "Post failed";
				
			}
			else
			{
				output_json_result.status = "failed";
				output_json_result.message = "Api failed";
			}
  });

}















