"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');
const preDef = ["expirey", "nodeConf"];
const { v4: uuidv4 } = require('uuid');

// constants
var dir = path.join(__dirname, "../../../data/");

exports.save = function(destination, value, cb) {
	let finalPath = dir + ((destination)? destination : "collection") + ".json";
	const logToken = uuidv4();
	if(!Array.isArray(value)){
		value = [value]
	}
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("save.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("save.readFile.from." + finalPath, logToken, "success read");

			let readData;
			function checkExist(itm) {
				let flag = false;
				value.forEach((element, ind) => {					
					if(itm.objID == element.objID){
						flag = true;
					}
				});
				return flag;
			}

			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(!readData.find(checkExist)){
						value.forEach(element => {
							if(!element.objID){
								let objID = new Date().getTime() + Math.round(Math.random() * 10000);
								element.objID = objID;
							}
						});
						readData = [...readData , ...value];
					}
					else{
						logger.info("save.readFile.from." + finalPath, logToken, "already exists");
						return cb("already exists");
					}
				}
			}
			else{
				readData = [...value];
			}

			logger.info("save.readFile.from.array", logToken, readData);

			fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
				if(err){
					logger.error("save.writeFile.from." + finalPath, logToken, err);
					return cb("failed");
				}

				logger.info("save.readFile.from." + finalPath, logToken, "write success");
				return cb(null, "success");
			});
		});
	} catch(ex){
		logger.error("save.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};
