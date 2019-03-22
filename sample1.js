var AWS = require('aws-sdk');
var fs = require("fs");
var rekognition = new AWS.Rekognition({ region: 'us-east-1' });
var yourBucketName = 'baizheyuan1';
var s3 = new AWS.S3();

var bitmap = fs.readFileSync("./painting1.jpeg");
var bitmap2 = fs.readFileSync("./photo1.jpeg");

const data1 = bitmap.toString('base64');

var params1 = { Bucket: yourBucketName, Key: "painting1.jpeg", Body: bitmap };
s3.putObject(params1, function (err, data) { });
var params1 = { Bucket: yourBucketName, Key: "photo1.jpeg", Body: bitmap2 };
s3.putObject(params1, function (err, data) { });

//   var params = {
//       SimilarityThreshold: 85, 
//       SourceImage: {
//  //       Bytes:bitmap
//         S3Object: {
//           Bucket: yourBucketName, 
//           Name: "painting1.jpeg"
//         }
//       }, 
//       TargetImage: {
//    //       Bytes:bitmap2
//         S3Object: {
//           Bucket: yourBucketName, 
//           Name: "photo1.jpeg"
//         }
//       }
//   };

const param1 = {
    Image: {
        //       Base64: data1
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
