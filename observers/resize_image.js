const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    event: "resize_image",
    callback: function (data) {
        const {filename} = data;
        const ext = path.extname(filename);
        const resizedImage = path.join(
            path.dirname(filename),
            path.basename(filename, ext) + "_resized" + ext
        );

        // fs.copyFile(filename, saveOriginalTo, (err) => {
        //     if (err) {
        //         return console.log("Image resize error, error copying original file.")
        //     }

            sharp(filename)
                .resize(1024, 1024, {
                    fit: 'inside',
                })
                .toFile(resizedImage)
                .then(info => {
                    console.log("Image resized successfully.")
                })
                .catch(err => {
                    console.log("Error occurred when resizing image: ", data, err);
                });
        // });
    }
};
