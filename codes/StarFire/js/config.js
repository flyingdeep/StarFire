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

// ----------- configurable variable area

var config_AreaSearchDistance = 50000;
var config_DisplayVisitorCreatedStand = true;
var config_DisplayType = 1;
var config_Tags = ""; // null means no filter
var config_CreatorType = ""; // "" is no filter, 1 means display owner stand only.

//-------------- global variable---------
var currentPosition = null;
var currentPanel = null;
var currentGPSPosition = null;
var staticResults = [];
var staticOpenInfoWinFunEvents = [];
var staticStandTypeHtmlString = null;
