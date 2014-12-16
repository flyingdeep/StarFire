var crypto=require("crypto");
var BASE64 = "base64";
var SHA1 = "sha1";
var MD5 = "md5";
var UTF8 = "utf8";
var DES = "des";
var FIXEDMD5KEY = "!qaz2WSX#edc";
var FIXEDDESKEY = ")p:?9OL.*ik<";

var COMMONENCRYPTCODE = BASE64;



exports.authOSS = function(policy, key)
{

    var base64policy = (new Buffer(policy)).toString(BASE64);

    var result = crypto.createHmac(SHA1, key.update(base64policy).digest().toString(BASE64));
    return result;
};


exports.encryptSymString = function(input, method)
{
    if (method.toLowerCase() == MD5)
    {
        encryptStringMD5(input,FIXEDMD5KEY);
    }
    else if (method.toLowerCase() == DES)
    {
        encryptStringDES(input,FIXEDDESKEY);

    }

};

encryptStringMD5 = function(input,key)
{

    var cipher = crypto.createCipher(MD5, FIXEDMD5KEY);
    cipher.update(input,UTF8,BASE64);
    var encrypted = cipher.final(BASE64);
    return encrypted;
};

encryptStringDES = function(input,key)
{
    var cipher = crypto.createCipher(DES, FIXEDDESKEY);
    cipher.update(input,UTF8,BASE64);
    var encrypted = cipher.final(BASE64);
    return encrypted;
};

exports.decryptSymString = function(target, method)
{

    if (method.toLowerCase() == DES)
    {
        encryptStringDES(target,FIXEDDESKEY);

    }

};

encryptStringDES = function(target,key)
{
    var decipher = crypto.createDecipher(DES,FIXEDDESKEY);
    decipher.update(target,BASE64,UTF8);
    var decode= decipher.final(UTF8);
    return decode;
};





