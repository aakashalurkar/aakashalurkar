var assert = require('assert');
var request = require('request');
var config = require('../config');

it('Checks Correct Login', function(done) {
  request.post(config.host + ":3001/ownerlogin", { form: { email: "murtaza.manasawala@sjsu.edu", password: "12345678" } },
    function (error, response, body) {
      assert.equal(200, response.statusCode);
      done();
  });
});
