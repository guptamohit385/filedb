"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');

// constants
var dir = path.join(__dirname, "../../../data/");

exports.find = function(destination, selection, cb) {
	const logToken = uuidv4();
	let finalPath = dir + ((destination)? destination: "collection") + ".json";
	try{
       //const stream = fs.createReadStream(finalPath, {encoding: 'utf8'});

		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("findAll.readFile.from." + finalPath, logToken, err);
				return cb("Error Reading", []);
			}

			logger.info("findAll.readFile.from." + finalPath, logToken, "success read");
			let filterKey = Object.keys(selection)
			function checkExist(itm) {
				return selection[filterKey[0]] == itm[filterKey[0]];
			}
			if(result.toString()){
				if(Object.keys(selection).length == 0){
					return cb(null, JSON.parse(result));
				} else {
					let readData;
					readData =  JSON.parse(result);
					if(Array.isArray(readData)){
						if(readData.find(checkExist)){
							const filteredResults = _.filter(readData, selection);
							return cb(null, filteredResults);
						}
						else{
							logger.info("save.readFile.from." + finalPath, logToken, "no data found");
							return cb(null, []);
						}
					}
				}
			} else {
				logger.info("save.readFile.from." + finalPath, logToken, "no data found");
				return cb(null, []);
			}
		});
	} catch(ex){
		logger.error("findAll.readFile.from." + finalPath, logToken, ex);
		return cb("Error Reading", []);
	}
};