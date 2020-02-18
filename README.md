# cachedb
file system based database and cache system as array based db

## Understanding

with help of file system this is a package for using file as database and cache system as array based db

## Example
```
    let obj = require("cachedb")
    //************************* ARRAY's***************************

    obj.arrPush("nodeConf", "192.168.1.1:8082",  "", function(err, result){
    	console.log(err,result);
    });

    obj.arrPop("nodeConf", "192.168.1.1:8082",  "", function(err, result){
    	console.log(err,result);
    });
    
    obj.arrFindAll("nodeConf",  "", function(err, result){
    	console.log(err,result);
    });
    
    //*********************** Document's *************************
    
    obj.save("collection", {type: "user1", name: "parthu"}, "", function(err, result){
    	console.log(err,result);
    });

    obj.removeById("collection", {objID: 1577183582289}, "", function(err, result){
    	console.log(err,result);
    });

    obj.removeByKey("collection", {type: "user2"}, "", function(err, result){
    	console.log(err,result);
    });

    obj.update("collection", {type: "user"}, {x: "my name"}, "", function(err, result){
    	console.log(err,result);
    });

    obj.delete("collection", {type: "user"}, {x: 1}, "", function(err, result){
    	console.log(err,result);
    });

    obj.find("collection", {type: 'user', salary:3000}, "", function(err, result){
    	console.log(err, result);
    	//console.log("\n\nresult count ---", result.length);
    });

    obj.create("collection", "", function(err, result){
    	console.log(err,result);
    });

    obj.deleteFile("collection", function(err, result){
    	console.log(err,result);
    });

    obj.flushAll("collection", function(err, result){
    	console.log(err,result);
    });
```