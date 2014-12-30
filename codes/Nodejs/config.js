exports.globalCommon = {
    debugFlag : 1
};

exports.securityAndAuth= {
 fixedMD5Key : "!qaz2WSX#edc",
 fixedDESKey : "FifthSea",
 securityMethod : "md5",
 outputDigestMethod : "base64",
 maxHashKey : 1000,
 expireInterval : 3000000, // ms
 databaseHashKeySuffix : "_db",
 memoryHashKeySuffix : "_me"
};

exports.bizService = {
 schema : "stand.",
 schemaConfig : "config.",
 maxPoolThread : 50,
 dbAddress : "localhost",
 dbUser :"root",
 dbPass : "root",
 defaultOffset : 1,
 defaultPageSize : 10,
 defaultOrder : " create_date desc ",
 bizErrorWords : "biz"
};


exports.serverParameters = {
  httpSuccessCode  : 200,
  serverPort  : 8080,
  lastedVersion  :"v1",
  baseRouter  : "zhaotantou"
};

exports.messages = {

   messageNoKeyExists : "No key exists",
   messageInvalidDateUsername : "create_date or modify_date should not be included as parameter, or user_name cannot be none",
   messageInvalidDate : "createdate or modifydate should not be included as parameter",
   messageStandMarkErr : "Stand mark is invalid (<= 0)",
   messageNoMarkRecord : "No Mark record",
   message_checkMarkExistByStandUser_inner : "checkMarkExistByStandUser - inner Exception ",
   message_removeHashCodeInner_inner : "removeHashCodeInner - inner Exception",
   message_checkConflictHashCode_inner : "checkConflictHashCode - inner Exception",
   message_pushHashCode_inner : "pushHashCode - inner Exception",
   messageMandatoryMark : "If mark is never set before, mark is mandatory",
   message_checkMarkExistByStandUser_inner : "checkMarkExistByStandUser - inner error",
   message_createServerNoConflictKey_inner : "createServerNoConflictKey - inner Exception",
   message_pushServerHash_inner : "pushServerHash - inner Exception",
   messageInvalidTokenKey : "Invalid token key",
   message_checkConflictHashCode_inner : "checkConflictHashCode - inner Exception",
   message_noUser : "No user found!",
   message_authenticateUser_inner : "authenticateUser - innerException",
   message_noUserPass : "Cannot fetch user_name or password",
    message_inputParaError: "Wrong format of inputParameter"

};
