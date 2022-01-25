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

exports.update = function(destination, key, value, cb) {
	let finalPath = dir + ((destination)? destination: "collection") + ".json";
	const logToken = uuidv4();
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("update.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("update.readFile.from." + finalPath, logToken, "success read");

			let readData;
			let filterKey = Object.keys(key)[0]
			let setKey = Object.keys(value)[0]
			function checkExist(itm) {
				return itm[filterKey] == key[filterKey];
			}

			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(readData.find(checkExist)){
						readData = readData.filter(function(e) { 
							if(e[filterKey] == key[filterKey]){
								e[setKey] = value[setKey]
								return true
							} else {
								return true
							}
						});
						logger.info("update.readFile.from.array", logToken, readData);

						fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
							if(err){
								logger.error("update.writeFile.from." + finalPath, logToken, err);
								return cb("failed");
							}
			
							logger.info("update.readFile.from." + finalPath, logToken, "write success");
							return cb(null, "success");
						});

					}
					else{
						logger.info("update.readFile.from." + finalPath, logToken, "element not found");
						return cb("update.element not found");
					}
				}
			}
			else{
				logger.info("update.readFile.from." + finalPath, logToken, "no element found");
				return cb("no element found");
			}
		});
	} catch(ex){
		logger.error("update.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};