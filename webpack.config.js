/**
 * Created by guy on 8/16/18.
 */

const webpack = require('webpack')
const path = require('path');


const DIST_DIR = path.resolve(__dirname, 'client/dist');
const CLIENT_DIR = path.resolve(__dirname, 'client');
const SHARED_DIR = path.resolve(__dirname, 'shared');

module.exports = {
    entry: ['./client/src/index.js'],
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [CLIENT_DIR, SHARED_DIR],
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};