import { execSync,exec } from "child_process"
import process from "process"
import fs from "fs"

import mainPage from "@pages/main.page"
import channelPage from "@pages/channel.page"
import menuPage from "@pages/menu.page"
import adsPage from "@pages/common pages/ads.page"
import wifiPage from "@pages/common pages/wifi.page"
import { delay } from "@fixtures/common_functions"

describe("Лайм HD TV change channel resolution", async function() {

    afterEach(async () => {
        await driver.executeScript('mobile: shell', [{
          command: 'am start -a android.settings.WIFI_SETTINGS'
        }]);

        await wifiPage.removeProxy()
        await delay(1000)
        await driver.pressKeyCode(4)
    })

    it("Change channel quality", async function() {
        exec('')
        await driver.startActivity(process.env.APPPACKAGE, ".StartupActivity")

        try {
          await adsPage.closeADS()
        } catch { try {
          await adsPage.closeBareADS()
          } catch {}            
        }

        const channelsListContainer = await mainPage.channelsListContainer
        await channelsListContainer.waitForDisplayed({timeout: 10000, timeoutMsg: "channelsListContainer isn't displayed"})

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("Первый канал")`})

        const channel = await mainPage.getChannel(`Первый канал`)
        await channel.waitForDisplayed({timeout: 10000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        await driver.executeScript('mobile: shell', [{
          command: 'am start -a android.settings.WIFI_SETTINGS'
          }])

        await wifiPage.setupProxy()
        await delay(1000)
        await driver.pressKeyCode(4)

        await delay(4000)

        const videoWidget = await channelPage.videoWidget
        await videoWidget.waitForDisplayed({timeout: 10000, timeoutMsg: "videoWidget is displayed"})
        await videoWidget.click()

        const qualityButton = await channelPage.changeQualityButton
        await qualityButton.waitForDisplayed({timeout: 10000, timeoutMsg: "qualityButton is displayed"})
        await qualityButton.click()

        const quality = await channelPage.neededQuality("MID")
        await quality.waitForDisplayed({timeout: 10000, timeoutMsg: "quality is displayed"})
        await quality.click()

        await delay(4000)
        
        execSync("taskkill /im Charles.exe")
        process.chdir(process.env.CHARLES_PATH)
        execSync(`chcp 437 & dir /S tracks-v2a1 > ${process.env.RESULT_FILE} 2>&1`)

        fs.readFile(`${process.env.RESULT_FILE}`, 'utf8', function (err, data) {
            if (data) {
              assertChai.isOk(true)              
            } else { assertChai.fail("File doesn't exist") }
          });
    })

    it("Change time-zone", async function() {
        exec('')
        await driver.startActivity(process.env.APPPACKAGE, ".StartupActivity")

        try {
            await adsPage.closeADS()
          } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
          }

        const channelsListContainer = await mainPage.channelsListContainer
        await channelsListContainer.waitForDisplayed({timeout: 10000, timeoutMsg: "channelsListContainer isn't displayed"})

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("Первый канал")`})

        const channel = await mainPage.getChannel(`Первый канал`)
        await channel.waitForDisplayed({timeout: 10000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        await driver.executeScript('mobile: shell', [{
          command: 'am start -a android.settings.WIFI_SETTINGS'
          }])
        
        await wifiPage.setupProxy()
        await delay(1000)
        await driver.pressKeyCode(4)

        await delay(4000)

        const backButton = await channelPage.backToChannelsList
        await backButton.waitForDisplayed({timeout: 10000, timeoutMsg: "backButton isn't displayed"})
        await backButton.click()

        const menuSandwitch = await mainPage.menuSandwitch
        await menuSandwitch.waitForDisplayed({timeout: 10000, timeoutMsg: "Menu button isn't displayed"})
        await menuSandwitch.click()

        const settingsButton = await menuPage.settingsButton
        await settingsButton.waitForDisplayed({timeout: 10000, timeoutMsg: "settingsButton button isn't displayed"})
        await settingsButton.click()

        const tz = await menuPage.timeZoneCategory
        await tz.waitForDisplayed({timeout: 10000, timeoutMsg: "tz button isn't displayed"})
        await tz.click()

        const tzMoscow = await menuPage.tzMoscow
        await tzMoscow.waitForDisplayed({timeout: 10000, timeoutMsg: "tzMoscow button isn't displayed"})
        await tzMoscow.click()

        await driver.executeScript('mobile: shell', [{
          command: 'am start -a android.settings.WIFI_SETTINGS'
          }]);

        await wifiPage.removeProxy()
        await delay(1000)
        await driver.pressKeyCode(4)

        const getBack = await menuPage.getBack
        await getBack.waitForDisplayed({timeout: 10000, timeoutMsg: "getBack button isn't displayed"})
        await getBack.click()

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("Первый канал")`})

        await channel.waitForDisplayed({timeout: 10000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        await driver.executeScript('mobile: shell', [{
          command: 'am start -a android.settings.WIFI_SETTINGS'
          }]);
        
        await wifiPage.setupProxy()
        await delay(1000)
        await driver.pressKeyCode(4)
        
        await delay(6000)

        execSync("taskkill /im Charles.exe")
        process.chdir(process.env.CHARLES_PATH)
        execSync(`chcp 437 & dir /S 1kanalott > ${process.env.RESULT_FILE} 2>&1`)
        execSync(`chcp 437 & dir /S 1kanalplus2 > ${process.env.RESULT_FILE} 2>&1`)

        fs.readFile(`${process.env.RESULT_FILE}`, 'utf8', function (err, data) {
            if (data) {
              assertChai.isOk(true)              
            } else { assertChai.fail("File doesn't exist") }
          });
    })
})