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

exports.removeById = function(destination, key, cb) {
	let finalPath = dir + ((destination)? destination: "collection") + ".json";
	const logToken = uuidv4();
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("removeById.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("removeById.readFile.from." + finalPath, logToken, "success read");

			let readData;
			function checkExist(itm) {
				return itm.objID == key.objID;
			}

			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(readData.find(checkExist)){
						readData = readData.filter(function(e) { return e.objID !== key.objID });
						logger.info("removeById.readFile.from.array", logToken, readData);

						fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
							if(err){
								logger.error("removeById.writeFile.from." + finalPath, logToken, err);
								return cb("failed");
							}
			
							logger.info("removeById.readFile.from." + finalPath, logToken, "write success");
							return cb(null, "success");
						});

					}
					else{
						logger.info("removeById.readFile.from." + finalPath, logToken, "element not found");
						return cb("removeById.element not found");
					}
				}
			}
			else{
				logger.info("removeById.readFile.from." + finalPath, logToken, "no element found");
				return cb("no element found");
			}
		});
	} catch(ex){
		logger.error("removeById.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};