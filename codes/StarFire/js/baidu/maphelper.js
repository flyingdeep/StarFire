
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

function searchLocalPosition(localName, mapObj,containerJObj) {
    var options = {
        onSearchComplete: function (results) {
            var innerHtmlString = "";
            innerHtmlString = innerHtmlString + "<ul class='list'>";
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a>" + results.getPoi(i).title.replace(new RegExp(results.keyword, "g"), '<b>' + results.keyword + '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";
            }
            innerHtmlString = innerHtmlString + "</ul>";
        }
    }
}

// 添加信息窗口
function addInfoWindow(marker,poi,index,mapObj){
    var maxLen = 10;
    var name = null;
    if(poi.type == BMAP_POI_TYPE_NORMAL){
        name = "地址：  "
    }else if(poi.type == BMAP_POI_TYPE_BUSSTOP){
        name = "公交：  "
    }else if(poi.type == BMAP_POI_TYPE_SUBSTOP){
        name = "地铁：  "
    }
    // infowindow的标题
    var infoWindowTitle = '<div style="font-weight:bold;color:#CE5521;font-size:14px">'+poi.title+'</div>';
    // infowindow的显示信息
    var infoWindowHtml = [];
    infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');
    infoWindowHtml.push('<tr>');
    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">' + name + '</td>');
    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');
    infoWindowHtml.push('</tr>');
    infoWindowHtml.push('</tbody></table>');
    var infoWindow = new mapObj.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});
    var openInfoWinFun = function(){
        marker.openInfoWindow(infoWindow);
        for(var cnt = 0; cnt < maxLen; cnt++){
            if(!document.getElementById("list" + cnt)){continue;}
            if(cnt == index){
                document.getElementById("list" + cnt).style.backgroundColor = "#f0f0f0";
            }else{
                document.getElementById("list" + cnt).style.backgroundColor = "#fff";
            }
        }
    };
    marker.addEventListener("click", openInfoWinFun);
    return openInfoWinFun;
}

function addMarker(point, index, mapObj){
    var myIcon = new mapObj.Icon("http://api.map.baidu.com/img/markers.png", new mapObj.Size(23, 25), {
        offset: new mapObj.Size(10, 25),
        imageOffset: new mapObj.Size(0, 0 - index * 25)
    });
    var marker = new mapObj.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
    return marker;
}




// Get Center x,y of the current map
function getMapCenter()
{
    var mapcenter =
    {
        "point_x": map.getCenter().lng,
        "point_y": map.getCenter().lat
    };
    return mapcenter;
}

// Create a blank Json output structure
function createOutputJsonInstance()
{
    var output =
    {
        "status": null,
        "message": null,
        "data": null
    };

    return output;

}

// link to lbs "creatLbsPostion"
function createNewJsonStandPositionInfoInstance()
{
    //var datetime_string = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
    var datetime_int = (new Date()).getTime();
    //alert(datetime_int);
    var resultJson = {
        "title":  null,
        "address": null,
        "tags": null,
        "latitude": null,
        "longitude": null,
        // customized fields
        "creater_id" : null,
        "create_user" : null,
        "description" : null,
        "stand_image_tip" : null
    };

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

        "realtime_location":null,
        "isactive":null,
        "mark":null,
        "description" : null,
        "stand_image_tip" : null
    };

    return resultJson;
}

// link to lbs "queryLbsPostion"

function createJsonStandQueryOne()
{
    var resultJson = {
        "id":  null,
        "geotable_id": CONST_STAND_LOCATION_INFO_TABLEID,
        "ak": CONST_AK
    };
    return resultJson;


}

// link to lbs "searchStandPostionByPoint"

function createJsonSearchConditionForPointSearch()
{

    var resultJson = {
        "ak": CONST_AK,
        "geotable_id": CONST_STAND_LOCATION_INFO_TABLEID,
        "location": null,
        "coord_type": CONST_COORDS_TYPE,
        "radius":null,
        "tags":null,
        "sortby":null,
        "filter":null,
        "page_index":null,
        "page_size":null
    };
    return resultJson;
}

// link to lbs "searchStandPostionByArea"

function createJsonSearchConditionForAreaSearch()
{

    var resultJson = {
        "ak": CONST_AK,
        "geotable_id": CONST_STAND_LOCATION_INFO_TABLEID,
        "region": null,
        "coord_type": CONST_COORDS_TYPE,
        "tags":null,
        "sortby":null,
        "filter":null,
        "page_index":null,
        "page_size":null
    };
    return resultJson;
}

// link to "createMakerWithInfoWindow"
function createJsonStandInfo()
{
    var resultJson =
    {
        "id":null,
        "stand_id":null,
        "title":null,
        "address":null,
        "postion_x":null,
        "postion_y":null,
        "stand_image_tip":null,
        "update_date":null,
        "description":null,
        "mark":null,
        "realtime_location":null
    };

}

// link to "createMakerWithInfoWindow"
function deleteJsonStandInfo()
{
    var resultJson =
    {
        "id":null
    };

}





function transferCoords(geo_x, geo_y, ak, coords_source, coords_target,output_json_result,  successAction, failedAction)
{
    url = "http://api.map.baidu.com/geoconv/v1/?" + "coords=" + geo_x + ","+geo_y+"&ak="+ak + "&from=" + coords_source + "&to=" +coords_target;


    jQuery.get(url,function(data,status){
        if (status == "success" && data.status == 0 )
        {
            output_json_result.status = "success";
            output_json_result.message = null;
            output_json_result.data = {
                "position_x":data.result[0].x,
                "position_y":data.result[0].y}
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
            output_json_result.message = "Api failed";
            failedAction();
        }
    });

}




//Create user mark on map
function createMakerWithInfoWindow(map, Json_stand_info)
{
    var point = new BMap.Point(Json_stand_info.postion_x, Json_stand_info.postion_y);
    var marker = new BMap.Marker(point);
    var sContent = createInfoWindow(Json_stand_info);
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象

    map.addControl(new BMap.ZoomControl());          //添加地图缩放控件
    map.addOverlay(marker);
    marker.addEventListener("click", function(){
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        map.centerAndZoom(point, 15);
        jQuery('imgDemo').load(function (){
            infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        });
    });

}

// create info windowstring for sepcific mark
function createInfoWindow(Json_stand_info)
{
    var content="";
    content = content+"<div>";
    content = content+"<header>";
    content = content+"<img src='";
    content = content+ Json_stand_info.title + "</header>";
    content = content+"<section>";
    content = content+"<article>";

}

//generate 











