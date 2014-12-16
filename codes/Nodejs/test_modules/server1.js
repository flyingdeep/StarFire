var restify = require('restify');
var cors = require("cors");

function respondGet(req, res, next) {
    console.log("4");
    var result = req.query["par1"];
    console.log(result);
      res.json(201,
       {result1:req.params.version
         });
       next();
}

function respondPost(req, res, next) {
    console.log("4");
    var result = req.params.par2;
    console.log(result);
    res.json(201,
        {result1:req.params.version
        });
    next();
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.get('/test/:version',cors(), respondGet);
server.post('/test/:version',cors(), respondPost);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});