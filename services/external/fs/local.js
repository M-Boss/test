const fs = require('fs');
const path = require('path');

export default class LocalFS{
     moveUploadedFile(file, destination){
         return new Promise((resolve, reject) => {
             file.mv(destination, async function (err) {
                 if (err)
                     reject(err);
                 resolve();
             });
         })
    }
}