var hashMapModule = require("./helper_modules/hashMap.js");
var accessServerAuth = require("./helper_modules/accessServerAuth.js");
console.log(accessServerAuth.baseCreateCode("tesadsfwt"));
var hashMap = new hashMapModule.HashMap();

hashMap.set("name","John Smith");
hashMap.set("age",24);

hashMap.contains("title");//false
hashMap.contains("name");//true

//hashMap.Remove("age");
//console.log(accessServerAuth.createCode("flyingdeep",hashMap));
//hashMap

//console.log(hashMap.Count());