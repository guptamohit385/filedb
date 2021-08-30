"use strict";
// global require
let fs = require('fs');
//let fileEncyPrivateKey = "234567ygy78uhi9jNeedstoBeEncryptedasabitofcode5rt78yy8uyh8uiijo";
let logger = require('../util/logger');
let path = require('path');
const _ = require('underscore');
const preDef = ["expirey", "nodeConf"];
const { v4: uuidv4 } = require('uuid');

// constants
let obj = {};
var dir = path.join(__dirname, "../../../data/");

//*********************** Document *************************

obj.find = function(destination, selection, cb) {
	const logToken = uuidv4();
	let finalPath = dir + ((destination)? destination: "collection") + ".json";
	try{
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

obj.save = function(destination, value, cb) {
	let finalPath = dir + ((destination)? destination : "collection") + ".json";
	const logToken = uuidv4();
	if(!Array.isArray(value)){
		value = [value]
	}
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("save.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("save.readFile.from." + finalPath, logToken, "success read");

			let readData;
			function checkExist(itm) {
				let flag = false;
				value.forEach((element, ind) => {					
					if(itm.objID == element.objID){
						flag = true;
					}
				});
				return flag;
			}

			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(!readData.find(checkExist)){
						value.forEach(element => {
							if(!element.objID){
								let objID = new Date().getTime() + Math.round(Math.random() * 10000);
								element.objID = objID;
							}
						});
						readData = [...readData , ...value];
					}
					else{
						logger.info("save.readFile.from." + finalPath, logToken, "already exists");
						return cb("already exists");
					}
				}
			}
			else{
				readData = [...value];
			}

			logger.info("save.readFile.from.array", logToken, readData);

			fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
				if(err){
					logger.error("save.writeFile.from." + finalPath, logToken, err);
					return cb("failed");
				}

				logger.info("save.readFile.from." + finalPath, logToken, "write success");
				return cb(null, "success");
			});
		});
	} catch(ex){
		logger.error("save.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};

obj.update = function(destination, key, value, cb) {
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

obj.removeById = function(destination, key, cb) {
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

obj.removeByKey = function(destination, key, cb) {
	let finalPath = dir + ((destination)? destination: "collection") + ".json";
	const logToken = uuidv4();
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("removeByKey.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
			}

			logger.info("removeByKey.readFile.from." + finalPath, logToken, "success read");

			let readData;
			let filterKey = Object.keys(key)[0]
			function checkExist(itm) {
				return itm[filterKey] == key[filterKey];
			}

			if(result.toString()){
				readData =  JSON.parse(result);
				if(Array.isArray(readData)){
					if(readData.find(checkExist)){
						readData = readData.filter(function(e) { return e[filterKey] !== key[filterKey] });
						logger.info("removeByKey.readFile.from.array", logToken, readData);

						fs.writeFile(finalPath, JSON.stringify(readData), function(err, result){
							if(err){
								logger.error("removeByKey.writeFile.from." + finalPath, logToken, err);
								return cb("failed");
							}
			
							logger.info("removeByKey.readFile.from." + finalPath, logToken, "write success");
							return cb(null, "success");
						});

					}
					else{
						logger.info("removeByKey.readFile.from." + finalPath, logToken, "element not found");
						return cb("removeByKey.element not found");
					}
				}
			}
			else{
				logger.info("removeByKey.readFile.from." + finalPath, logToken, "no element found");
				return cb("no element found");
			}
		});
	} catch(ex){
		logger.error("removeByKey.readFile.from." + finalPath, logToken, ex);
		return cb("failed");
	}
};

obj.delete = function(destination, key, value, cb) {
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
								delete e[setKey];
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

obj.create = function(name,  cb) {
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

obj.deleteDB = function(destination, cb){
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

obj.flushAll = function(destination, cb){
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

obj.addExpire = function(destination, expirey, cb) {
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

//************************* ARRAY (all working)***************************

obj.arrFindAll = function(destination, cb) {
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

obj.arrPush = function(destination, values, cb) {
	let finalPath = dir + ((destination)? destination: "nodeConf") + ".json";
	const logToken = uuidv4();
	if(!Array.isArray(values)){
		values = [values]
	}
	try{
		fs.readFile(finalPath, function(err, result){
			if(err){
				logger.error("arrMultiPush.readFile.from." + finalPath, logToken, err);
				return cb("failed Reading path, have you created");
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
			if(result.toString()){
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

obj.arrPop = function(destination, value, cb) {
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

module.exports = obj;