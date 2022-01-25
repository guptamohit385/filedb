    let obj = require("../lib/index");
    const myCollection = "collection";

    // console.log(obj)
    
    //*********************** Test 1 Document *************************

    // obj.create(myCollection, function(err, result){
    // 	console.log(err,result);
    // });
    
    // obj.save(myCollection, {type: "user1", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.find(myCollection, {type: "user1"},  function(err, result){
    // 	console.log(err, result);
    // });

    obj.find(myCollection, {},  function(err, result){
    	console.log(err, result);
    });

    // async function calling(){
    //     let data = await obj.findPromise(myCollection, {});
    //     console.log(data)
    // }

    // calling();


    // obj.update(myCollection, {type: "user1"}, {x: "my name is don"},  function(err, result){
    // 	console.log(err,result);
    // });


    //*********************** Test 2 Document *************************

    // obj.save(myCollection, {type: "user2", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.removeByKey(myCollection, {type: "user2"},  function(err, result){
    // 	console.log(err,result);
    // });

    //*********************** Test 3 Document *************************

    // obj.save(myCollection, {type: "user3", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.removeById(myCollection, {objID: 1631639414725},  function(err, result){
    // 	console.log(err,result);
    // });

    //*********************** Test 4 Document *************************

    // obj.save(myCollection, {type: "user4", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.delete(myCollection, {"name":"parthu"}, {x: 1},  function(err, result){
    // 	console.log(err,result);
    // });

    //*********************** Test 5 Document *************************

    // obj.save(myCollection, {type: "user5", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.flushAll(myCollection, function(err, result){
    // 	console.log(err,result);
    // });


    //*********************** Test 6 Document  (TODO) *************************

    // obj.save(myCollection, {type: "user6", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.addExpire(myCollection, function(err, result){
    // 	console.log(err,result);
    // });

    //*********************** Test 5 Document *************************

    // obj.save(myCollection, {type: "user7", name: "parthu"}, function(err, result){
    // 	console.log(err,result);
    // });

    // obj.deleteDB(myCollection, function(err, result){
    // 	console.log(err,result);
    // });

    //************************* ARRAY (all working)***************************

    // obj.arrPush("nodeConf", "192.168.1.1:8082",   function(err, result){
    // 	console.log(err,result);
    // });

    // obj.arrPop("nodeConf", "192.168.1.1:8082", function(err, result){
    // 	console.log(err,result);
    // });
    
    // obj.arrFindAll("nodeConf",   function(err, result){
    // 	console.log(err,result);
    // });