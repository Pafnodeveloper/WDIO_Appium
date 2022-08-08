require("module-alias/register")

exports.config = {
    specs: ['./tests/specs/tests/test.js'],

    runner: 'local',
    host: process.env.HOST,
    port: process.env.PORT,
    logLevel: 'debug',    
    maxInstances: 1,
    connectionRetryCount: 1,
    capabilities: [
        {
            "platformName": process.env.PLATFORM_NAME,
            "appium:automationName": process.env.AUTOMATION_NAME,
            "appium:udid": process.env.UDID,
            // "appium:appPackage": process.env.APPPACKAGE,
            // "appium:appActivity": ".ChannelsActivity"
        }
    ],

    services: 
            [
                ['appium',
                    {args:{
                        "--debug-log-spacing": true,
                        "--relaxed-security": true
                        // "--address": "localhost",
                        // "--port": "4723",
                        // "--platform-name": "android",
                        // "--automation-name": "uiautomator2",
                        // "--udid": "8c14c493",
                        // "--app-pkg": "com.wdiodemoapp",
                        // "--app-activity": "com.wdiodemoapp.MainActivity"
                    },
                        command: 'appium',
                    },
                ],                
            ],

    framework: 'mocha',

    mochaOpts: {
        require: ["@babel/register"],
        ui: 'bdd',
        timeout: 70000,
        // grep: '@commonTest'
    },
    reporters: [
        'spec',
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    before: async function () {
        const chai = require("chai");
        global.expectChai = chai.expect;
        global.assertChai = chai.assert;

        const matchers = require("@fixtures/my_matchers")
        matchers.addCustomMatchers()
    }
}