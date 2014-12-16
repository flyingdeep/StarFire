var dbOperation = require("./../db_modules/db_mysql_operation.js");

var accessServerAuth = require("./../helper_modules/accessServerAuth.js");
//dbOperation.insertData(function(e){console.log(e)},"insert into test.newtb set ", {newTBcol:"111",newTBcol1:"222",newTBcol2:"333"});
//dbOperation.fetchData(getresult,"select * from test.newtb",pool);
function getresult(e){
    console.log(e.length);
   // console.log(e[0].newTBcol);

    for (var record in e)
    {
        var recordstring = "";
       var oner = e[record];
        for (var item in oner) {
            recordstring += oner[item];

            console.log(item);

        }
        console.log(recordstring);
    }


}
//dbOperation.deleteData(function(e){console.log(e);},"delete from test.newtb where idNewTB=14");
//dbOperation.updateData(function(e){console.log(e);}, "update test.newtb set newTBcol='cdssw' where idNewTB =13");
//console.log(dbOperation.escape(",/'d'"));
//console.log(dbOperation.escape("now()"));
var bizOperation = require("./../biz_modules/db_biz_operation.js");


//----------------------------- userInfoClass --------------------------

var useroperation = new bizOperation.userInfoClass();
//var jsonuser = {
//user_name:"flyingdeep",
//    display_name:"fly",
//    image_id:"22345",
//    user_preference:"teststring1234",
//    user_type:"0",
//    cell_number:"13361846366",
//    web_chart:"flyingdeep",
//    qq_number:"13196590",
//    province_city_area:"{\"province\":\"上海\",\"city\":\"上海\",\"area\":\"杨浦\"}",
//    "password":"sdfasfafg"
//};
//
//var jsonuser = {
//    "user_name":"flyingdeepwww",
//    "display_name":"fly",
//    "image_id":"22345",
//    "user_preference":"teststring1234",
//    "user_type":"0",
//    "cell_number":"13361846366",
//    "web_chart":"flyingdeep",
//    "qq_number":"13196590",
//    "province_city_area":"{\"province\":\"上海\",\"city\":\"上海\",\"area\":\"杨浦\"}",
//    "password":"sdfasfafg"
//};
//useroperation.createUser(function(e){console.log(e)},jsonuser);
//
//
//var jsoncondition = {user_name:"flyingdeep",display_name:"fly"};
//useroperation.updateUser(function(e){console.log(e);},jsonuser,jsoncondition);

//------------------------------- standInfoClass ---------------------------

//var standoperation = new bizOperation.standInfoClass();
//var stand = {
//    stand_Id:23432,
//    creator_type:1,
//    stand_type:2,
//    stand_name:"stand444",
//    type_detail_description:"test",
//    description:"test",
//    create_user_id:2342,
//    isactive:true,
//    mark:7,
//    position_x:3234,
//    position_y:123412,
//    realtime_location_active: false
//}
//
//var standwhere = {stand_Id:23432,mark:7};
//standoperation.createStand(function(e){console.log(e)},stand);

//standoperation.updateStand(function(e){console.log(e)},stand,standwhere);

//standoperation.removeStandLogical(function(e){console.log(e)},standwhere);

//var stand_images = {
//    stand_Id:23432,
//    image_Id:3,
//    comments: "aaaa"
//};

//standoperation.standAddPic(function(e){console.log(e)},stand_images);

//standoperation.standRemovePicLogic(function(e){console.log(e)},stand_images);


//------------------------------- standCustomerMarkClass ---------------------------

//var  standCustomerMarkoperation = new bizOperation.standCustomerMarkClass();
//
//
//
//var customerMark = {
//    stand_id:234132,
//    mark:444,
//    comments: "aaaa",
//    create_user_id: 2,
//    create_user_name: "flyingdeep"
//};
//standCustomerMarkoperation.addCustomerMark(function(e){console.log(e);},customerMark);
//standCustomerMarkoperation.removeCustomerMarkLogical(function(e){console.log(e);},customerMark);
//standCustomerMarkoperation.fetchCustomerMarkDataByStandId(function(e){console.log(e);},23432,0,100,"create_date");
//standCustomerMarkoperation.fetchCustomerMarkDataByUsername(function(e){console.log(e);},"flyingdeep",0,100,"create_date desc");
//standCustomerMarkoperation.calculateMarkByStand(function(e){console.log(e);},23432);
//standCustomerMarkoperation.createMarkCommentsWithCheck(function(e){console.log(e);},customerMark);
//standCustomerMarkoperation.checkMarkExistByStandUser(function(e){console.log(e);},23432,"flyingdeep1");


//------------------------------- standUserLinkClass ---------------------------


//var standUserLinkMarkoperation =  new bizOperation.standUserLinkClass();
//
//var standUserLink =
//{
//      stand_id : 23432,
//    user_id: 2
//};

//standUserLinkMarkoperation.addSandUserLink(function(e){console.log(e);},standUserLink);

//standUserLinkMarkoperation.fetchSandUserLinkByStandId(function(e){console.log(e);},23432,0,20,"create_date");

//standUserLinkMarkoperation.fetchSandUserLinkByUserId(function(e){console.log(e);},2,0,20,"a.create_date");

//standUserLinkMarkoperation.removeSandUserLinkLogic(function(e){console.log(e);},standUserLink);


//------------------------------- standUserLinkClass ---------------------------

//var  standImageoperation = new bizOperation.standUserLinkClass();
//
//var standImage = {
//  stand_id : 23432,
//    image_id : 5,
//    comments: 2122
//
//};

//standImageoperation.createStandImage(function(e){console.log(e);},standImage);

//standImageoperation.fetchImagesByStandId(function(e){console.log(e);},23432);
//console.log(accessServerAuth.baseCreateCode("12314124"));


//------------------------------- hashMapClass ---------------------------
//var  HashMapoperation = new bizOperation.hashMapClass();
//var expiretime = (new Date()).getTime() + 30000;
////console.log(expiretime);
//var hashItem =
//{
//  hash_key:"SXE1y/HwhHbI4QyyRJvKEQ==",
//  value:expiretime
//
//};


//hashMapoperation.checkConflictHashCode(function(e){console.log(e);},"SXE1y/HwhHbI4QyyRJdKTQ==");
//hashMapoperation.pushHashCode(function(e){console.log(e);},hashItem);
//hashMapoperation.matchHashCode(function(e){console.log(e);},"SXE1y/HwhHbI4QyyRJvKTQ==");
//hashMapoperation.removeHashCode(function(e){console.log(e);},"SXE1y/HwhHbI4QyyRJvKTQ==");

//var  standOwnerMessageoperation = new bizOperation.standOwnerMessageClass();
//var standOwnerMessage = {
//    stand_id:23432,
//    message:"test2"
//}
//standOwnerMessageoperation.createStandOwnerMessage(function(e){console.log(e);},standOwnerMessage);

//standOwnerMessageoperation.fetchStandOwnerMessageByStandId(function(e){console.log(e);},23432,1,10,"create_date desc");

//standOwnerMessageoperation.fetchStandOwnerMessageByOwnerId(function(e){console.log(e);},2342,1,10,"create_date desc");

//var  standTypeoperation = new bizOperation.standTypeClass();
//
//standTypeoperation.fetchStandType(function(e){console.log(e)});