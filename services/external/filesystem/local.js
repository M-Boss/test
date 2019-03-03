const fs = require('fs');
const path = require('path');

module.exports = class LocalFS {
    constructor(config){
        this.config = config;
    }

    //file: express-fileupload File object
    moveUploadedFile(file, destinationFilename) {
        const localUploadDirectory = this.config.get('app.localUploadDirectory');
        const destination = path.join(localUploadDirectory, destinationFilename);

        return new Promise((resolve, reject) => {
            file.mv(destination, async function (err) {
                if (err)
                    reject(err);
                resolve(destination);
            });
        })
    }

    //filename: not the full path
    removeFile(filename) {
        const localUploadDirectory = this.config.get('app.localUploadDirectory');
        const destination = path.join(localUploadDirectory, filename);
        fs.unlinkSync(destination);
    }
};