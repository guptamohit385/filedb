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

exports.flushAll = function(destination, cb){
	const logToken = uuidv4();
	if(preDef.includes(destination)){
		return cb("Can't name a file name as: " + destination + " - predefined_names_error");
	}
	let pathConf = dir + destination + ".json";
	fs.access(pathConf, fs.constants.F_OK, function (err) {
		if (err) {
			logger.error("flushAll." + pathConf, "file not exists");
			return cb("file not exists");
		} else {
			fs.writeFile(pathConf, "[]", (er)=>{
				if (er){
					logger.error("flushAll.writeFile",  logToken, {msg: "file ready for append -- Failed", err:er})
					return cb("file ready for append failed");
				}else{
					logger.info("flushAll.writeFile",  logToken, 'file flush-- Success');
				  return cb(null, "success");
				}
			});
		}
	}); 
}