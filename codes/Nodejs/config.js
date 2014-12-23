exports.globalCommon = {
    debugFlag : 0
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
 defaultOrder : " create_date desc "
};


exports.serverParameters = {
  httpSuccessCode  : 201,
  serverPort  : 8080,
  lastedVersion  :"v1",
  baseRouter  : "zhaotantou"
};

exports.messages = {

   messageNoKeyExists : "No key exists",
   messageInvalidDateUsername : "create_date or modify_date should not be included as parameter, or user_name cannot be none",
   messageInvalidDate : "createdate or modifydate should not be included as parameter",
   messageStandMarkErr : "Stand mark is invalid (<= 0)",
   message_no_mark_record : "No Mark record",
   MESSAGE_CHECKMARKEXISTBYSTANDUSER_INNER : "checkMarkExistByStandUser - inner Exception ",
   MESSAGE_REMOVEHASHCODEINNER_INNER : "removeHashCodeInner - inner Exception",
   MESSAGE_CHECKCONFLICTHASHCODE_INNER : "checkConflictHashCode - inner Exception",
   MESSAGE_PUSHHASHCODE_INNER : "pushHashCode - inner Exception",
   MESSAGE_MANDATORY_MARK : "If mark is never set before, mark is mandatory",
   MESSAGE_CHECKMARKEXISTBYSTANDUSER_INNER : "checkMarkExistByStandUser - inner error"

};
