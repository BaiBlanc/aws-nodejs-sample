const AWS = require('aws-sdk')
const fs = require("fs")
const rekognition = new AWS.Rekognition({ region: 'us-east-1' })
const parameters = require("./parameters.json")

const { InputFolders } = parameters
Object.keys(InputFolders).forEach(type => {
    const folder = InputFolders[type]
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.error(err)
        } else {
            files.map(file => {
                if (file.includes(".json")) {
                    // Do nothing with the JSON file
                } else { // Read the image

                    const image = fs.readFileSync(folder + file)

                    // Builde the parameters of Rekogntion
                    const param = {
                        Image: {
                            //    No need to pass to Base64, 
                            //    because it's aotomatically transfered to Base64 after the tag 'Bytes'
                            Bytes: image
                        },
                        MaxLabels: 10,
                        MinConfidence: 77
                    }
                    // Using rekognition APIs for image analysis
                    rekognition.detectLabels(param, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.info("Result of "+file)
                            console.log(data)
                            var stringData = JSON.stringify(data)
                            stringData = stringData.replace(/,/g, ",\n")
                            const fileName = file.replace(/.jpeg/, ".json")
                            fs.writeFile(folder + fileName, stringData, (err) => {
                                if (err) {
                                    console.error(err)
                                }
                            })
                            // Upload object to S3
                        }
                    })
                }

            })
        }
    })
})
