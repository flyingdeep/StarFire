var _pool;
var mysql = require('mysql');
exports.escape = function() {
    var param = arguments[0];
    var result = false;
    if (param) {

        result=mysql.escape(param,false,"local");
}
    return result;

};

exports.initMysqlPool=function() //poolmax,hostVal,userVal,passwordVal
{
	var pool  = mysql.createPool({
	  connectionLimit : arguments[0], //poolmax
	  host            : arguments[1], //hostVal
	  user            : arguments[2], //userVal
	  password        : arguments[3]  //passwordVal
	});
	  _pool = pool;
	  return pool;
};

exports.fetchData = function () //callback, sqlstring,  pool
{
	var pool;
	var result; 
	var message;
    var  callback = arguments[0];
    var sql = arguments[1];
	if (!(pool=arguments[2]) && !(pool = _pool))
	{
        result = false;
        callback(result);
        return;
	}
	pool.getConnection(function(err, connection) {

		if (err)
		{
            throw err;
			// track
			result = false;
            callback(result);
		}
		else
		{
			

			console.log(sql);
			connection.query(sql, function(err, results, fields) {

				if (err)
				{
					// console.error('error connecting: ' + err.stack);
                    throw err;
					// track
					result = false;
                    callback(result);
						
				}
				else
				{
					 //console.log(results[0].newTBcol);
					 result = results;
                    callback(result);
				}
			});
			
			connection.release();
		
		}
		
	});

}

exports.insertData = function() //callback, presql ,input Json, pool
{
    var callback = arguments[0]; //callback
    var preSql =  arguments[1]; //presql
    var insertStatement = arguments[2]; //input Json
	var pool;
	var result; 
	var message;
	if (!(pool=arguments[3]) && !(pool = _pool))
	{
		result =  false;
        callback(result);
        return;
	}

	pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
	if (err)
	{
        throw err;
			result = false;
        callback(result);
	}
	else
	{


	    var sql = preSql+ connection.escape(insertStatement);
        //console.log(sql);
		connection.query(sql, function(err, results) {
			if (err)
			{
                throw err;
				 //console.error('error connecting: ' + err.stack);
                result = false;
                callback(result);
			}
			else
			{
				// console.log(results.insertId);
                result = results.insertId;
               // console.log("success");
                callback(result);
			}
		});
		connection.release();
	}
});

}

exports.deleteData = function() // callback, sqlstr, pool
{
    var pool;
    var result;
    var message;
    var callback = arguments[0];
    var sql = arguments[1];
    if (!(pool=arguments[2]) && !(pool = _pool))
    {
        result = false;
        callback(result);
        return;
    }



    pool.getConnection(function(err, connection) {
        // connected! (unless `err` is set)
        if (err)
        {
            throw err;
            result = false;
            callback(result);
        }
        else
        {


            //console.log(sql);
            connection.query(sql, function(err, results) {

                if (err)
                {
                    throw err;
                    result = false;
                    callback(result);

                }
                else
                {
                    //console.log(results[0].name);
                    result = results.affectedRows;
                    callback(result);
                }
            });

            connection.release();

        }

    });
    //return result;


}



exports.updateData = function() // exception, callback, sqlstr, pool
{
    var exception;
    var pool;
    var result;
    var callback = arguments[0];
    var sql = arguments[1];
    if (!(pool=arguments[2]) && !(pool = _pool))
    {
        result =  false;
        callback(result);
        return;
    }
    pool.getConnection(function(err, connection) {
        // connected! (unless `err` is set)
        if (err)
        {
            exception = err;
            result = false;
            callback(result);
        }
        else
        {


            //console.log(sql);
            connection.query(sql, function(err, results) {

                if (err)
                {
                    // console.error('error connecting: ' + err.stack);
                    throw err;
                    result = false;
                    callback(result);

                }
                else
                {
                    //console.log(results[0].name);
                    result = results.changedRows;
                    callback(result);
                }
            });

            connection.release();

        }

    });
    return result;
}

//connection.end();


