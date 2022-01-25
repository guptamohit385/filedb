"use strict";

let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');

// constants
var dir = path.join(__dirname, "../../../data/");

//todo
exports.addExpire = function(destination, expirey, cb) {
	let pathConf = dir + destination + ".json";
	const logToken = uuidv4();
	try{
		fs.access(pathConf, fs.constants.F_OK, function (err) {
			if (err) {
				logger.error("addExpire.appendFile",  logToken, "file not exists");
				fs.appendFile(pathConf, "[]", (er)=>{
					if (er){
						logger.error("addExpire.appendFile",  logToken, {msg: "file ready for append -- Failed", err:er})
						return cb("file ready for append failed");
					}else{
					logger.info("addExpire.appendFile",  logToken,  'file ready for append -- Success');
					  return cb(null, "success");
					}
				});
			} else {
				logger.error("create." + pathConf, logToken, "file already exists");
				return cb("file already exists");
			}
		});
	} catch(ex){
		logger.error("create." + pathConf, logToken, ex);
		return cb("failed");
	}
};