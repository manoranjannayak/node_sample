'use strict';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let path = '';
        if (file.fieldname == 'profile') {
            path = './src/public/user';
        } 
        callback(null, path);
    },
    filename: (req, file, callback) => {
        const exe = file.originalname.split('.');
        let imageName = Date.now() + '.' + exe[exe.length - 1];
        callback(null, imageName);
    },
});

module.exports.userUploads = multer({
    storage: storage,
}).array('profile');

