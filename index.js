var _ = require('lodash');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

var parse = function(result) {
  return result.pop();
};

var transform = function(results) {
  var obj = {};

  _.forEach(results, function(key) {
    obj[key] = null;
  });

  return JSON.stringify(obj, null, 2);
};

var options = {
  parse: parse,
  transform: transform,
  duplicate: false // don't add twice the same key
};

module.exports = function(opts) {
  var params = _.extend({}, options, opts);
  var results = [];

  if (_.isUndefined(params.regex)) {
    throw new PluginError('gulp-regex-json', 'The `regex` option is mandatory');
  }

  return through2.obj(function(file, encoding, callback) {
    var content = file.contents.toString(encoding);
    var result;

    while ((result = params.regex.exec(content)) !== null) {
      var key = params.parse(result);

      if (params.duplicate || !_.includes(results, key)) {
        results.push(key);
      }
    }

    return callback();
  }, function(callback) {
    var json = params.transform(results);
    var file = new File({
      path: params.file,
      contents: new Buffer(json)
    });

    this.push(file);

    return callback();
  });
};