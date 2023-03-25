const fs = require('fs');

exports.fileAccessSync = function fileAccessSync(fname, mode) {
    try {
        fs.accessSync(fname, mode); /*mode: R|W: fs.constants.R_OK | fs.constants.W_OK*/
        return true;
    } catch (err) {
        // console.error(`...zv: access to file: ${fname} fail:`, err);
    }
    return false;
};
