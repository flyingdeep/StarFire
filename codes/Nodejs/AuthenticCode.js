var crypto=require("crypto");
var hash = crypto.createHash("md5");
var ime= (new Date()).getTime();
hash.update("asdskw"+ime);
console.log("asdskw"+ime);
console.log(hash.digest("base64"));
hash = crypto.createHash("md5");
console.log("asdskw"+(ime+1));
hash.update("asdskw"+(ime+1));
console.log(hash.digest("base64"));