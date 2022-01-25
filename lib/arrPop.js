"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');

const { v4: uuidv4 } = require('uuid');

// constants
var dir = path.join(__dirname, "../../../data/");

exports.arrPop = function(destination, value, cb) {
	let finalPath = dir + ((destination)? destination: "nodeConf") + ".json";
	const logToken = uuidv4();
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("arrPop.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("arrPop.readFile.from." + finalPath, logToken, "success read");
			let readData;
			function checkExist(itm) {
  				return itm == value;
			}
			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(readData.find(checkExist)){

						readData = readData.filter(function(e) { return e !== value });

						logger.info("arrPop.readFile.from.array", logToken, readData);

						fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
							if(err){
								logger.error("arrPop.writeFile.from." + finalPath, logToken, err);
								return cb("failed");
							}

							logger.info("arrPop.readFile.from." + finalPath, logToken, "write success");
							return cb(null, "success");
						});
					}
					else{
						logger.info("arrPop.readFile.from." + finalPath, logToken, "element not found");
						return cb("element not found");
					}
				}
			}
			else{
				logger.info("arrPop.readFile.from." + finalPath, logToken, "no element found");
				return cb("no element found");
			}
		});
	} catch(ex){
		logger.error("arrPop.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};