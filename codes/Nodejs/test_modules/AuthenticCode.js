var crypto=require("crypto");
var c_des = require("./../helper_modules/customize_Des.js");
console.log(c_des.strEnc("aasd","bbbc"));
//var hash = crypto.createHash("md5");
//var ime= (new Date()).getTime();
//hash.update("asdskw"+ime);
//console.log("asdskw"+ime);
//console.log(hash.digest("base64"));
//hash = crypto.createHash("md5");
//console.log("asdskw"+(ime+1));
//hash.update("asdskw"+(ime+1));
//console.log(hash.digest("base64"))
var cipher = crypto.createCipher("des", "aaaaaaaa");
cipher.update("dddddddd","utf8","hex");
var encrypted = cipher.final("hex");
console.log(encrypted);
