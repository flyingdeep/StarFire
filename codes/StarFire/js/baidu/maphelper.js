var staticResults;
var baiduLBS = new baiduLBSClass();

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
        "point_x": map.getCenter().lat,
        "point_y": map.getCenter().lng
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

function createJsonSearchConditionForNearbySearch()
{

    var resultJson = {
        "ak": CONST_AK,
        "geotable_id": CONST_STAND_LOCATION_INFO_TABLEID,
        "location": null,
        "radius":config_AreaSearchDistance,
        "q": null,
        "sortby":"distance:1",
        "page_index":0,
        "page_size":RESULT_LIST_SIZE
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




function searchPoiNearbyPosition(location, searchString,containerJObj)
{
    var search_condition = createJsonSearchConditionForNearbySearch();
    search_condition.location=location;
    search_condition.q = searchString;
    baiduLBS.searchStandPositionNearby(function(e)
    {
        if (e.status == "success" &&  e.message == "true")
        {
            var result =e.data;
            var items = result.contents;

            staticResults = items;
            var innerHtmlString = "<ul class='list'>";
            for (var i=0;i<result.size; i++)
            {
                var locationId = "loc" + i;
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a id='" + locationId +"' onclick='resultItemStandTapEvent("+ i + ",map)'>" + items[i].title.replace(new RegExp(searchString, "g"), '<b>' + searchString+ '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";
            }
            innerHtmlString = innerHtmlString + "</ul>";
            containerJObj.html(innerHtmlString);
        }
    },search_condition);


}

function resultItemStandTapEvent(i,mapObj)
{
    $.afui.loadContent("#mapPanel",false,false,"pop");
    var targetPosition = staticResults[i];

    var point = new BMap.Point(targetPosition.location[0],targetPosition.location[1]);
    var marker = addMarker(point,i,mapObj);
    var openInfoWinFun = addInfoWindow(marker,targetPosition,i);
    //openInfoWinFun();
    setTimeout(openInfoWinFun,LOAD_MAP_TIP_LAYER_DELAY);
}


function searchLocalPosition(targetString, mapObj,containerJObj) {
    var options = {
        onSearchComplete: function (results) {
            var innerHtmlString = "";
            staticResults = results;
            innerHtmlString = innerHtmlString + "<ul class='list'>";
            var eventStack = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                var locationId = "loc" + i;
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a id='" + locationId +"' onclick='resultItemTapEvent("+ i + ",map)'>" + results.getPoi(i).title.replace(new RegExp(results.keyword, "g"), '<b>' + results.keyword + '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";


            }
            innerHtmlString = innerHtmlString + "</ul>";
            containerJObj.html(innerHtmlString);

        }
    }


    var local = new BMap.LocalSearch(mapObj, options);
    local.search(targetString);
}

function resultItemTapEvent(i,mapObj)
{
    $.afui.loadContent("#mapPanel",false,false,"pop");
    var marker = addMarker(staticResults.getPoi(i).point,i,mapObj);
    var openInfoWinFun = addInfoWindow(marker,staticResults.getPoi(i),i);
    //openInfoWinFun();
    setTimeout(openInfoWinFun,LOAD_MAP_TIP_LAYER_DELAY);
}


// 添加信息窗口
function addInfoWindow(marker,poi,index){
    // infowindow的标题
    var infoWindowTitle = '<div style="font-weight:bold;color:#CE5521;font-size:14px">'+poi.title+'</div>';
    // infowindow的显示信息
    var infoWindowHtml = [];
    infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');
    infoWindowHtml.push('<tr>');
    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');
    infoWindowHtml.push('</tr>');
    infoWindowHtml.push('</tbody></table>');
    console.log(infoWindowHtml.join(""));//
    var infoWindow = new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});
    var openInfoWinFun = function(){
        marker.openInfoWindow(infoWindow);
    };
    marker.addEventListener("click", openInfoWinFun);
    return openInfoWinFun;
}

function addMarker(point, index, mapObj){
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0 - index * 25)
    });
    var marker = new BMap.Marker(point, {icon: myIcon});
    mapObj.addOverlay(marker);
    // alert(point.lng + "   !!   " + point.lat);
    return marker;
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











