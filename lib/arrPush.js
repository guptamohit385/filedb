"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');

const { v4: uuidv4 } = require('uuid');
const prs = require("./create")

// constants
var dir = path.join(__dirname, "../../../data/");

exports.arrPush = function(destination, values, cb) {
	let finalPath = dir + ((destination)? destination: "nodeConf") + ".json";
	const logToken = uuidv4();
	if(!Array.isArray(values)){
		values = [values]
	}
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("arrMultiPush.readFile.from." + finalPath, logToken, err);
				prs.create(finalPath, (crErr)=> {
					if(crErr){
						return cb("failed Reading path, we have created for you now try again");
					}
				})
			}

			logger.info("arrMultiPush.readFile.from." + finalPath, logToken, "success read");
			let readData;
			function checkExist(itm) {
				let flag = false;
				values.forEach(element => {
					if(itm == element){
						flag = true;
					}
				});
				return flag;
			}
			if(result && result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(!readData.find(checkExist)){
						readData = [...readData , ...values];
					}
					else{
						logger.info("arrMultiPush.readFile.from." + finalPath, logToken, "already exists");
						return cb("already exists one of item");
					}
				}
			}
			else{
				readData = [...values];
			}

			logger.info("arrMultiPush.readFile.from.array", logToken, readData);

			fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
				if(err){
					logger.error("arrMultiPush.writeFile.from." + finalPath, logToken, err);
					return cb("failed");
				}

				logger.info("arrMultiPush.readFile.from." + finalPath, logToken, "write success");
				return cb(null, "success");
			});
		});
	} catch(ex){
		logger.error("arrMultiPush.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};