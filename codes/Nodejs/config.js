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
