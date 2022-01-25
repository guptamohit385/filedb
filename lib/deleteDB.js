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

exports.deleteDB = function(destination, cb){
	const logToken = uuidv4();
	if(preDef.includes(destination)){
		return cb("Can't name a file name as: " + destination + " - predefined_names_error");
	}
	let pathConf = dir + destination + ".json";
	fs.unlink(pathConf, function (err) {
		if (err) throw err;
		// if no error, file has been deleted successfully
		logger.info("deleteFile.fs.unlink",  logToken, 'File deleted!');
		return cb(null, "success");
	}); 
}