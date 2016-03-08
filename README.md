# Gulp: Regex to JSON
Search files for a regular expression then put it in a JSON file

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-regex-json`

## Usage

```js
var json = require('gulp-regex-json');

gulp.task('regex2json', function() {
  var regex = /([A-Za-z\-]+)'/g;

  return gulp.src('./lib/*.js')
    .pipe(json({
      regex: regex,
      file: 'output.json'
    }))
    .pipe(gulp.dest('./dist/'));
});
```

