/**
 * Created by guy on 3/3/19.
 */
// dependencies
const async = require('async');
const AWS = require('aws-sdk');
const sharp = require('sharp');
const util = require('util');

const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey =
        decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var dstBucket = srcBucket + "-resized";
    var dstKey = srcKey;

    // Infer the image type.
    var typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
        callback("Could not determine the image type.");
        return;
    }
    var imageType = typeMatch[1];
    if (imageType != "jpg" && imageType != "png") {
        callback('Unsupported image type: ${imageType}');
        return;
    }

    // Download the image from S3, transform, and upload to a different S3 bucket.
    async.waterfall([
            function download(next) {
                // Download the image from S3 into a buffer.
                s3.getObject({
                        Bucket: srcBucket,
                        Key: srcKey
                    },
                    next);
            },
            function transform(response, next) {
                const image = sharp(response.Body);
                image.metadata().then(function (metadata) {
                    if (metadata && metadata.width < 1024 && metadata.height < 1024) {
                        //dont resize, just upload
                        console.log('no resize needed');
                        next(null, response.ContentType, response.Body);
                    }
                    else {
                        image.resize(1024, 1024, {
                            fit: 'inside',
                        })
                            .toBuffer()
                            .then(buffer => {
                                console.log("Image resized successfully.");
                                next(null, response.ContentType, buffer);
                            })
                            .catch(err => {
                                console.log("Error occurred when resizing image: ", data, err);
                                next(err);
                            });
                    }
                });

            },
            function upload(contentType, data, next) {
                // Stream the transformed image to a different S3 bucket.
                s3.putObject({
                        Bucket: dstBucket,
                        Key: dstKey,
                        Body: data,
                        ContentType: contentType,
                        ACL: 'public-read'
                    },
                    next);
            }
        ], function (err) {
            if (err) {
                console.error(
                    'Unable to resize ' + srcBucket + '/' + srcKey +
                    ' and upload to ' + dstBucket + '/' + dstKey +
                    ' due to an error: ' + err
                );
            } else {
                console.log(
                    'Successfully resized ' + srcBucket + '/' + srcKey +
                    ' and uploaded to ' + dstBucket + '/' + dstKey
                );
            }

            callback(null, "Resize successful");
        }
    );
};
