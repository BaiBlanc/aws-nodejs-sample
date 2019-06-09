var AWS = require('aws-sdk');
var fs = require("fs");
var rekognition = new AWS.Rekognition({ region: 'us-east-1' });
var yourBucketName = 'baizheyuan1';
var s3 = new AWS.S3();
atob = require('atob')
btoa = require('btoa')

var bitmap = fs.readFileSync("/Users/bai/Documents/AWS/aws-nodejs-sample/test/painting5.jpeg");
console.log(atob("SGVsbG8sIFdvcmxkIQ=="))

// var params1 = { Bucket: yourBucketName, Key: "painting1.jpeg", Body: bitmap };
// s3.putObject(params1, function (err, data) { });
// var params1 = { Bucket: yourBucketName, Key: "photo1.jpeg", Body: bitmap2 };
// s3.putObject(params1, function (err, data) { });

// const param2 = {
//     "Image": {
//         "S3Object": {
//             "Bucket": "baizheyuan",
//             "Name": "Antibes.jpg"
//         }
//     }
// }
const param1 = {
    Image: {
        //    No need to pass to Base64, 
        //    because it's aotomatically transfered to Base64 after the tag 'Bytes'
        Bytes: bitmap
    },
    // MaxLabels: 10,
    // MinConfidence: 77
};
console.log(bitmap)
console.log(btoa(bitmap.toString()))

rekognition.detectFaces(param1, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        const info = data.FaceDetails
        console.info(JSON.stringify(info))

        const nb_person = info.length
        console.log("You have ", info.length, " person(s)")
        info.forEach(face => {
            console.log(face.BoundingBox.Width, " * ", face.BoundingBox.Height)
            console.log(face.Confidence)
        })
        // var stringData = JSON.stringify(data)
        // stringData = stringData.replace(/,/g, ",\n")
        // var params = {
        //     Body: JSON.stringify(stringData),
        //     Bucket: "baizheyuan",
        //     Key: "haha.txt"
        // };
        // s3.putObject(params, function (err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else console.log(data);           // successful response
        // })
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
