"use strict";
const util = require('util');
const { promisify } = util;

const { find } = require("./find");
const { update } = require("./update");
const { save } = require("./save");
const { create } = require("./create");
const funcDel = require("./delete");
const { removeById } = require("./removeById");
const { deleteDB } = require("./deleteDB");
const { flushAll } = require("./flushAll");
const { addExpire } = require("./addExpire");
const { removeByKey } = require("./removeByKey")

const { arrFindAll } = require("./arrFindAll");
const { arrPush } = require("./arrPush");
const { arrPop } = require("./arrPop");

module.exports = {
    find,
    update,
    save,
    create,
    flushAll,
    addExpire,
    arrFindAll,
    arrPush,
    arrPop,
    deleteDB,
    removeById,
    removeByKey,
    delete: funcDel.delete,
    findPromise: promisify(find),
    updatePromise: promisify(update),
    savePromise: promisify(save),
    createPromise: promisify(create),
    flushAllPromise: promisify(flushAll),
    addExpirePromise: promisify(addExpire),
    arrFindAllPromise: promisify(arrFindAll),
    arrPushPromise: promisify(arrPush),
    arrPopPromise: promisify(arrPop),
    deleteDBPromise: promisify(deleteDB),
    removeByIdPromise: promisify(removeById),
    removeByKeyPromise: promisify(removeByKey),
    deletePromise: promisify(funcDel.delete)
};