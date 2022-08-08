const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

import notificationPage from "@pages/common pages/notifications.page"
import adsPage from "@pages/common pages/ads.page" 
import mainPage from "@pages/main.page"
import channelPage from "@pages/channel.page"
import { channels } from "@fixtures/data"
import { randomInteger, delay } from "@fixtures/common_functions"

describe("Лайм HD TV notification, call, sms", async function() {

    it("Notification @REAL", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const randomInt = randomInteger(0, channels.length - 2)

        const channel = await mainPage.getChannel(`${channels[randomInt]}`)
        await channel.waitForDisplayed({timeout: 5000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        let currentVideoTimeBar = await channelPage.timeBar
        await currentVideoTimeBar.waitForDisplayed({timeout: 10000, timeoutMsg: "currentVideoTimeBar isn't displayed"})
        const startVideoTime = await currentVideoTimeBar.getText()

        let body = {"chat_id": process.env.CHAT_ID, "text": "Push-notifications from my Windows"}
        await fetch(`https://api.telegram.org/bot${process.env.BOT_ID}/sendMessage`, 
            {method: 'post', body: JSON.stringify(body), headers: {'content-type': 'application/json'}})

        await driver.openNotifications();

        const tgNotification = await notificationPage.tgNotification
        await tgNotification.waitForDisplayed({timeout: 10000, timeoutMsg: "tgNotification isn't displayed"})

        const notificationText = await tgNotification.getText()
        expectChai(`${notificationText}`, "There is no such a notification").to.be.equal("Push-notifications from my Windows")

        await driver.pressKeyCode(4)
        
        await channelPage.videoWidget.click()
        currentVideoTimeBar = await channelPage.timeBar
        const endVideoTime = await currentVideoTimeBar.getText()

        await expect(startVideoTime).lessThen(endVideoTime)      
    })

    it("Call @REAL", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const randomInt = randomInteger(0, channels.length - 2)

        const channel = await mainPage.getChannel(`${channels[randomInt]}`)
        await channel.waitForDisplayed({timeout: 5000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        let currentVideoTimeBar = await channelPage.timeBar
        await currentVideoTimeBar.waitForDisplayed({timeout: 5000, timeoutMsg: "currentVideoTimeBar isn't displayed"})
        const startVideoTime = await currentVideoTimeBar.getText()

        await driver.executeScript('mobile: shell', [{
            command: 'am start -a android.intent.action.CALL -d tel:555-5555',
            }])

        await delay(4000)

        await driver.executeScript('mobile: shell', [{
            command: 'input keyevent KEYCODE_ENDCALL',
            }])
        
        currentVideoTimeBar = await channelPage.timeBar
        const endVideoTime = await currentVideoTimeBar.getText()

        await expect(startVideoTime).lessThen(endVideoTime)
    })

    it("SMS @EMULATOR", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const randomInt = randomInteger(0, channels.length - 2)

        const channel = await mainPage.getChannel(`${channels[randomInt]}`)
        await channel.waitForDisplayed({timeout: 10000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        const controllPanel = await channelPage.controllPanel
        await controllPanel.waitForDisplayed({timeout: 10000, reverse: true, timeoutMsg: "controllPanel is displayed"})

        await channelPage.videoWidget.click()

        let currentVideoTimeBar = await channelPage.timeBar
        await currentVideoTimeBar.waitForDisplayed({timeout: 10000, timeoutMsg: "currentVideoTimeBar isn't displayed"})
        const startVideoTime = await currentVideoTimeBar.getText()

        await driver.sendSms("1234567890", "SMS-notification")

        await driver.openNotifications();

        const tgNotification = await notificationPage.tgNotification
        await tgNotification.waitForDisplayed({timeout: 20000, timeoutMsg: "tgNotification isn't displayed"})

        const notificationText = await tgNotification.getText()
        expectChai(`${notificationText}`, "There is no such a notification").to.be.equal("SMS-notification")
        
        await driver.pressKeyCode(4);
        
        await channelPage.videoWidget.click()
        currentVideoTimeBar = await channelPage.timeBar
        const endVideoTime = await currentVideoTimeBar.getText()

        await expect(startVideoTime).lessThen(endVideoTime)
    })

})