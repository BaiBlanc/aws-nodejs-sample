var AWS = require('aws-sdk');
var fs = require("fs");
var rekognition = new AWS.Rekognition({ region: 'us-east-1' });
var yourBucketName = 'baizheyuan1';
var s3 = new AWS.S3();

var bitmap = fs.readFileSync("./painting1.jpeg");
var bitmap2 = fs.readFileSync("./photo1.jpeg");


var params1 = { Bucket: yourBucketName, Key: "painting1.jpeg", Body: bitmap };
s3.putObject(params1, function (err, data) { });
var params1 = { Bucket: yourBucketName, Key: "photo1.jpeg", Body: bitmap2 };
s3.putObject(params1, function (err, data) { });


const param1 = {
    Image: {
        //    No need to pass to Base64, 
        //    because it's aotomatically transfered to Base64 after the tag 'Bytes'
        Bytes: bitmap
    },
    MaxLabels: 10,
    MinConfidence: 77
};

rekognition.detectLabels(param1, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        var stringData = JSON.stringify(data)
        stringData = stringData.replace(/,/g, ",\n")
        var params = {
            Body: JSON.stringify(stringData),
            Bucket: "baizheyuan",
            Key: "haha.txt"
        };
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        })
    }
})
//   var startTime = new Date();
//   rekognition.compareFaces(params, function(err, data) {
//     if (err){ 
//         console.log("ERR:"+err); // an error occurred
//         console.log("ERRSTACK"+err.stack); // an error occurred
//     }
//     else{
//       var EndTime = new Date();
//       var runTime = EndTime.getTime() - startTime.getTime();
//       console.log(runTime);           // successful response
//       console.info(data);
//     }  
//   });
