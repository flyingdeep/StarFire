
var bizOperation = require("../biz_modules/db_biz_operation.js");
var crypto=require("crypto");
var config = require("./../config.js");

var SECURITY_METHOD = config.securityAndAuth.securityMethod;
var OUTPUT_DIGEST_METHOD = config.securityAndAuth.outputDigestMethod;
var MAX_HASH_KEY = config.securityAndAuth.maxHashKey;
var EXPIRE_INTERVAL = config.securityAndAuth.expireInterval;
var DATABASE_HASHKEY_SUFIX = config.securityAndAuth.databaseHashKeySuffix;
var MEMORY_HASHKEY_SUFIX = config.securityAndAuth.memoryHashKeySuffix;

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

exports.pushServerHash = function(exception, callback, input)
{

    exports.createServerNoConflictKey(function(e)
    {
        if (e)
        {
            var hashValue = exports.generateValue();
            var hashMapItem = {hash_key: e, value: hashValue};
            hashMapoperation.pushHashCode(callback,hashMapItem);
        }
        else
        {
            callback(e);
        }

    },input);
};

exports.pushHash = function(callback,input,hashMap)
{
    if (hashMap.count()>MAX_HASH_KEY )
    {
        exports.pushServerHash(function(e) {
            if (e && e != -1)
            {
                callback(e + DATABASE_HASHKEY_SUFIX);
            }
            else {
                callback(e);
            }
        },input);
    }
    else
    {
        var localResult = exports.pushLocalHash(input,hashMap);
        callback(localResult + MEMORY_HASHKEY_SUFIX);
    }
};

exports.matchServerHash = function(callback,inputHash)
{
    hashMapoperation.matchHashCode(callback,inputHash);

};

exports.matchHash = function (exception, callback,inputHash,hashMap)
{
    if (exception)
    {
        callback(exception,false);
        return;
    }
    try {
        var tokenType = inputHash.substring(inputHash.length - 3);
        if (tokenType == MEMORY_HASHKEY_SUFIX) {
            callback(exception, exports.matchLocalHash(inputHash, hashMap));
        }
        else if (tokenType == DATABASE_HASHKEY_SUFIX) {
            exports.matchServerHash(exception, callback, inputHash);
        }
        else {
            callback(new Error("Invalid token key"),-1);
        }
    }
    catch(e)
    {

    }


};


exports.createServerNoConflictKey = function(exception, callback,input)
{
    if (exception)
    {
        callback(exception, false);
    }
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
                    hashMapoperation.checkConflictHashCode(err, conflictCallback, generatedHashCode);
                }
                else if (e) {
                    callback(err, generatedHashCode);
                }
                else {
                    callback(new Error("checkConflictHashCode - inner Exception"), e);
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
        hashMapoperation.checkConflictHashCode(exception, conflictCallback, generatedHashCode);
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