// ----------- configurable variable area

var config_AreaSearchDistance = 50000;
var config_DisplayVisitorCreatedStand = true;
var config_DisplayType = 1;
var config_Tags = ""; // null means no filter
var config_CreatorType = ""; // "" is no filter, 1 means display owner stand only.

//-------------- global variable---------
var isLogon = 1;
var mapCenterString = null; //map center val
var currentPanel = null;
var previousPanel = null;
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
var iconFood = null;
var iconFoodFa = null;
var iconToy = null;
var iconToyFa = null;
var iconCloth = null;
var iconClothFa = null;
var iconDigital = null;
var iconDigitalFa = null;
var iconLocate = null;

var globalToasts = [];

var inputSeed = 0; //File name criterion seed for upload
var fileExtension = "";  // for upload
var toCreateImageCollection = [];//

var createStandEntity = {
    "standId":null,
    "creatorType": null,
    "creatorId":null,
    "standName": null,
    "standType" : null,
    "standSubContent": null,
    "description": null,
    "position":null,
    "address":null,
    "images":[]
};

var createUserEntity = {
    "userId": null,
    "userName": null,
    "password":null,
    "displayName": null,
    "userImage": null,
    "userPreference": null,
    "userType": null,
    "email": null,
    "cellNumber": null,
    "webChat": null,
    "qqNumber": null,
    "provinceCityArea": null,
    "createDate": null,
    "updateDate":null
};

var userBasicInfoEntity = {
    "userId": null,
    "userName": null,
    "displayName": null,
    "userImage": null,
    "userPreference": null,
    "userType": null,
    "email": null,
    "cellNumber": null,
    "webChat": null,
    "qqNumber": null,
    "provinceCityArea": null,
    "createDate": null,
    "updateDate":null
};

var userPreference =
{
    "displayDistance": null,
    "standType":null,
    "displayClientCreatedStand":null,
    "displayLinkedStandOnly": null
};

