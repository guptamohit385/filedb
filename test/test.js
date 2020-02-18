    let obj = require("../lib/index")
    //************************* ARRAY (all working)***************************

    // obj.arrPush("nodeConf", "192.168.1.1:8082",  "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.arrPop("nodeConf", "192.168.1.1:8082",  "", function(err, result){
    // 	console.log(err,result);
    // });
    
    // obj.arrFindAll("nodeConf",  "", function(err, result){
    // 	console.log(err,result);
    // });
    
    //*********************** Document *************************
    
    // obj.save("collection", {type: "user1", name: "parthu"}, "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.removeById("employee", {objID: 1577183582289}, "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.removeByKey("employee", {type: "user2"}, "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.update("employee", {type: "user"}, {x: "my name is don"}, "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.delete("employee", {type: "user"}, {x: 1}, "", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.find("employee", {type: 'user', salary:3000}, "", function(err, result){
    // 	console.log(err, result);
    // 	//console.log("\n\nresult count ---", result.length);
    // });

    obj.create("collection", "", function(err, result){
    	console.log(err,result);
    });

    // obj.deleteFile("collection", function(err, result){
    // 	console.log(err,result);
    // });

    // obj.flushAll("nodeConf", function(err, result){
    // 	console.log(err,result);
    // });