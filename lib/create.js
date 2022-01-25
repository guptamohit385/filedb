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

exports.create = function(name,  cb) {
	const logToken = uuidv4();
	if(preDef.includes(name)){
		return cb("Can't name a file name as: " + name + " - predefined_names_error");
	}

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
    let pathConf = dir + name + ".json";
	try{
		fs.access(pathConf, fs.constants.F_OK, function (err) {
			if (err) {
				logger.error("create.fs.access",  logToken, "file not exists");
				fs.appendFile(pathConf, "[]", (er)=>{
					if (er){
						logger.info("create.fs.access",  logToken, {msg: "file ready for append -- Failed", err: er})
						return cb("file ready for append failed");
					}else{
						logger.info("create.fs.access",  logToken, 'file ready for append -- Success');
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