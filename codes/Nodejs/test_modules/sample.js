
var crypto=require("crypto");
var policy ='{"expiration":"2015-12-01T12:00:00.000Z","conditions":[[“content-length-range”, 1, 4000]]}';
var base64policy = (new Buffer(policy)).toString("base64");
var key = "glMswMHjOFGZRlhz";
var result = crypto.createHmac("sha1", key).update(base64policy).digest().toString("base64");
console.log(result);