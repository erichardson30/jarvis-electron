/* eslint no-console: 0 */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.development';
import { CronJob } from 'cron';
import axios from 'axios';
import mongoose from 'mongoose';

const app = express();
const compiler = webpack(config);
const PORT = 5000;

const job = new CronJob('00 */29 6-19 * * 1-5', function() {
    console.log("Cron job executed");
    axios.get('https://jarviscsg.herokuapp.com/');
}, function() {
    
}, true, 'America/New_York');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
