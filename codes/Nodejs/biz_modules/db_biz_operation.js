// define const
var config = require("./../config.js");

var SCHEMA = config.bizService.schema;
var SCHEMA_CONFIG = config.bizService.schemaConfig;
//table name
var TB_USER_INFO = SCHEMA + "user_info";
var TB_STAND_INFO = SCHEMA + "stand_info";
var TB_STAND_TYPE = SCHEMA + "stand_type";
var TB_INSTANT_MESSAGE = SCHEMA + "instant_message";
var TB_STAND_IMAGES = SCHEMA + "stand_images";
var TB_STAND_CUSTOMER_MARK = SCHEMA + "stand_customer_mark";
var TB_STAND_OWNER_MESSAGE = SCHEMA + "stand_owner_message";
var TB_USER_LINK_STAND = SCHEMA + "user_link_stand";
var TB_AUTH_KEY_HASHMAP = SCHEMA_CONFIG + "auth_key_hashmap";

var MAX_POOL_THREAD = config.bizService.maxPoolThread;
var DB_ADDRESS = config.bizService.dbAddress;
var DB_USER =config.bizService.dbUser;
var DB_PASS = config.bizService.dbPass;
var CORMMA = /\,/g;

var mysqldbOperation = require('./../db_modules/db_mysql_operation.js');

mysqldbOperation.initMysqlPool(MAX_POOL_THREAD,DB_ADDRESS,DB_USER,DB_PASS);

/*
    User_info related
*/
exports.userInfoClass = function()
{
    this.fetchUserByUser = function() //exception, callback,username,password
    {


        var exception = arguments[0];
        var callback = arguments[1];
        var username = arguments[2];
        var password = arguments[3];
        var passwordwheresql = "";
        var sql = "";

        if (exception)
        {

            callback(exception,false);
            return;
        }
        try {
            if (password) {
                passwordwheresql = " and password=" + mysqldbOperation.escape(password);

            }

            sql = "select user_id,user_name,password,display_name," +
                "image_id,user_preference,user_type,cell_number," +
                "web_chart,qq_number,province_city_area,createdate,updatedate " +
                "from " + TB_USER_INFO + " where user_name=" + mysqldbOperation.escape(username) +
                " and isdeleted=0" + passwordwheresql;

        }
        catch (e)
        {
            exception = e;
        }
        finally {

            mysqldbOperation.fetchData(exception, callback, sql);
        }
    };

    this.userIdentityCheck = function() //exception,callback, username
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var username = arguments[2];
        var sql = "";
        if (exception)
        {
            callback(exception,false);
            return;
        }
        try {
            sql = "select count(user_name) as total from " +
                TB_USER_INFO + " where isdeleted=0 and user_name=" + mysqldbOperation.escape(username);
        }
        catch (e) {
            exception = e;
        }
        finally{
            mysqldbOperation.fetchData(exception,function (err, e) {
                if (err) {
                    callback(err, false);
                    return;
                }
                var result = false;
                try {
                    if (e[0].total == 0) {
                        result = true;
                    }
                }
                catch (e) {
                    err = e;

                }
                finally
                {
                    callback(err, result);
                }

            }, sql);
        }
    };

    this.createUser = function() //exception, callback, userinfo Json
    {
        var exception =  arguments[0];
        var callback = arguments[1];
        var userinfo = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }

        if (userinfo.createdate || userinfo.updatedate || !userinfo.user_name)
        {
            callback(new Error("create_date or modify_date should not be included as parameter, " +
                "or user_name cannot be none"), false);
            return;
        }


        this.userIdentityCheck(null,function(err,e){
          if (!err && e)
          {
              var presql = "insert into "+ TB_USER_INFO + " set createdate=now(),updatedate=now(),";
              mysqldbOperation.insertData(err,callback,presql,userinfo);
          }
            else
          {
              callback(err,false);
          }
        },userinfo.user_name);
    };

    this.updateUser = function() //exception, callback, userinfo, where condition
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var userinfo = arguments[2];
        var sqlcondition = arguments[3];
        var sql="";
        if (exception)
        {
            callback(exception,false);
            return;
        }
        if (userinfo.createdate || userinfo.updatedate)
        {
            callback(new Error("createdate or modifydate should not be included as parameter"), false);
            return;
        }
        try {
            var presql = "update " + TB_USER_INFO + " set updatedate=now(),";
            var datasql = mysqldbOperation.escape(userinfo);
            var wheresql = " where isdeleted=0 and " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA, " and ");
            sql = presql + datasql + wheresql;
           // console.log(sql);
        }
        catch (e){
            exception = e;

        }
        finally
        {
            mysqldbOperation.updateData(exception,callback, sql);
        }
    };
};

/*

 stand_info related

 */

exports.standInfoClass = function() {

    this.createStand = function() //exception,callback, standInfo Json
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standinfo = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        if (standinfo.create_date || standinfo.modify_date)
        {
            callback(new Error("create_date or modify_date should not be included as parameter"), false);
            return;
        }


        var presql = "insert into "+ TB_STAND_INFO + " set create_date=now(),modify_date=now(),";
        mysqldbOperation.insertData(exception, function()
            {
                var err = arguments[0];
                var result = arguments[1];
                if (!err && typeof(result)!="boolean")
                {
                    callback(err,standinfo.stand_Id);
                }
                else
                {
                    callback(err,false);
                }
            }
            ,presql,standinfo);
    };

    this.updateStand = function() //exception ,callback, standinfo, where condition
    {
        var exception =  arguments[0];
        var callback = arguments[1];
        var standinfo = arguments[2];
        var sqlcondition = arguments[3];
        var sql="";
        if (exception)
        {
            callback(exception,false);
            return;

        }
        if (standinfo.create_date || standinfo.modify_date)
        {
            callback(new Error("create_date or modify_date should not be included as parameter"), false);
            return;
        }
        try {
            var presql = "update " + TB_STAND_INFO + " set modify_date=now(),";
            var datasql = mysqldbOperation.escape(standinfo);
            var wheresql = " where isdeleted = 0 and  " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA, " and ");
            sql = presql + datasql + wheresql;
        }
        catch (e)
        {
            exception = e;
        }
        finally
        {
            mysqldbOperation.updateData(exception,callback,sql);
        }
        //console.log(sql);

    };

    this.removeStandLogical = function()//exception. callback, where json condition
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var sqlcondition = arguments[2];
        var sql="";
        if (exception)
        {
            callback(exception,null);
            return;
        }
        try {
            var presql = "update " + TB_STAND_INFO + " set modify_date=now(),";
            var datasql = " isdeleted = 1";
            var wheresql = " where " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA, " and ");
            sql = presql + datasql + wheresql;
        }
        catch (e)
        {
            exception = e;
        }
        finally {
            mysqldbOperation.updateData(exception,callback, sql);
        }
    };

    this.standAddPic = function() //exception, callback, standimages
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standimages = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        if (standimages.create_date || standimages.modify_date)
        {
            callback(new Error("create_date or modify_date should not be included as parameter"), false);
            return;
        }

        var presql = "insert into "+ TB_STAND_IMAGES + " set create_date=now(),";
        //console.log(presql);
        mysqldbOperation.insertData(exception, function()
        {
            var err = arguments[0];
            var result = arguments[1];
            if (!err && typeof(result)!="boolean")
            {
                callback(err,standimages.image_Id);
            }
            else
            {
                callback(err,false);
            }
        },presql,standimages);
    };

    this.standRemovePicLogic = function()//exception, callback, standimages
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standimages = arguments[2];
        var sql ="";
        if (exception)
        {
            callback(exception,false);
            return;
        }
        if (standimages.create_date )
        {
            callback(new Error("create_date should not be included as parameter"), false);
            return;
        }
        try {
            var presql = "update " + TB_STAND_IMAGES + " set ";
            var datasql = " isdeleted = 1 ";
            var wheresql = " where " + (mysqldbOperation.escape(standimages)).replace(CORMMA, " and ");
            sql = presql + datasql + wheresql;
            //console.log(sql);
        }
        catch (e)
        {
            exception = e;
        }
        finally
        {
            mysqldbOperation.updateData(exception,callback,sql);
        }

    };

};

/*

 stand_owner_message related

 */
exports.standCustomerMarkClass = function()
{

    this.checkMarkExistByStandUser = function() //callback, standid, username
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standid = arguments[2];
        var username = arguments[3];
        var sql = "";
        if (exception)
        {
            callback(exception,false);
            return;

        }

        try {
            sql = "select count(mark) as total from "
                + TB_STAND_CUSTOMER_MARK + " where mark is not null and " +
                " isdeleted=0 and " +
                " stand_id=" + mysqldbOperation.escape(standid) +
                " and create_user_name=" + mysqldbOperation.escape(username);
        }
        catch (e)
        {
            exception = e;
        }
        finally
        {
            mysqldbOperation.fetchData(exception,function (err,e) {
                    if (err)
                    {
                        callback(err,false);
                        return;
                    }
                    try {
                        if (e.length && e.length > 0) {
                            if (e[0].total > 0) {
                                callback(err, e[0].total);
                            }
                            else {
                                callback(new Error("Stand mark is invalid (<= 0)"), -1);
                            }
                        }
                        else {
                            callback(new Error("No Mark record or inner default "), false);
                        }
                    }
                    catch(e)
                    {
                        callback(e, false);
                    }
                }
                , sql);
        }
    };

    this.calculateMarkByStand = function() // exception, callback, standid
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standid = arguments[2];
        var sql = "";
        try {
            sql = "select round(AVG(mark)) as avgmark from "
                + TB_STAND_CUSTOMER_MARK + " where mark is not null and " +
                " isdeleted=0 and " +
                " stand_id=" + mysqldbOperation.escape(standid);
        }
        catch(e)
        {
            exception = e;
        }
        finally
        {
            mysqldbOperation.fetchData(exception,function (err,e) {
                    if (err)
                    {
                        callback(err,false);
                        return;
                    }
                    try {
                        if (e.length == 0) {
                            callback(err,-1);
                        }
                        else {
                            callback(err,e[0].avgmark);
                        }
                    }
                    catch (e)
                    {
                        callback(e,false);
                    }
                }
                , sql);
        }
    };

    this.createMarkCommentsWithCheck= function() //exception, callback, CustomerMarkJson
    {
        var innerAddCustomerMark = this.addCustomerMark;
        var exception = arguments[0];
        var callback = arguments[1];
        var customerMark = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        if (customerMark.create_date)
        {
            callback(new Error("create_date should not be included as parameter"), false);
            return;
        }
        this.checkMarkExistByStandUser(exception,
            function(err, e)
            {
               // console.log(customerMark.stand_id);

                if (err)
                {
                    callback(err,e);
                    return;
                }
                try {
                    if (e >= 0) {
                        if (customerMark.mark) {
                            delete customerMark.mark;

                            innerAddCustomerMark(err, callback, customerMark);
                        }
                    }
                    else if (e == -1) {
                        if (customerMark.mark) {
                            innerAddCustomerMark(err, callback, customerMark);
                        }
                        else {
                            callback(new Error("Mark is mandatory"), false);
                        }
                    }
                    else {
                        callback(new Error("checkMarkExistByStandUser inner error"), false);
                    }
                }
                catch(e)
                {
                    callback(e, false);
                }

            }
            ,customerMark.stand_id,customerMark.create_user_name);

    };



    this.addCustomerMark = function()//exception,callback, CustomerMarkJson
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var customerMark = arguments[2];
        var presql = "";
        if (exception)
        {
            callback(exception,false);
            return;

        }
        if (customerMark.create_date)
        {
            callback(new Error("create_date should not be included as parameter"), false);
            return;
        }
        presql = "insert into "+ TB_STAND_CUSTOMER_MARK + " set create_date=now(), ";
        mysqldbOperation.insertData(exception,callback,presql,customerMark);
    };

    this.removeCustomerMarkLogical = function() //exception,callback, customerMark
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var customerMark = arguments[2];
        var sql ="";
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var presql = "update " + TB_STAND_CUSTOMER_MARK + " set ";
        var datasql = " isdeleted = 1 ";
        var wheresql =" where " + (mysqldbOperation.escape(customerMark)).replace(CORMMA," and ");
         sql = presql + datasql + wheresql;
        mysqldbOperation.updateData(exception,callback,sql);
    };
    this.fetchCustomerMarkDataByStandId = function() //exception, callback,standId,offset, pagesize, orderby
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standid = arguments[2];
        var offset = arguments[3];
        var pagesize = arguments[4];
        var orderby = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var sql = "select customer_message_id,stand_id,mark,comments," +
            " create_user_id,create_user_name,create_date "+
            " from " + TB_STAND_CUSTOMER_MARK + " where stand_id=" + mysqldbOperation.escape(standid) +
            " and isdeleted=0" +
            " order by " + orderby +
            " limit " + offset + "," + pagesize ;
        mysqldbOperation.fetchData(exception, callback,sql);
    };

    this.fetchCustomerMarkDataByUsername = function() //callback,username, offset, pagesize, orderby
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var username = arguments[2];
        var offset = arguments[3];
        var pagesize = arguments[4];
        var orderby = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var sql = "select customer_message_id,stand_id,mark,comments," +
            "create_user_id,create_user_name,create_date "+
            "from " + TB_STAND_CUSTOMER_MARK + " where create_user_name=" + mysqldbOperation.escape(username) +
            " and isdeleted=0" +
            " order by " + orderby +
             " limit " + offset + "," + pagesize;
        mysqldbOperation.fetchData(exception,callback,sql);
    };
};

/*

 Stand_User_Link related

 */
exports.standUserLinkClass = function()
{
    this.addSandUserLink = function() //exception,callback,callback standUserLink
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standUserLink = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        if (standUserLink.create_date)
        {
            callback(new Error("create_date should not be included as parameter"), false);
            return;
        }

        var sql = "insert into "+ TB_USER_LINK_STAND + " set create_date=now(), ";
        mysqldbOperation.insertData(callback,sql,standUserLink);
    };

    this.removeSandUserLinkLogic = function() //exception,callback,sandUserLink
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var sandUserLink = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var presql = "update " + TB_USER_LINK_STAND + " set ";
        var datasql = " isdeleted = 1 ";
        var wheresql =" where " + (mysqldbOperation.escape(sandUserLink)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        mysqldbOperation.updateData(exception,callback,sql);
    };

    this.fetchSandUserLinkByStandId = function () //exception,callback, standid, offset, pagesize, orderby
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standId = arguments[2];
        var offset = arguments[3];
        var pagesize = arguments[4];
        var orderby = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var sql = "select b.display_name, b.user_name, b.image_id, b.user_type,b.cell_number," +
            "b.web_chart, b.qq_number, b.province_city_area " +
            " from " + TB_USER_LINK_STAND + " as a left join " + TB_USER_INFO + " as b" +
            " on a.user_id = b.user_id where a.stand_id=" + mysqldbOperation.escape(standId) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by "  + orderby+
            " limit " + offset + "," + pagesize;

        //console.log(sql);
        mysqldbOperation.fetchData(exception,callback,sql);
    };

    this.fetchSandUserLinkByUserId =function() //exception, callback, userid, offset, pagesize,orderby with desc or none
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var userid = arguments[2];
        var offset = arguments[3];
        var pagesize = arguments[4];
        var orderby = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;

        }
        var sql = "select b.stand_id, b.stand_name, b.stand_type, b.creator_type," +
            "b.type_detail_description, b.description, b.create_user_id, " +
            "b.modify_date, b.mark, b.position_x, b.position_y" +
            " from " + TB_USER_LINK_STAND + " as a left join " + TB_STAND_INFO + " as b" +
            " on a.stand_id = b.stand_id where a.user_id=" + mysqldbOperation.escape(userid) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by " + orderby +
            " limit " + offset + "," + pagesize;

        //console.log(sql);
        mysqldbOperation.fetchData(exception,callback,sql);
    };

};

exports.standImageClass = function()
{
      this.createStandImage = function() //exception,callback, standImage Json
      {
          var exception = arguments[0];
          var callback = arguments[1];
          var standImage = arguments[2];
          if (exception)
          {
              callback(exception,false);
              return;

          }
          if (standImage.create_date)
          {
              callback(new Error("create_date should not be included as parameter"), false);
              return;
          }
          var sql = "insert into "+ TB_STAND_IMAGES + " set create_date=now(), ";
          mysqldbOperation.insertData(exception,function()
              {
                  var err = arguments[0];
                  var result = arguments[1];
                  if (err)
                  {
                      callback(err,false);
                      return;

                  }
                  if (!err && typeof(result)!="boolean"){
                      callback(err,standImage.image_id);
                  }
                  else
                  {
                      callback(err,result);
                  }

              }
              ,sql,standImage);
      };
    this.fetchImagesByStandId = function() //exception, callback, standId
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standId = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select stand_id, image_id, create_date, comments" +
            " from " + TB_STAND_IMAGES +
            " where stand_id=" + mysqldbOperation.escape(standId) +
            " and isdeleted=0" +
            " order by create_date desc";
        //console.log(sql);
        mysqldbOperation.fetchData(exception,callback,sql);
    };



};

exports.hashMapClass = function()
{
    this.pushHashCode = function() //exception, callback, hashmap
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var hashMapItem = arguments[2];
        //console.log(hashMapItem);
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "insert into "+ TB_AUTH_KEY_HASHMAP + " set ";
        mysqldbOperation.insertData(exception,function(err,e)
            {
                if (err)
                {
                    callback(err,false);
                    return;
                }
                if (e===false)
                {
                    callback(new Error("pushHashCode - inner Exception"),false);
                }
                else
                {
                    callback(err,hashMapItem.hash_key);
                }

            }
            ,sql,hashMapItem);
    };

    this.checkConflictHashCode = function()//exception,callback, inputHash
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var inputHash = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select hash_key, value " +
            "from " + TB_AUTH_KEY_HASHMAP +
            " where hash_key=" + mysqldbOperation.escape(inputHash);
       // console.log(sql);
        mysqldbOperation.fetchData(exception,function() {
           var err =  arguments[0];
            var result = arguments[1];
            if (err)
            {
                callback(err,false);
                return;
            }
            if (result) {
                if (result.length != 0) {
                    callback(new Error("No key exists"),-1)
                }
                else
                {
                    callback(err,true);
                }
              }
            else {
                callback(new Error("checkConflictHashCode - inner Exception"),result);
            }
        },sql );



    };

    this.matchHashCode = function()//exception, callback, inputHash , output is "key/inputHash" if succeed, else -1
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var inputHash = arguments[2];
        var removeHashCodeInner = this.removeHashCode
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select hash_key, value " +
            "from " + TB_AUTH_KEY_HASHMAP +
            " where hash_key=" + mysqldbOperation.escape(inputHash);
        mysqldbOperation.fetchData(exception,function()
        {
            var err = arguments[0];
           var result = arguments[1];
            if (err)
            {
                callback(err,false);
                return;
            }
            try {
                if (result.length != 0) {
                    //console.log(result);
                    var current_date_ms = (new Date()).getTime();
                    var expired_date_ms = result[0].value;

                    if (current_date_ms <= expired_date_ms) {

                        removeHashCodeInner(err, function () {
                                var innerErr = arguments[0];
                                var delResult = arguments[1];
                                if (innerErr)
                                {
                                    callback(innerErr, false);
                                    return;
                                }
                                if (delResult) {
                                    callback(innerErr,inputHash);
                                }
                                else {
                                    // console.log("false");
                                    callback(new Error("removeHashCodeInner - inner Exception"),false);
                                }
                            }
                            , result[0].hash_key);
                    }
                    else {

                        removeHashCodeInner(err,function () {
                                var innerErr = arguments[0];
                                var delResult = arguments[1];
                                if (delResult) {
                                    callback(null, -1);
                                }
                                else {
                                    callback(new Error("removeHashCodeInner - inner Exception"),false);
                                }
                            }
                            , result[0].hash_key);
                    }
                }
                else {
                    callback(new Error("No key exists"), -1);
                }
            }
            catch (e)
            {
                callback(e,false);
            }
        }
            ,sql);
    };

    this.removeHashCode = function() //exception ,callback, hashkey
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var hashKey = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var presql = "delete from " + TB_AUTH_KEY_HASHMAP;
        var wheresql =" where hash_key=" + mysqldbOperation.escape(hashKey);
        var sql = presql + wheresql;
        //console.log(sql);
        mysqldbOperation.deleteData(exception,callback,sql);
    }
};


exports.standTypeClass = function()
{
    this.fetchStandType = function()//exception, callback
    {
        var exception = arguments[0];
        var callback = arguments[1];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select stand_type_id, type_name " +
            " from " + TB_STAND_TYPE +
            " where isdeleted = 0 ";
        mysqldbOperation.fetchData(exception,callback,sql);

    };
};

exports.instantMessageClass = function()
{

   // TB_INSTANT_MESSAGE

};


exports.standOwnerMessageClass = function() {
    this.createStandOwnerMessage = function ()//exception, callback, standinfo
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standInfo = arguments[2];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        if (standInfo.create_date) {
            callback(new Error("create_date shouldn't be included in parameters "),false);
            return;
        }
        var presql = "insert into " + TB_STAND_OWNER_MESSAGE + " set create_date=now(),";
        mysqldbOperation.insertData(exception,callback, presql, standInfo);

    };

    this.fetchStandOwnerMessageByStandId = function() //exception, callback, standid, offset, pagesize, order
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var standId = arguments[2];
        var offset = arguments[3];
        var pageSize = arguments[4];
        var orderBy = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select stand_owner_message_id,stand_id,message,create_date" +
            " from " + TB_STAND_OWNER_MESSAGE + " where stand_id=" + mysqldbOperation.escape(standId) +
            " and isdeleted=0" +
            " order by " + orderBy +
            " limit " + offset + "," + pageSize ;
        mysqldbOperation.fetchData(exception,callback,sql);
    };

    this.fetchStandOwnerMessageByOwnerId = function() //
    {
        var exception = arguments[0];
        var callback = arguments[1];
        var ownerId = arguments[2];
        var offset = arguments[3];
        var pageSize = arguments[4];
        var orderBy = arguments[5];
        if (exception)
        {
            callback(exception,false);
            return;
        }
        var sql = "select a.stand_owner_message_id,a.stand_id,a.message,a.create_date" +

            " from " + TB_STAND_OWNER_MESSAGE + " as a left join " + TB_STAND_INFO + " as b" +
            " on a.stand_id = b.stand_id where b.create_user_id=" + mysqldbOperation.escape(ownerId) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by "  + orderBy+
            " limit " + offset + "," + pageSize;

        mysqldbOperation.fetchData(exception,callback,sql);


    };
};















