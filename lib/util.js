const path = require('path');

const rootPath = process.cwd();

function isFunction(o) {
  return typeof o === 'function'
}

function isString(o) {
  return typeof o === 'string'
}

function joinPath(filePath = '') {
  return path.join(rootPath, filePath);
}

function getBasename(filePath = '') {
  const basename = path.basename(filePath);
  return basename.split('.').slice(0, 1)[0]
}

const util = {
  isFunction,
  isString,
  joinPath,
  getBasename,
};

exports.util = util;
