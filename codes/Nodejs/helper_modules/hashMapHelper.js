
var bizOperation = require("../biz_modules/db_biz_operation.js");
var crypto=require("crypto");
var config = require("./../config.js");

var SECURITY_METHOD = config.securityAndAuth.securityMethod;
var OUTPUT_DIGEST_METHOD = config.securityAndAuth.outputDigestMethod;
var MAX_HASH_KEY = config.securityAndAuth.maxHashKey;
var EXPIRE_INTERVAL = config.securityAndAuth.expireInterval;
var DATABASE_HASHKEY_SUFIX = config.securityAndAuth.databaseHashKeySuffix;
var MEMORY_HASHKEY_SUFIX = config.securityAndAuth.memoryHashKeySuffix;

var BIZ_ERROR_WORDS = config.bizService.bizErrorWords;
var MESSAGE_CREATESERVERNOCONFLICTKEY_INNER= config.messages.message_createServerNoConflictKey_inner;
var MESSAGE_PUSHSERVERHASH_INNER = config.messages.message_pushServerHash_inner;
var MESSAGE_INVALIDTOKENKEY = config.messages.messageInvalidTokenKey;
var MESSAGE_CHECKCONFLICTHASHCODE_INNER = config.messages.message_checkConflictHashCode_inner;


var hashMapoperation = new bizOperation.hashMapClass();

exports.baseCreateCode = function(input)
{
    var hash = crypto.createHash(SECURITY_METHOD);
    hash.update(input);
    var hashResult = hash.digest(OUTPUT_DIGEST_METHOD);
    return hashResult;
};

exports.createLocalNoConflictKey= function(input, hashMap)
{
    var expired_date_ms = (new Date()).getTime()+EXPIRE_INTERVAL;
    var combined_input = input + expired_date_ms;
    var result = exports.baseCreateCode(combined_input);
    while (hashMap.contains(result))
    {
        expired_date_ms++;
        combined_input = input + expired_date_ms;
        result = exports.baseCreateCode(combined_input);
    }
    return result;
};

exports.matchLocalHash= function(inputHash, hashMap)
{
    var current_date_ms = (new Date()).getTime();
    if (hashMap.contains(inputHash))
    {
        var expired_date_ms = hashMap.get(inputHash);
        if (current_date_ms<=expired_date_ms)
        {
            hashMap.remove(inputHash);
            return true;
        }
        hashMap.remove(inputHash);
    }
    return -1;

};

exports.cleanExpiredKey = function(hashMap)
{
    var current_time_span = (new Date()).getTime();
    for (var item in hashMap)
    {
        if (hashMap[item] <  current_time_span)
        {
            hashMap.remove(item);
        }
    }

};

exports.pushLocalHash = function(input,hashMap)
{
    var value = exports.generateValue();
    var key = exports.createLocalNoConflictKey(input,hashMap);
    hashMap.set(key, value);
    return key;
};

exports.pushServerHash = function(callback, input)
{

    exports.createServerNoConflictKey(function(err,e)
    {
        if (err)
        {
            callback(err,false);
            return;

        }
        try {
            if (e) {
                var hashValue = exports.generateValue();
                var hashMapItem = {hash_key: e, value: hashValue};
                hashMapoperation.pushHashCode(callback,input, hashMapItem);
            }
            else {
                callback(new Error(MESSAGE_CREATESERVERNOCONFLICTKEY_INNER),e);
            }
        }
        catch (ex)
        {
            callback(ex,false);
        }

    },input);
};

exports.pushHash = function(callback,input,hashMap)
{
    if (hashMap.count()>MAX_HASH_KEY )
    {
        exports.pushServerHash(function(err,e) {
            if (err)
            {
                callback(err,false);
                return;
            }
            if (e && e != -1)
            {
                callback(err,e + DATABASE_HASHKEY_SUFIX);
            }
            else {

                callback(new Error(MESSAGE_PUSHSERVERHASH_INNER),e);
            }
        },input);
    }
    else
    {
        var localResult = exports.pushLocalHash(input,hashMap);
        callback(null,localResult + MEMORY_HASHKEY_SUFIX);
    }
};

exports.matchServerHash = function(callback,inputHash)
{
    hashMapoperation.matchHashCode(callback,inputHash);

};

exports.matchHash = function (callback,inputHash,hashMap)
{
    try {

        var tokenType = inputHash.substring(inputHash.length - 3);
        var refinedHash = inputHash.substr(0,inputHash.length - 3);
        if (tokenType == MEMORY_HASHKEY_SUFIX) {
            callback(null,exports.matchLocalHash(refinedHash, hashMap));
        }
        else if (tokenType == DATABASE_HASHKEY_SUFIX) {
            exports.matchServerHash(callback, refinedHash);
        }
        else {

            var bizError = new Error(MESSAGE_INVALIDTOKENKEY);
            bizError.Name = BIZ_ERROR_WORDS;
            callback(bizError,-1);
        }
    }
    catch(e)
    {
        callback(e,false);
    }


};


exports.createServerNoConflictKey = function(callback,input)
{
    var exception = null;
    var conflictCallback = null;
    try {
        var expired_date_ms = exports.generateValue();
        var generatedHashCode = exports.baseCreateCode(exports.generateKey(input, expired_date_ms));
        var conflictCallback = function (err,e) {
            if (err)
            {
                callback(err, false);
            }
            try {
                if (e == -1) {
                    expired_date_ms++;
                    generatedHashCode = exports.baseCreateCode(exports.generateKey(input, expired_date_ms));
                    hashMapoperation.checkConflictHashCode(conflictCallback, generatedHashCode);
                }
                else if (e) {
                    callback(err, generatedHashCode);
                }
                else {

                    callback(new Error(MESSAGE_CHECKCONFLICTHASHCODE_INNER), e);
                }
            }
            catch(ex)
            {
                callback(ex,false);
            }
        };
    }
    catch (e)
    {
         exception = e;
    }
    finally {
        if (exception)
        {
            callback(exception,false);
        }
        else {
            hashMapoperation.checkConflictHashCode(conflictCallback, generatedHashCode);
        }
    }
};

exports.generateValue = function()
{
    return (new Date()).getTime()+EXPIRE_INTERVAL;
};

exports.generateKey = function(header, footer)
{
    return exports.baseCreateCode(header + footer);
};