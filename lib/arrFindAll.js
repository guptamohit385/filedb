"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');

const { v4: uuidv4 } = require('uuid');

// constants
var dir = path.join(__dirname, "../../../data/");

exports.arrFindAll = function(destination, cb) {
	const logToken = uuidv4();
	let finalPath = dir + ((destination)? destination: "nodeConf") + ".json";
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("findAll.readFile.from." + finalPath, logToken, err);
				return cb("Something went wrong", []);
			}

			logger.info("findAll.readFile.from." + finalPath, logToken, "success read");

			if(result.toString()){
				return cb(null, JSON.parse(result));
			}else{
				return cb(null, []);
			}
		});
	} catch(ex){
		logger.error("findAll.readFile.from." + finalPath, logToken, ex);
		return cb("Something went wrong",[]);
	}
};