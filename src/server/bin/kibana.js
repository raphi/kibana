#!/usr/bin/env node

var program = require('commander');
var env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
var path = require('path');
var packagePath = path.resolve(__dirname, '..', '..', '..', 'package.json');
if (env !== 'development') {
  packagePath = path.resolve(__dirname, '..', 'package.json');
}
var package = require(packagePath);


program.description('Kibana is an open source (Apache Licensed), browser based analytics and search dashboard for Elasticsearch.');
program.version(package.version);
program.option('-e, --elasticsearch <uri>', 'Elasticsearch instance');
program.option('-c, --config <path>', 'Path to the config file');
program.option('-p, --port <port>', 'The port to bind to', parseInt);
program.option('-q, --quiet', 'Turns off logging');
program.option('-H, --host <host>', 'The host to bind to');
program.option('--plugins <path>', 'Path to scan for plugins');
program.parse(process.argv);

// This needs to be set before the config is loaded. CONFIG_PATH is used to
// override the kibana.yml config path which gets read when the config/index.js
// is parsed for the first time.
if (program.config) {
  process.env.CONFIG_PATH = program.config;
}

// This needs to be set before the config is loaded. PLUGINS_PATH is used to
// set the external plugins folder.
if (program.plugins) {
  process.env.PLUGINS_FOLDER = program.plugins;
}

// Load the config
var config = require('../config');

if (program.elasticsearch) {
  config.elasticsearch = program.elasticsearch;
}

if (program.port) {
  config.port = program.port;
}

if (program.quiet) {
  config.quiet = program.quiet;
}

if (program.host) {
  config.host = program.host;
}


// Load and start the server. This must happen after all the config changes
// have been made since the server also requires the config.
var server = require('../');
server.start();
