var _ = require('lodash');
module.exports = function (grunt) {
  function getTestTask() {
    var testTask = 'mocha:unit';

    if (grunt.option('use-sauce') || process.env.TRAVIS) {
      if (!process.env.SAUCE_ACCESS_KEY) {
        grunt.log.writeln(grunt.log.wordlist([
          '>> SAUCE_ACCESS_KEY not set in env, running with Phantom'
        ], {color: 'yellow'}));
      } else {
        testTask = 'saucelabs-mocha:unit';
      }
    }

    return testTask;
  }

  grunt.registerTask('test', function () {
    if (grunt.option('quick')) {
      grunt.task.run('quick-test');
      return;
    }

    var tasks = [
      'jshint',
      'maybe_start_kibana',
      'jade',
      'less',
      getTestTask()
    ];
    grunt.task.run(tasks);
  });

  grunt.registerTask('quick-test', function () {
    var tasks = [
      'maybe_start_kibana',
      getTestTask()
    ];
    grunt.task.run(tasks);
  });

  grunt.registerTask('coverage', [
    'blanket',
    'maybe_start_kibana',
    'mocha:coverage'
  ]);

  grunt.registerTask('test:watch', [
    'maybe_start_kibana',
    'watch:test'
  ]);
};
