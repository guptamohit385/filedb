# local-json-cache
file system based database and cache system as array based db

## Understanding

with help of file system this is a package for using file as database and cache system as array based db

## Required Environment Variables

CONSOLE_DEBUG=*

## Example
```
    let obj = require("local-json-cache")
    let ID = "uniqueIDTrackingToken"
    //************************* ARRAY's***************************

    obj.arrPush("nodeConf", "192.168.1.1:8082",  "ID", function(err, result){
    	console.log(err,result);
    });

    obj.arrPop("nodeConf", "192.168.1.1:8082",  "ID", function(err, result){
    	console.log(err,result);
    });
    
    obj.arrFindAll("nodeConf",  "ID", function(err, result){
    	console.log(err,result);
    });
    
    //*********************** Document's *************************
    
    obj.save("collection", {type: "user1", name: "parthu"}, "ID", function(err, result){
    	console.log(err,result);
    });

    obj.removeById("collection", {objID: 1577183582289}, "ID", function(err, result){
    	console.log(err,result);
    });

    obj.removeByKey("collection", {type: "user2"}, "ID", function(err, result){
    	console.log(err,result);
    });

    obj.update("collection", {type: "user"}, {x: "my name"}, "ID", function(err, result){
    	console.log(err,result);
    });

    obj.delete("collection", {type: "user"}, {x: 1}, "ID", function(err, result){
    	console.log(err,result);
    });

    obj.find("collection", {type: 'user', salary:3000}, "ID", function(err, result){
    	console.log(err, result);
    	//console.log("\n\nresult count ---", result.length);
    });

    obj.create("collection", "ID", function(err, result){
    	console.log(err,result);
    });

    obj.deleteFile("collection", "ID", function(err, result){
    	console.log(err,result);
    });

    obj.flushAll("collection", "ID", function(err, result){
    	console.log(err,result);
    });
```