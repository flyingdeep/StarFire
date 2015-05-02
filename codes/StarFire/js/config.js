var AUTH_USER = "flyingdeep";
var AUTH_PASS = "25d55ad283aa400af464c76d713c07ad";
var RESULT_LIST_SIZE = 30;
var LOAD_MAP_TIP_LAYER_DELAY = 300;

// Ali-YUN OSS
var OSS_LOCATION = "shenzhen";
var OSS_BUCKET = "standapp";
var OSS_DOMAIN = "http://"+ OSS_BUCKET +".oss-cn-" + OSS_LOCATION + ".aliyuncs.com";
var OSS_ACCESS_KEY_ID = "glMswMHjOFGZRlhz";

var OSS_ENCTYPE = "multipart/form-data";
var OSS_BASE64_POLICY =  "";
var OSS_SIGNATURE = "";

var CR_DEFAULT_IMG_WIDTH_MAX = 480;
var CR_DEFAULT_IMG_HEIGHT_MAX = 480;

var UPLOAD_IMAGE_MAXSIZE = 2097152;

var ICON_FOOD  = new BMap.Icon("./images/target.png", new BMap.Size(21, 41), {
    offset: new BMap.Size(10, 41)
});
var ICON_TOY = new BMap.Icon("./images/target.png", new BMap.Size(21, 41), {
    offset: new BMap.Size(10, 41)
});
var ICON_CLOTH= new BMap.Icon("./images/target.png", new BMap.Size(21, 41), {
    offset: new BMap.Size(10, 41)
});
var ICON_DIGITAL= new BMap.Icon("./images/target.png", new BMap.Size(21, 41), {
    offset: new BMap.Size(10, 41)
});

var REG_EXPRESSION_STAND_NAME = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,10}$/; //Chinese alphabet number
var REG_EXPRESSION_STAND_SUB_TYPE_NAME = /^[\u4e00-\u9fa5,，]{1,50}$/; //Chinese alphabet number
var REG_EXPRESSION_USER_NAME =  /^[0-9a-zA-Z]{3,20}$/;
var REG_EXPRESSION_USER_DISPLAY_NAME = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,15}$/;
var REG_EXPRESSION_USER_PASSWORD = /^[0-9a-zA-Z_.\+\-]{8,20}$/;
var REG_EXPRESSION_EMAIL_FORMAT = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;


var GPS_INTERVAL = 30000;
var PHONE_VIBRATE = 3000;



