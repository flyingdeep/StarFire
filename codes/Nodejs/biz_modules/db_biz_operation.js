// define const
var SCHEMA = "stand.";
var SCHEMA_CONFIG = "config.";
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

var MAX_POOL_THREAD = 50;
var DB_ADDRESS = "localhost";
var DB_USER ="root";
var DB_PASS = "root";
var CORMMA = /\,/g;

var mysqldbOperation = require('./../db_modules/db_mysql_operation.js');

mysqldbOperation.initMysqlPool(MAX_POOL_THREAD,DB_ADDRESS,DB_USER,DB_PASS);

/*
    User_info related
*/
exports.userInfoClass = function()
{
    this.fetchUserByUser = function() //callback,username,password
    {
        var callback = arguments[0];
        var username = arguments[1];
        var password = arguments[2];
        var passwordwheresql = "";
        if (password)
        {
            passwordwheresql = " and password=" + mysqldbOperation.escape(password);

        }

        var sql = "select user_id,user_name,password,display_name," +
            "image_id,user_preference,user_type,cell_number,"+
        "web_chart,qq_number,province_city_area,createdate,updatedate " +
            "from " + TB_USER_INFO + " where user_name=" + mysqldbOperation.escape(username) +
            " and isdeleted=0" + passwordwheresql;
        mysqldbOperation.fetchData(callback,sql);
    };

    this.userIdentityCheck = function() //callback, username
    {
        var callback = arguments[0];
        var username = arguments[1];
        var sql = "select count(user_name) as total from " +
            TB_USER_INFO + " where isdeleted=0 and user_name=" + mysqldbOperation.escape(username);

        mysqldbOperation.fetchData(function(e){
            var result = false;
            if (e[0].total ==0 ) {result = true;}
            callback(result);
        },sql);
    };

    this.createUser = function() //callback, userinfo Json
    {
        var callback = arguments[0];
        var userinfo = arguments[1];
        if (userinfo.createdate || userinfo.updatedate || !userinfo.user_name)
        {
            callback(false);
            return;
        }

        this.userIdentityCheck(function(e){
          if (e)
          {
              var presql = "insert into "+ TB_USER_INFO + " set createdate=now(),updatedate=now(),";
              mysqldbOperation.insertData(callback,presql,userinfo);
          }
            else
          {
              callback(false);
          }
        },userinfo.user_name);
    };

    this.updateUser = function() //callback, userinfo, where condition
    {
        var callback = arguments[0];
        var userinfo = arguments[1];
        var sqlcondition = arguments[2];
        if (userinfo.createdate || userinfo.updatedate)
        {
            callback(false);
            return;
        }
        var presql = "update " + TB_USER_INFO + " set updatedate=now(),";
        var datasql = mysqldbOperation.escape(userinfo);
        var wheresql =" where isdeleted=0 and " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        console.log(sql);
        mysqldbOperation.updateData(callback,sql);
    };
};

/*

 stand_info related

 */

exports.standInfoClass = function() {

    this.createStand = function() //callback, standInfo Json
    {
        var callback = arguments[0];
        var standinfo = arguments[1];
        if (standinfo.create_date || standinfo.modify_date)
        {
            callback(false);
            return;
        }


        var presql = "insert into "+ TB_STAND_INFO + " set create_date=now(),modify_date=now(),";
        mysqldbOperation.insertData(function()
            {
                var result = arguments[0];
                if (typeof(result)!="boolean")
                {
                    callback(standinfo.stand_Id);
                }
            }
            ,presql,standinfo);
    };

    this.updateStand = function() //callback, standinfo, where condition
    {
        var callback = arguments[0];
        var standinfo = arguments[1];
        var sqlcondition = arguments[2];
        if (standinfo.create_date || standinfo.modify_date)
        {
            callback(false);
            return;
        }
        var presql = "update " + TB_STAND_INFO + " set modify_date=now(),";
        var datasql = mysqldbOperation.escape(standinfo);
        var wheresql =" where isdeleted = 0 and  " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        //console.log(sql);
        mysqldbOperation.updateData(callback,sql);
    };

    this.removeStandLogical = function()//callback, where json condition
    {
        var callback = arguments[0];
        var sqlcondition = arguments[1];
        var presql = "update " + TB_STAND_INFO + " set modify_date=now(),";
        var datasql = " isdeleted = 1";
        var wheresql =" where " + (mysqldbOperation.escape(sqlcondition)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        mysqldbOperation.updateData(callback,sql);
    };

    this.standAddPic = function() //callback, standimages
    {
        var callback = arguments[0];
        var standimages = arguments[1];
        if (standimages.create_date || standimages.modify_date)
        {
            callback(false);
            return;
        }

        var presql = "insert into "+ TB_STAND_IMAGES + " set create_date=now(),";
        //console.log(presql);
        mysqldbOperation.insertData(function()
        {
            var result = arguments[0];
            if (typeof(result)!="boolean")
            {
                callback(standimages.image_Id);
            }
        },presql,standimages);
    };

    this.standRemovePicLogic = function()//callback, standimages
    {
        var callback = arguments[0];
        var standimages = arguments[1];
        if (standimages.create_date )
        {
            callback(false);
            return;
        }
        var presql = "update " + TB_STAND_IMAGES + " set ";
        var datasql = " isdeleted = 1 ";
        var wheresql =" where " + (mysqldbOperation.escape(standimages)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        console.log(sql);
        mysqldbOperation.updateData(callback,sql);
    };

};

/*

 stand_owner_message related

 */
exports.standCustomerMarkClass = function()
{

    this.checkMarkExistByStandUser = function() //callback, standid, username
    {
        var callback = arguments[0];
        var standid = arguments[1];
        var username = arguments[2];
        var sql = "select count(mark) as total from "
            + TB_STAND_CUSTOMER_MARK + " where mark is not null and " +
            " isdeleted=0 and " +
            " stand_id=" + mysqldbOperation.escape(standid)+
            " and create_user_name="+ mysqldbOperation.escape(username);
        mysqldbOperation.fetchData(function(e)
            {
                if (e.length > 0)
                {
                    if (e[0].total >0) {
                        callback(e[0].total);
                    }
                    else
                    {
                        callback(-1);
                    }
                }
                else
                {
                    callback(false);
                }
            }
            ,sql);
    };

    this.calculateMarkByStand = function() // callback, standid
    {
        var callback = arguments[0];
        var standid = arguments[1];
        var sql = "select round(AVG(mark)) as avgmark from "
            + TB_STAND_CUSTOMER_MARK + " where mark is not null and " +
            " isdeleted=0 and " +
            " stand_id=" + mysqldbOperation.escape(standid);

        mysqldbOperation.fetchData(function(e)
            {
                if (e.length == 0)
                {
                    callback(-1);
                }
                else if (e.length>0)
                {
                    callback(e[0].avgmark);
                }
                else
                {
                    callback(e);
                }
            }
            ,sql);
    };

    this.createMarkCommentsWithCheck= function() //callback, CustomerMarkJson
    {
        var innerAddCustomerMark = this.addCustomerMark;
        var callback = arguments[0];
        var customerMark = arguments[1];
        if (customerMark.create_date)
        {
            callback(false);
            return;
        }
        this.checkMarkExistByStandUser(
            function(e)
            {
               // console.log(customerMark.stand_id);

                if (e>=0)
                {
                    if(customerMark.mark)
                    {
                        delete customerMark.mark;

                        innerAddCustomerMark(callback,customerMark);
                    }
                }
                else if (e==-1)
                {
                    if(customerMark.mark)
                    {
                        innerAddCustomerMark(callback,customerMark);
                    }
                    else{
                        callback(false);
                    }
                }
                else
                {
                    callback(false);
                }
            }
            ,customerMark.stand_id,customerMark.create_user_name);

    };



    this.addCustomerMark = function()//callback, CustomerMarkJson
    {
        var callback = arguments[0];
        var customerMark = arguments[1];
        if (customerMark.create_date)
        {
            callback(false);
            return;
        }
        var presql = "insert into "+ TB_STAND_CUSTOMER_MARK + " set create_date=now(), ";
        mysqldbOperation.insertData(callback,presql,customerMark);
    };

    this.removeCustomerMarkLogical = function() //callback, customerMark
    {
        var callback = arguments[0];
        var customerMark = arguments[1];
        var presql = "update " + TB_STAND_CUSTOMER_MARK + " set ";
        var datasql = " isdeleted = 1 ";
        var wheresql =" where " + (mysqldbOperation.escape(customerMark)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        mysqldbOperation.updateData(callback,sql);
    };
    this.fetchCustomerMarkDataByStandId = function() //callback,standId,offset, pagesize, orderby
    {
        var callback = arguments[0];
        var standid = arguments[1];
        var offset = arguments[2];
        var pagesize = arguments[3];
        var orderby = arguments[4];
        var sql = "select customer_message_id,stand_id,mark,comments," +
            " create_user_id,create_user_name,create_date "+
            " from " + TB_STAND_CUSTOMER_MARK + " where stand_id=" + mysqldbOperation.escape(standid) +
            " and isdeleted=0" +
            " order by " + orderby +
            " limit " + offset + "," + pagesize ;
        mysqldbOperation.fetchData(callback,sql);
    };

    this.fetchCustomerMarkDataByUsername = function() //callback,username, offset, pagesize, orderby
    {
        var callback = arguments[0];
        var username = arguments[1];
        var offset = arguments[2];
        var pagesize = arguments[3];
        var orderby = arguments[4];
        var sql = "select customer_message_id,stand_id,mark,comments," +
            "create_user_id,create_user_name,create_date "+
            "from " + TB_STAND_CUSTOMER_MARK + " where create_user_name=" + mysqldbOperation.escape(username) +
            " and isdeleted=0" +
            " order by " + orderby +
             " limit " + offset + "," + pagesize;
        mysqldbOperation.fetchData(callback,sql);
    };
};

/*

 Stand_User_Link related

 */
exports.standUserLinkClass = function()
{
    this.addSandUserLink = function() //callback standUserLink
    {

        var callback = arguments[0];
        var standUserLink = arguments[1];
        if (standUserLink.create_date)
        {
            callback(false);
            return;
        }


        var sql = "insert into "+ TB_USER_LINK_STAND + " set create_date=now(), ";
        mysqldbOperation.insertData(callback,sql,standUserLink);
    };

    this.removeSandUserLinkLogic = function() //callback,sandUserLink
    {
        var callback = arguments[0];
        var sandUserLink = arguments[1];
        var presql = "update " + TB_USER_LINK_STAND + " set ";
        var datasql = " isdeleted = 1 ";
        var wheresql =" where " + (mysqldbOperation.escape(sandUserLink)).replace(CORMMA," and ");
        var sql = presql + datasql + wheresql;
        mysqldbOperation.updateData(callback,sql);
    };

    this.fetchSandUserLinkByStandId = function () //callback, standid, offset, pagesize, orderby
    {
        var callback = arguments[0];
        var standId = arguments[1];
        var offset = arguments[2];
        var pagesize = arguments[3];
        var orderby = arguments[4];
        var sql = "select b.display_name, b.user_name, b.image_id, b.user_type,b.cell_number," +
            "b.web_chart, b.qq_number, b.province_city_area " +
            " from " + TB_USER_LINK_STAND + " as a left join " + TB_USER_INFO + " as b" +
            " on a.user_id = b.user_id where a.stand_id=" + mysqldbOperation.escape(standId) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by "  + orderby+
            " limit " + offset + "," + pagesize;

        //console.log(sql);
        mysqldbOperation.fetchData(callback,sql);




    };

    this.fetchSandUserLinkByUserId =function() //callback, userid, offset, pagesize,orderby with desc or none
    {
        var callback = arguments[0];
        var userid = arguments[1];
        var offset = arguments[2];
        var pagesize = arguments[3];
        var orderby = arguments[4];
        var sql = "select b.stand_id, b.stand_name, b.stand_type, b.creator_type," +
            "b.type_detail_description, b.description, b.create_user_id, " +
            "b.modify_date, b.mark, b.position_x, b.position_y" +
            " from " + TB_USER_LINK_STAND + " as a left join " + TB_STAND_INFO + " as b" +
            " on a.stand_id = b.stand_id where a.user_id=" + mysqldbOperation.escape(userid) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by " + orderby +
            " limit " + offset + "," + pagesize;

        console.log(sql);
        mysqldbOperation.fetchData(callback,sql);
    };

};

exports.standImageClass = function()
{
      this.createStandImage = function() //callback, standImage Json
      {
          var callback = arguments[0];
          var standImage = arguments[1];
          if (standImage.create_date)
          {
              callback(false);
              return;
          }
          var sql = "insert into "+ TB_STAND_IMAGES + " set create_date=now(), ";
          mysqldbOperation.insertData(function()
              {
                  var result = arguments[0];
                  if (typeof(result)!="boolean"){
                      callback(standImage.image_id);
                  }
                  else
                  {
                      callback(result);
                  }

              }
              ,sql,standImage);
      };
    this.fetchImagesByStandId = function() //callback, standId
    {
        var callback = arguments[0];
        var standId = arguments[1];

        var sql = "select stand_id, image_id, create_date, comments" +
            " from " + TB_STAND_IMAGES +
            " where stand_id=" + mysqldbOperation.escape(standId) +
            " and isdeleted=0" +
            " order by create_date desc";
        //console.log(sql);
        mysqldbOperation.fetchData(callback,sql);
    };



};

exports.hashMapClass = function()
{
    this.pushHashCode = function() //callback, hashmap
    {
        var callback = arguments[0];
        var hashMapItem = arguments[1];
        //console.log(hashMapItem);

        var sql = "insert into "+ TB_AUTH_KEY_HASHMAP + " set ";
        mysqldbOperation.insertData(function(e)
            {
                if (e===false)
                {
                    callback(false);
                }
                else
                {
                    callback(hashMapItem.hash_key);
                }

            }
            ,sql,hashMapItem);
    };

    this.checkConflictHashCode = function()//callback, inputHash
    {
        var callback = arguments[0];
        var inputHash = arguments[1];
        var sql = "select hash_key, value " +
            "from " + TB_AUTH_KEY_HASHMAP +
            " where hash_key=" + mysqldbOperation.escape(inputHash);
       // console.log(sql);
        mysqldbOperation.fetchData(function() {
            var result = arguments[0];
            if (result) {
                if (result.length != 0) {
                    callback(-1)
                }
                else
                {
                    callback(true);
                }
              }
            else {
                callback(result);
            }
        },sql );



    };

    this.matchHashCode = function()//callback, inputHash , output is "key/inputHash" if succeed, else -1
    {
        var callback = arguments[0];
        var inputHash = arguments[1];
        var removeHashCodeInner = this.removeHashCode
        var sql = "select hash_key, value " +
            "from " + TB_AUTH_KEY_HASHMAP +
            " where hash_key=" + mysqldbOperation.escape(inputHash);
        mysqldbOperation.fetchData(function()
        {
           var result = arguments[0];
           if (result.length != 0)
           {
               //console.log(result);
               var current_date_ms = (new Date()).getTime();
               var expired_date_ms = result[0].value;

               if (current_date_ms<=expired_date_ms)
               {

                   removeHashCodeInner(function()
                   {
                       var delResult = arguments[0];
                       if (delResult)
                       {
                           callback(inputHash);
                       }
                       else
                       {
                          // console.log("false");
                           callback(false);
                       }
                   }
                   ,result[0].hash_key);
               }
               else
               {

                   removeHashCodeInner(function()
                       {
                           var delResult = arguments[0];
                           if (delResult)
                           {
                               callback(-1);
                           }
                           else
                           {
                               callback(false);
                           }
                       }
                       ,result[0].hash_key);
               }
           }
            else
           {
               callback(-1);
           }
        }
            ,sql);
    };

    this.removeHashCode = function() //callback, hashkey
    {
        var callback = arguments[0];
        var hashKey = arguments[1];
        var presql = "delete from " + TB_AUTH_KEY_HASHMAP;
        var wheresql =" where hash_key=" + mysqldbOperation.escape(hashKey);
        var sql = presql + wheresql;
        //console.log(sql);
        mysqldbOperation.deleteData(callback,sql);
    }
};


exports.standTypeClass = function()
{
    this.fetchStandType = function()//callback
    {
        var callback = arguments[0];

        var sql = "select stand_type_id, type_name " +
            " from " + TB_STAND_TYPE +
            " where isdeleted = 0 ";
        mysqldbOperation.fetchData(callback,sql);

    };
};

exports.instantMessageClass = function()
{

   // TB_INSTANT_MESSAGE

};


exports.standOwnerMessageClass = function() {
    this.createStandOwnerMessage = function ()//callback, standinfo
    {
        var callback = arguments[0];
        var standInfo = arguments[1];
        if (standInfo.create_date) {
            callback(false);
            return;
        }
        var presql = "insert into " + TB_STAND_OWNER_MESSAGE + " set create_date=now(),";
        mysqldbOperation.insertData(callback, presql, standInfo);

    };

    this.fetchStandOwnerMessageByStandId = function() //callback, standid, offset, pagesize, order
    {
        var callback = arguments[0];
        var standId = arguments[1];
        var offset = arguments[2];
        var pageSize = arguments[3];
        var orderBy = arguments[4];
        var sql = "select stand_owner_message_id,stand_id,message,create_date" +
            " from " + TB_STAND_OWNER_MESSAGE + " where stand_id=" + mysqldbOperation.escape(standId) +
            " and isdeleted=0" +
            " order by " + orderBy +
            " limit " + offset + "," + pageSize ;
        mysqldbOperation.fetchData(callback,sql);
    };

    this.fetchStandOwnerMessageByOwnerId = function() //
    {
        var callback = arguments[0];
        var ownerId = arguments[1];
        var offset = arguments[2];
        var pageSize = arguments[3];
        var orderBy = arguments[4];
        var sql = "select a.stand_owner_message_id,a.stand_id,a.message,a.create_date" +

            " from " + TB_STAND_OWNER_MESSAGE + " as a left join " + TB_STAND_INFO + " as b" +
            " on a.stand_id = b.stand_id where b.create_user_id=" + mysqldbOperation.escape(ownerId) +
            " and a.isdeleted=0 and b.isdeleted=0" +
            " order by "  + orderBy+
            " limit " + offset + "," + pageSize;

        mysqldbOperation.fetchData(callback,sql);


    };
};















