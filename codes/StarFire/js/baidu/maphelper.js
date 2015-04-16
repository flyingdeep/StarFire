
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
function getMapCenter(mapObj)
{
    var mapCenter =mapObj.getCenter().lng +","+ mapObj.getCenter().lat;
    return mapCenter;
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

    var filterString = "";
    if (config_CreatorType != "")
    {
        filterString = "creator_type:[1]";
    }
    var resultJson = {
        "ak": CONST_AK,
        "geotable_id": CONST_STAND_LOCATION_INFO_TABLEID,
        "location": "",
        "radius":config_AreaSearchDistance,
        "q": "",
        "tags": config_Tags,
        "sortby":"distance:1",
        "filter":filterString,
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
        "title":null,
        "address":null,
        "postion_x":null,
        "postion_y":null,
        "stand_image_tip":null,
        "description":null
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


function searchPoiNearbyPositionDisplay(location,searchString, mapObj, listContainerId)
{
    var mapObjStr = "";
    if (mapObj == map)
    {
        mapObjStr = "map";
    }
    else if (mapObj == mapCr)
    {
        mapObjStr = "mapCr";
    }
    var search_condition = createJsonSearchConditionForNearbySearch();
    search_condition.location=location;
    search_condition.q = searchString;
    baiduLBS.searchStandPositionNearby(function(e)
    {
        if (e.status == "success" &&  e.message == "true")
        {
            staticOpenInfoWinFunEvents = [];
            var result =e.data;
            var items = result.contents;
            currentDisplayStandsStrPoints = [];
            var innerHtmlString = "<ul class='list'>";

            for (var i=0;i<result.size; i++)
            {

                var targetPosition = items[i];
                var standType = targetPosition.tags;

                var myIcon = fetchIconByStandType(standType);

                currentDisplayStandsStrPoints.push(targetPosition.location[0] + "," + targetPosition.location[1]);
                var point = new BMap.Point(targetPosition.location[0],targetPosition.location[1]);
                var marker = addMarker(point,i,mapObj,myIcon,null);
                currentDisplayStandsMarks.push(marker);
                var openInfoWinFun = addInfoWindow(marker,targetPosition,i);
                staticOpenInfoWinFunEvents.push(openInfoWinFun);

                var locationId = "loc" + i;
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a id='" + locationId +"' onclick='standListTapEvent("+ i + "," + mapObjStr + ")'>" + targetPosition.title.replace(new RegExp(searchString, "g"), '<b>' + searchString+ '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";
            }

            innerHtmlString = innerHtmlString + "</ul>";
            $(listContainerId).html(innerHtmlString);
        }
    },search_condition);
}


function searchPoiNearbyPosition(location,mapObj, searchString,containerJObj)
{
    var mapObjStr = null;
    if (mapObj == map)
    {
        mapObjStr = "map";
    }
    else if (mapObj == mapCr)
    {
        mapObjStr = "mapCr";
    }
    var search_condition = createJsonSearchConditionForNearbySearch();
    search_condition.location=location;
    search_condition.q = searchString;
    baiduLBS.searchStandPositionNearby(function(e)
    {
        if (e.status == "success" &&  e.message == "true")
        {

            var result =e.data;
            var items = result.contents;
            staticSearchResults = items;
            var innerHtmlString = "<ul class='list'>";
            for (var i=0;i<result.size; i++)
            {
                var locationId = "loc" + i;
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a id='" + locationId +"' onclick='resultItemStandTapEvent("+ i + "," + mapObjStr + ")'>" + items[i].title.replace(new RegExp(searchString, "g"), '<b>' + searchString+ '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";
            }
            innerHtmlString = innerHtmlString + "</ul>";
            containerJObj.html(innerHtmlString);
        }
    },search_condition);


}

function standListTapEvent(i,mapObj)
{
    if (mapObj == map) {
        transferToPanel("#mapPanel", "pop");
    }
    else if (mapObj == mapCr)
    {
        transferToPanel("#createStandPanel2","pop");
    }
    setTimeout(staticOpenInfoWinFunEvents[i],LOAD_MAP_TIP_LAYER_DELAY);
}




function searchLocalPosition(targetString, mapObj,containerJObj) {
    var mapObjStr = "";
    if (mapObj == map)
    {
        mapObjStr = "map";
    }
    else if (mapObj == mapCr)
    {
        mapObjStr = "mapCr";
    }
    var options = {
        onSearchComplete: function (results) {
            var innerHtmlString = "";
            staticSearchResults = results;
            innerHtmlString = innerHtmlString + "<ul class='list'>";
            var eventStack = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                var locationId = "loc" + i;
                innerHtmlString = innerHtmlString + "<li>";
                innerHtmlString = innerHtmlString + "<a id='" + locationId +"' onclick='resultItemTapEvent("+ i + "," + mapObjStr + ")'>" + results.getPoi(i).title.replace(new RegExp(results.keyword, "g"), '<b>' + results.keyword + '</b>') + "</a>";
                innerHtmlString = innerHtmlString + "</li>";
            }
            innerHtmlString = innerHtmlString + "</ul>";
            containerJObj.html(innerHtmlString);

        }
    }


    var local = new BMap.LocalSearch(mapObj, options);
    local.search(targetString);
}

function resultItemStandTapEvent(i,mapObj)
{

    if (mapObj == map) {
        transferToPanel("#mapPanel", "pop");
    }
    else if (mapObj == mapCr)
    {
        transferToPanel("#createStandPanel2","pop");
    }
    var targetPosition = staticSearchResults[i];
    var point = new BMap.Point(targetPosition.location[0],targetPosition.location[1]);
    var marker = addMarker(point,i,mapObj,null);
    setCurrentSingleSearchMark(marker, mapObj);
    var openInfoWinFun = addInfoWindow(marker,targetPosition,i);
    setTimeout(openInfoWinFun,LOAD_MAP_TIP_LAYER_DELAY);

}

function resultItemTapEvent(i,mapObj)
{
    if (mapObj == map) {
        transferToPanel("#mapPanel", "pop");
    }
    else if (mapObj == mapCr)
    {
        transferToPanel("#createStandPanel2","pop");
    }
    var marker = addMarker(staticSearchResults.getPoi(i).point,i,mapObj,null);
    setCurrentSingleSearchMark(marker, mapObj);
    var openInfoWinFun = addInfoWindow(marker,staticSearchResults.getPoi(i),i);
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
    //console.log(infoWindowHtml.join(""));//
    var infoWindow = new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});
    var openInfoWinFun = function(){
        marker.openInfoWindow(infoWindow);
    };
    marker.addEventListener("click", openInfoWinFun);
    return openInfoWinFun;
}

function addMarker(point, index, mapObj, icon) {
    var marker = null;
    if (!icon) {
        var defaultIcon = new BMap.Icon("./images/target.png", new BMap.Size(21, 41), {
            offset: new BMap.Size(10, 41)
        });
        marker = new BMap.Marker(point, {icon: defaultIcon});
    }
    else {
        marker = new BMap.Marker(point, {icon: icon});
    }
    if (mapObj) {
        mapObj.addOverlay(marker);
    }
    // alert(point.lng + "   !!   " + point.lat);
    return marker;
}

function addMarkersByPoints (points, icon, mapObject)
{
    var markers = [];
    var marker = null;
    for (var point in points) {
        marker = addMarker(point,-1,mapObject,icon,null);
        markers.push(marker);
    }
    return markers;
}

function removeMarkersByMarkers (markers, mapObject)
{
    var marker = null;
    while(marker=markers.pop() )
    {
        mapObject.removeOverlay(marker);
    }
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
function fetchIconByStandType(standType) {
    var myIcon = null;
    if (standType == "1") {
        myIcon = iconFood
    }
    else if (standType == "2") {
        myIcon = iconCloth
    }
    else if (standType == "3") {
        myIcon = iconToy
    }
    else if (standType == "4") {
        myIcon = iconDigital
    }
    return myIcon;
}

function setCurrentSingleSearchMark(mark, mapObject)
{
    if (currentSingleDisplaySearchMark)
    {
        mapObject.removeOverlay(currentSingleDisplaySearchMark);
    }
    currentSingleDisplaySearchMark = mark;
}

function transferToPanel(targetPanel , transitionStyle)
{
    $.afui.loadContent(targetPanel,false,false,transitionStyle);
    currentPanel = targetPanel;
}
//generate

function fetchCurrentGPSPosition()
{
    return "121.55,31.25";
}

function transStringToPoint(positionString)
{
    var positions = positionString.split(",");
     var result = new BMap.Point(parseFloat(positions[0]),parseFloat(positions[1]));
    return result;
}

function transPointToString(point)
{
   return point.lng + "," + point.lat;

}















