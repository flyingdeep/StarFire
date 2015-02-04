var restify = require("restify");
var BASE_DOMAIN = "http://api.map.baidu.com";
var URI_BAIDU_LBS_GEODATA_POI_CREATE = "/geodata/v3/poi/create";
function createNewJsonStandPositionInfoInstance()
{
    //var datetime_string = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
    var datetime_int = (new Date()).getTime();
    //alert(datetime_int);
    var resultJson = {
        coord_type:3,
        geotable_id: 84451,
        ak:"NpZPLFzDKjPWEenu8D2yf4vS",
        title:  "阿牛的煎饼摊",
        address: "上海市卢湾区淮海中路496号",
        tags: "测试地址",
        latitude: 121.49911,
        longitude: 31.254101,
        // customized fields
        creater_id : 1,
        create_user : "flyingdeep",
        description : "我的测试case地址"

    }

    return resultJson;
}

var client = restify.createStringClient({
    url: BASE_DOMAIN
});

var Json_stand_position_info = createNewJsonStandPositionInfoInstance();

var options = {
    path: URI_BAIDU_LBS_GEODATA_POI_CREATE,
    retry: {'retries': 3}
};

client.post("/geodata/v3/poi/create",
    {
        coord_type:3,
        geotable_id: 84451,
        ak:'NpZPLFzDKjPWEenu8D2yf4vS',

        title:  "阿牛的煎饼摊",
        address: "上海市卢湾区淮海中路496号",
        tags: "测试地址",
        latitude: 121.49911,
        longitude: 31.254101,
        // customized fields
        creater_id : 1,
        create_user : "flyingdeep",
        description : "我的测试case地址"

    },
    function (err, req, res, data) {
        console.log("err: " + err);
        console.log("data: "+ JSON.parse(data).id);
    });

//var client = restify.createJsonClient({
//  url: "http://localhost:8081" });
//
//client.post("/zhaotantou/UpdateUser/v1",
//    {"token":"S9kFMn4dIE+KYO3QMstZIw==_me","inputParameter":{"user_name":"flyingdeep2002","display_name":"fly","image_id":"22335","user_preference":"teststring1234","user_type":"1","cell_number":"13361846366","web_chat":"flyingdeep","qq_number":"13196590","province_city_area":{"province":"北京","city":"上海","area":"杨浦"}}},
//    function (err, req, res, data) {
//                console.log("err: " + err);
//        console.log("data: "+ JSON.stringify(data));
//    }
//)



