# local-json-cache (Powered by kvertex.com)

File system as database (mongodb) with query used for cache

## Understanding

With help of file system this is a package for

1) Using file as database (query same as mongodb)
2) Cache system as array based db
3) Creates a folder name data in your local and fileName for its operations

## Index Document operations

1) create Document
2) save New Document
3) find Document
4) update Document
5) delete Document
6) removeById Document
7) removeByKey Document
8) flushAll Document
9) deleteDB Document

## Index List operations

1) arrPush List
2) arrPop List
3) arrFindAll List

## Required Environment Variables

CONSOLE_DEBUG=*

## Example (JSON DB)

```JS
    //*********************** Document's *************************

    let obj = require("local-json-cache");
    const filename = "collection";

    // Create a new Document (similar to table)
    obj.create("collection", (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.createPromise("collection");

    //**************** CRUD ********************

    // Insert your first record / collection / entry (Create new record)
    obj.save("collection", {type: "user1", name: "parthu"}, (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.savePromise("collection", {type: "user1", name: "parthu"});

    // Find your records (Retrive)
    obj.find("collection", {type: 'user', salary:3000}, (err, result) => {
        console.log(err, result); // null {...}
    });

    // ---- ES6 Version - use with async function------
    await obj.findPromise("collection", {});

    // Update your data / record
    obj.update("collection", {type: "user"}, {x: "my name"}, (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.updatePromise("collection", {type: "user"}, {x: "my name"});

    // Delete your data / record
    obj.delete("collection", {type: "user"}, {x: 1}, (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.deletePromise("collection", {type: "user"}, {x: 1});

    // Delete your data / record by its Unique Id
    obj.removeById("collection", {objID: 1577183582289}, (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.removeByIdPromise("collection", {objID: 1577183582289});

    // Delete your data / record by its any key value
    obj.removeByKey("collection", {type: "user2"}, (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.removeByKeyPromise("collection", {type: "user2"});

    // Delete all your data / record from document
    obj.flushAll("collection", (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.flushAllPromise("collection");

    // Delete your Document
    obj.deleteDB("collection", (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.deleteDBPromise("collection");

```

## Example (For Arrays)

```JS
    let obj = require("local-json-cache");
    const fileName = "nodeConf"; // Used as reference of you file / document
    //************************* ARRAY's***************************

    // bulk Insert as Array
    obj.arrPush(fileName, ["item1", "item2"],  (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.arrPushPromise("collection", ["item1", "item2"]);

    // Insert as Array
    obj.arrPush(fileName, "item1", (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.arrPushPromise("collection", "item1");

    // Delete Array item
    obj.arrPop(fileName, "item1", (err, result) => {
        console.log(err,result); // null 'success'
    });

    // ---- ES6 Version - use with async function------
    await obj.arrPopPromise("collection", "item1");

    // Get all Data
    obj.arrFindAll(fileName, (err, result) => {
        console.log(err,result); // null ["item1", "item2"]
    });

    // ---- ES6 Version - use with async function------
    await obj.arrFindAllPromise("collection");
```
