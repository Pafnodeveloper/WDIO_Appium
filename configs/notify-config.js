const base = require("./framework-config.js");
require("module-alias/register");

exports.config = {
    ...base.config,
    specs: ['./tests/specs/tests/test_notifications.js'],
  };