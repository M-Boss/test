const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = class AWSFS {
    constructor(config){
        this.config = config;
    }

    //file: express-fileupload File object
    moveUploadedFile(file, destinationFilename) {
        return new Promise((resolve, reject) => {
            const localUploadDirectory = this.config.get('app.localUploadDirectory');
            const bucket = this.config.get('aws.uploadBucket');

            const s3 = new AWS.S3();
            const params = {
                Bucket: bucket,
                Body : _.get(file, 'data'),
                Key : destinationFilename,
                ACL: 'public-read'
            };
            console.log("Uploading to s3...");
            s3.upload(params, function (err, data) {
                if (err) {
                    console.log("Error uploading to s3", err);
                    return reject(err);
                }

                if (data) {
                    console.log("Uploaded in:", data.Location);
                    resolve(data.Location);
                }
                else{
                    console.log('aws upload - no data!');
                    resolve("")
                }
            });
        })
    }

    // filename: object key
    removeFile(filename) {
        return new Promise((resolve, reject) => {
            const bucket = this.config.get('aws.uploadBucket');

            const s3 = new AWS.S3();
            const params = {
                Bucket: bucket,
                Key : filename,
            };
            console.log("Deleting object...");
            s3.deleteObject(params, function(err, data) {
                if (err) {
                    console.log("Error uploading to s3", err);
                    return reject(err);
                }
                else{
                    console.log('aws object removal successful');
                    resolve("")
                }
            });
        })
    }
};