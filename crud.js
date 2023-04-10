var admin = require("firebase-admin");
var serviceAccount = require("./../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-916ab-default-rtdb.asia-southeast1.firebasedatabase.app"
});


const { getDatabase } = require('firebase-admin/database')
const db = getDatabase();

var date = new Date();
date.setUTCHours(date.getUTCHours() + 8);
time_str = date.toUTCString();
var time = time_str.substr(12,4)+ '-'+ time_str.substr(8,3)+'-'+ time_str.substr(5,2) + '-' + time_str.substr(17,8)
//console.log(time);

// Write data into realtime database by set == POST, will rewrite all data  

exports.createData = (obj, data) => {
    db.ref(`/car/${obj}/${time}`).set(data)
    .then(function () {
        console.log("建立成功");
    })
    .catch(function () {
        console.log("伺服器發生錯誤，請稍後再試");
    });

    db.ref(`/car/${obj}/last`).set(data);
}

// Update existed data, if can't find the ID, create data
 
exports.updateData = (obj, data) =>{
    db.ref(`/car/${obj}/${time}`).update(data)
    .then(function () {
        console.log("更新成功");
    })
    .catch(function () {
        console.log("伺服器發生錯誤，請稍後再試");
    });
}

// Push data, record emergency event
// 自帶一個隨機產生(依據時間排序)的 key
 
exports.quickRecord = (obj, record) =>{
    db.ref(`/car/${obj}`).push(record)
    .then(function () {
        console.log("紀錄成功");
    })
    .catch(function () {
        console.log("伺服器發生錯誤，請稍後再試");
    });

    db.ref(`/car/${obj}/last`).set(record);
}

 // Delete data: set or remove
exports.removeID = (obj) => {
    db.ref(`/car/${obj}/${time}`).remove()
    .then(function () {
        console.log("刪除成功");
    })
    .catch(function () {
        console.log("伺服器發生錯誤，請稍後再試");
    });
}


// Read data, 因為這是非同步事件，所以想要對取得的資料進行後續操作時，記得寫在 callback function 中
// once 取得一次

exports.readAll = (obj) =>{
    db.ref(`/car/${obj}`).once('value',function (snapshot){
        var data = snapshot.val();
        console.log(data);
    })
}

exports.readFirst = (obj) =>{
    db.ref(`/car/${obj}`).limitToFirst(1).once('value',function (snapshot){
        var data = snapshot.val();
        console.log(data);
    })
}

exports.readNew = (obj) =>{
    db.ref(`/car/${obj}`).limitToLast(1).once('value',function (snapshot){
        var data = snapshot.val();
        console.log(data);
        return data;
    })
 
}

// on 會即時更新，也就是只要資料庫一變動，就會抓取到最新資料。

exports.monitorAll = (obj) =>{
    db.ref(`/car/${obj}`).on('value', function (snapshot) {
        console.log(snapshot.val());
    }); 
}

// on 會即時更新，也就是只要資料庫一變動，就會抓取到最新資料。

exports.monitorNew = (obj) =>{
    db.ref(`/car/${obj}`).limitToLast(1).on('value', function (snapshot) {
        console.log(snapshot.val());
    }); 
}