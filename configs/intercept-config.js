const base = require("./framework-config.js");
require("module-alias/register");

exports.config = {
    ...base.config,
    specs: ['./tests/specs/tests/intercept.js'],

    capabilities: [
        {
            "platformName": process.env.PLATFORM_NAME,
            "appium:automationName": process.env.AUTOMATION_NAME,
            "appium:udid": process.env.UDIDEM
        }
    ],

    reporters: [
        'spec',
        [
            "allure",
            {
                outputDir: "C:\\Users\\User\\WDIO_Appium\\allure-results",
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    mochaOpts: {
        require: ["@babel/register"],
        ui: 'bdd',
        timeout: 210000,
        // grep: '@commonTest'
    },
  };