var mysql      = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  password : 'root'
//});

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root'
});


//select sample 

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
	if (err)
	{
	}
	else
	{
		var id = 1;
		var code = '110101';
	    var sql = 'SELECT * FROM china_location.area where id=' + connection.escape(id) + ' and code = ' +  connection.escape(code);
		console.log(sql);
		connection.query(sql, function(err, results, fields) {

			if (err)
			{
				 console.error('error connecting: ' + err.stack);
					
			}
			else
			{
				 console.log(results[0].name);	
			}
		});
		
		connection.release();
	
	}


});


//insert sample

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
	if (err)
	{
	}
	else
	{
		var insertStatment = {state:"Shanghai",city:"sh",sz_code:"200021",Rome:"aaaaaadf",zm_code:"1234123"};
	    var sql = 'insert test.china_location set '+ connection.escape(insertStatment);
		console.log(sql);
		connection.query(sql, function(err, results, fields) {

			if (err)
			{
				 console.error('error connecting: ' + err.stack);
					
			}
			else
			{
				 console.log(results.insertId);	
			}
		});
		
		connection.release();
	
	}


});









//connection.end();


