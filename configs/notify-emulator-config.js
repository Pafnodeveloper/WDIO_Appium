const base = require("./framework-config.js");
require("module-alias/register");

exports.config = {
    ...base.config,
    specs: ['./tests/specs/tests/test_notifications.js'],
    capabilities: [
        {
            "platformName": process.env.PLATFORM_NAME,
            "appium:automationName": process.env.AUTOMATION_NAME,
            "appium:udid": process.env.UDIDEM,
            // "appium:appPackage": process.env.APPPACKAGE,
            // "appium:appActivity": ".ChannelsActivity"
        }
    ],
  };