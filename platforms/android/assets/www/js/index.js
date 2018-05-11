/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById("picCapture").addEventListener("click",imageCapture);
        document.getElementById("videoCapture").addEventListener("click",videoCapture);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
//捕捉图像
function imageCapture(){
    console.log("onclick image");
    
    navigator.device.capture.captureImage(onSuccess,onError,{limit:1})
    function onSuccess(mediaFiles){
        for(var i=0;i<mediaFiles.length;i++){
            var path=mediaFiles[i].fullPath;
            console.log(path);
        }
    }
    function onError(error){
        console.log(error.code);
    }
    
}
document.getElementById("SQLiteQueryAdd").onclick=function addData(){
    var db = window.sqlitePlugin.openDatabase({ name: 'my2.db', location: 'default' }, function (db) {

        // Here, you might create or open the table.
        console.log('open database OK');
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });

    //创建数据表
    var inputName=document.getElementById("userInput");
    var inputScore=document.getElementById("userScore");
    db.transaction(function (tx) {
        // ...
       tx.executeSql('CREATE TABLE IF NOT EXISTS ScoreTable (name, score)');
       tx.executeSql('INSERT INTO ScoreTable VALUES (?,?)', [inputName.value, inputScore.value]);
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}
document.getElementById("SQLiteQuery").onclick=function queryData(){
    var db = window.sqlitePlugin.openDatabase({ name: 'my2.db', location: 'default' }, function (db) {

        // Here, you might create or open the table.
        console.log('open database OK');
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
    db.transaction(function (tx) {
         var query = "SELECT * FROM ScoreTable";
         tx.executeSql(query, [], function (tx, resultSet) {
            var resultString="";
            for(var x = 0; x < resultSet.rows.length; x++) {
                resultString=resultString+"    Name: " + resultSet.rows.item(x).name +
                                                              ", Score: " + resultSet.rows.item(x).score+"\r\n";

            }
            alert(resultString);
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}

document.getElementById("voiceTotext").onclick=function voiceTotext(){
    xunfeiListenSpeaking.startListen(function(data){
    },function(error){
    console.log(error);
    },true,true);
}
document.getElementById("locationYou").onclick=function locationYou(){

                    //定位数据获取成功响应
                    var onSuccess = function(position) {
                        alert('纬度: '          + position.coords.latitude          + '\n' +
                              '经度: '         + position.coords.longitude         + '\n' +
                              '海拔: '          + position.coords.altitude          + '\n' +
                              '水平精度: '          + position.coords.accuracy          + '\n' +
                              '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
                              '方向: '           + position.coords.heading           + '\n' +
                              '速度: '             + position.coords.speed             + '\n' +
                              '时间戳: '         + position.timestamp                + '\n');
                    };

                    //定位数据获取失败响应
                    function onError(error) {
                        alert('code: '    + error.code    + '\n' +
                              'message: ' + error.message + '\n');
                    }

                    //开始获取定位数据
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
document.getElementById("locationBaidu").onclick=function locationBaidu(){
          baidumap_location.getCurrentPosition(function (result) {
            var latitude=result.latitude;
            var lontitude=result.lontitude;
           alert('经度： '+lontitude+"\n"+
           "纬度： "+latitude);
          }, function (error) {

          });
}