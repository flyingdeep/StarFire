var crypto=require("crypto");
var config = require("./../config.js");
var customDes = require("./customize_Des.js");
var BASE64 = "base64";
var SHA1 = "sha1";
var UTF8 = "utf8";
var DES = "des";
var FIXEDMD5KEY = config.securityAndAuth.fixedMD5Key;
var FIXEDDESKEY = config.securityAndAuth.fixedDESKey;


var COMMONENCRYPTCODE = BASE64;



exports.authOSS = function(policy, key)
{

    var base64policy = (new Buffer(policy)).toString(BASE64);

    var signature = crypto.createHmac(SHA1, key).update(base64policy).digest().toString(BASE64);
    var result = {
        "base64policy":base64policy,
        "signature":signature
    };
    return result;
};


exports.encryptSymString = function(input, method)
{
    var result;
    if (method.toLowerCase() == DES)
    {
        result = encryptStringDES(input,FIXEDDESKEY);

    }
    return result;
};



var encryptStringDES = function(input,key)
{
//    var cipher = crypto.createCipher(DES, FIXEDDESKEY);
//    cipher.update(input,UTF8,BASE64);
//    var encrypted = cipher.final(BASE64);
//    return encrypted;
    var cipher = crypto.createCipher(DES, FIXEDDESKEY);
    return customDes.strEnc(input,key);
};

exports.decryptSymString = function(target, method)
{

    var result;
    if (method.toLowerCase() == DES)
    {
        result = decryptStringDES(target,FIXEDDESKEY);
    }

    return result;
};

var decryptStringDES = function(target,key)
{
  return customDes.strDec(target,key);
};





