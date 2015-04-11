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

// ----------- configurable variable area

var config_AreaSearchDistance = 50000;
var config_DisplayVisitorCreatedStand = true;
var config_DisplayType = 1;
var config_Tags = ""; // null means no filter
var config_CreatorType = ""; // "" is no filter, 1 means display owner stand only.

//-------------- global variable---------
var currentPanel = null;
var currentGPSPosition = null;
var currentDisplayStandsStrPoints = [];
var currentDisplayStandsMarks = [];
var currentSingleDisplaySearchStrPoint = null;
var currentSingleDisplaySearchMark = null;
var staticSearchResults = [];
var staticOpenInfoWinFunEvents = [];
var staticStandTypeHtmlString = null;
var staticUserPreference = null;
var currentCreatedPoiMarker = null;
var currentCreatedPoint = null;
var iconFood = null;
var iconFoodFa = null;
var iconToy = null;
var iconToyFa = null;
var iconCloth = null;
var iconClothFa = null;
var iconDigital = null;
var iconDigitalFa = null;
var iconLocate = null;

var inputSeed = 0; //File name criterion seed for upload
var fileExtension = "";  // for upload
var toCreateImageCollection = [];//
