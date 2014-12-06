var SECURITY_METHOD = "md5";
var OUTPUT_DIGEST_METHOD = "base64"
var MAX_HASH_KEY = 1000;
var EXPIRE_INTERVAL = 30000; // ms
exports.createCode = createCode;

exports.baseCreateCode = baseCreateCode;

function baseCreateCode(input)
{
	var crypto=require("crypto");
	var hash = crypto.createHash(SECURITY_METHOD);
	hash.update(input);
	var hashResult = hash.digest(OUTPUT_DIGEST_METHOD);
	return hashResult;
}

function createCode(input, hashMap)
{
	var expired_date_ms = (new Date()).getTime()+EXPIRE_INTERVAL;
	var combined_input = input + expired_date_ms;
	var result = baseCreateCode(input);
	if (hashMap.count() == 0)
	{
		//pushHash(result);
	}
	else
	{
		while (hashMap.contains(result))
		{
			expired_date_ms++;
			combined_input = input + expired_date_ms;
			result = baseCreateCode(input);
		}
	}
	return result;
}

function matchCode(inputHash, hashMap)
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
    return false;

}

function cleanExpiredKey(hashMap)
{
	var current_time_span = (new Date()).getTime();
	for (var item in hashMap)
	{
		if (hashMap[item] <  current_time_span)
		{
			hashMap.remove(item);
		}
	}

}



function pushHash(key, value,hashMap)
{
	if (hashMap.count()>MAX_HASH_KEY )
	{
		
	}
	else 
	{
		hashMap.set(key, value);
	}
	
}

