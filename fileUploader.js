const fs = require("fs")
const AWS = require('aws-sdk')
const parameters = require("./parameters.json")

const {OutputBucket: {BucketName}, } = parameters
const uploadFile =(data) => {
    
        var params = {
            Body: JSON.stringify(data),
            Bucket: BucketName,
            Key: "haha.txt"
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack) // an error occurred
            else{
                console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
                 // successful response
            } 
        })
}
// Create params for putObject call
var objectParams = { Bucket: "baizheyuan", Key: "Paintings/p1.json", Body: 'Hello World!' };
// Create object upload promise
var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
uploadPromise.then(
    function (data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        }
    )
