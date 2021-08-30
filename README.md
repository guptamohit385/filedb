# local-json-cache (Powered by kvertex.com)
file system based database and cache system as array based db

## Understanding

With help of file system this is a package for

1) Using file as database (query same as mongodb)
2) Cache system as array based db

## Required Environment Variables

CONSOLE_DEBUG=*

## Example (For Arrays)

```JS
    let obj = require("local-json-cache")
    //************************* ARRAY's***************************

    // supports bulk Insert
    obj.arrPush("nodeConf", ["192.168.1.1:8082", "192.168.1.1:8082"...],  function(err, result){
        console.log(err,result);
    });

    obj.arrPush("nodeConf", "192.168.1.1:8082", function(err, result){
        console.log(err,result);
    });

    obj.arrPop("nodeConf", "192.168.1.1:8082", function(err, result){
        console.log(err,result);
    });

    obj.arrFindAll("nodeConf", function(err, result){
        console.log(err,result);
    });
```

## Example (JSON DB)

```JS
    //*********************** Document's *************************

    let obj = require("local-json-cache")
    // Create a new Document (similar to table)
    obj.create("collection", function(err, result){
        console.log(err,result);
    });

    //**************** CRUD ********************

    // Insert your first record / collection / entry (Create new record)
    obj.save("collection", {type: "user1", name: "parthu"}, function(err, result){
        console.log(err,result);
    });

    // Find your records (Retrive)
    obj.find("collection", {type: 'user', salary:3000}, function(err, result){
        console.log(err, result);
    });

    // Update your data / record
    obj.update("collection", {type: "user"}, {x: "my name"}, function(err, result){
        console.log(err,result);
    });

    // Delete your data / record
    obj.delete("collection", {type: "user"}, {x: 1}, function(err, result){
        console.log(err,result);
    });

    // Delete your data / record by its Unique Id
    obj.removeById("collection", {objID: 1577183582289}, function(err, result){
        console.log(err,result);
    });

    // Delete your data / record by its any key value
    obj.removeByKey("collection", {type: "user2"}, function(err, result){
        console.log(err,result);
    });

    // Delete all your data / record from document
    obj.flushAll("collection", function(err, result){
        console.log(err,result);
    });

    // Delete your Document
    obj.deleteDB("collection", function(err, result){
        console.log(err,result);
    });

```
