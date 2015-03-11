
var crypto=require("crypto");
var policy ='{"expiration":"2015-12-01T12:00:00.000Z","conditions":[["content-length-range",1,5242880]]}';
var base64policy = (new Buffer(policy)).toString("base64");
console.log(base64policy);
var key = "SLiVEsGzg57ASofurBc0P4RdA1IsjW";
var result = crypto.createHmac("sha1", key).update(base64policy).digest().toString("base64");
console.log(result);