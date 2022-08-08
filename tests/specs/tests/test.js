import authorisationPage from "@pages/authorisation.page"
import adsPage from "@pages/common pages/ads.page"
import modalWindowPage from "@pages/common pages/modal_window.page"
import menuPage from "@pages/menu.page"
import mainPage from "@pages/main.page"
import channelPage from "@pages/channel.page"
import favouritePage from "@pages/favourite.page" 
import { channels, chosenChannel } from "@fixtures/data"
import { randomInteger } from "@fixtures/common_functions"


describe("Лайм HD TV", async function() {

    // before("Unlock device", async () => {      
    //   await driver.touchPerform([
    //       { action: 'press', options: { x: 550, y: 1769 }},
    //       { action: 'wait', options: { ms: 200 }},
    //       { action: 'moveTo', options: { x: 550, y: 300 }},
    //       { action: 'release' }
    //   ]);

    //   await driver.touchPerform([
    //       { action: 'press', options: { x: 550, y: 1464 }},
    //       { action: 'moveTo', options: { x: 550, y: 1769 }},
    //       { action: 'moveTo', options: { x: 550, y: 1195 }},
    //       { action: 'moveTo', options: { x: 850, y: 1195 }},
    //       { action: 'moveTo', options: { x: 250, y: 1195 }},
    //       { action: 'release' }
    //   ]);
    // })

    it("Log in", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const menuSandwitch = await mainPage.menuSandwitchRu
        await menuSandwitch.waitForDisplayed({timeout: 10000, timeoutMsg: "Menu button isn't displayed"})
        await menuSandwitch.click()

        const authoriseButton = await menuPage.authoriseButton
        await authoriseButton.waitForDisplayed({timeout: 5000, timeoutMsg: "authoriseButton isn't displayed"})
        await authoriseButton.click()

        const authoriseFields = await authorisationPage.authoriseFields
        await authoriseFields.waitForDisplayed({timeout: 5000, timeoutMsg: "authoriseFields isn't displayed"})
        await authoriseFields.click()

        const emailForm = await authorisationPage.emailForm
        await emailForm.waitForDisplayed({timeout: 5000, timeoutMsg: "emailForm isn't displayed"})
        await emailForm.setValue(process.env.EMAIL)

        const passwordForm = await authorisationPage.passwordForm
        await passwordForm.waitForDisplayed({timeout: 5000, timeoutMsg: "passwordForm isn't displayed"})
        await passwordForm.setValue(process.env.PASSWORD)

        const makeLoginButton = await authorisationPage.makeLoginButton
        await makeLoginButton.waitForDisplayed({timeout: 5000, timeoutMsg: "makeLoginButton isn't displayed"})
        await makeLoginButton.click()

        await menuSandwitch.waitForDisplayed({timeout: 10000, timeoutMsg: "Menu button isn't displayed"})
        await menuSandwitch.click()

        const authoriseInfo = await menuPage.authoriseButton
        await authoriseInfo.waitForDisplayed({timeout: 5000, timeoutMsg: "authoriseInfo isn't displayed"})
        const text = await authoriseInfo.getText()

        expectChai(process.env.EMAIL, "Language differs").to.be.equal(text)
        await driver.closeApp()
    })

    it("Start broadcasting", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        await adsPage.closeADS()

        const channelsListContainer = await mainPage.channelsListContainer

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("${chosenChannel}")`})

        const channel = await mainPage.getChannel(`${chosenChannel}`)
        await channel.waitForDisplayed({timeout: 10000, timeoutMsg: "Channel isn't displayed"})
        await channel.click()

        const channelName = await channelPage.channelName.getText()
        expectChai(`${chosenChannel}`, "Another channel displayed").to.be.equal(channelName)      
    })

    it("Change channel", async function() {
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

        const channelUp = await channelPage.channelUp
        await channelUp.waitForDisplayed({timeout: 5000, timeoutMsg: "channelUp isn't displayed"})
        await channelUp.click()
        
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const channelName = await channelPage.channelName.getText()
        expectChai(`${channelName}`, "Another channel displayed").to.be.equal(`${channels[randomInt + 1]}`)

        let videoWidget = await channelPage.videoWidget
        await videoWidget.waitForDisplayed({timeout: 5000, timeoutMsg: "videoWidget isn't displayed"})

        await browser.execute('mobile: doubleClickGesture', {elementId: `${videoWidget.elementId}`})

        const controll_panel = await channelPage.controllPanel
        await controll_panel.waitForDisplayed({timeout: 10000, timeoutMsg: "fullScreenChannelsList isn't displayed"})

        const fullScreenChannelsList = await channelPage.fullScreenChannelsList
        await fullScreenChannelsList[randomInteger(0, fullScreenChannelsList.length - 1)].click()

        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }
        
        videoWidget = await channelPage.videoWidget
        await videoWidget.waitForDisplayed({timeout: 5000, timeoutMsg: "videoWidget isn't displayed"})
        await browser.execute('mobile: doubleClickGesture', {elementId: `${videoWidget.elementId}`})

        const newChannelName = await channelPage.channelName.getText()

        expectChai(`${newChannelName}`, "Another channel displayed").not.to.be.equal(`${channelName}`)
    })

    it("Search for a channel", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const searchLens = await mainPage.searchLens
        await searchLens.waitForDisplayed({timeout: 5000, timeoutMsg: "searchLens isn't displayed"})
        await searchLens.click()

        const searchLine = await mainPage.searchLine
        await searchLine.waitForDisplayed({timeout: 5000, timeoutMsg: "searchLine isn't displayed"})
        await searchLine.addValue(`${chosenChannel}`)

        const channelName = await channelPage.searchResultChanel.getText()
        expectChai(`${chosenChannel}`, "There is no such a channel in a list").to.be.equal(channelName)
    })
})

describe("Favourite moves @FAVOURITE", async function() {
    it("Add to favourite", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const sectionAll = await mainPage.getSection("Все")
        await sectionAll.waitForDisplayed({timeout: 5000, timeoutMsg: "sectionAll isn't displayed"})
        await sectionAll.click()

        const channelsListContainer = await mainPage.channelsListContainer

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("${chosenChannel}")`})

        const channelFavouriteLabel = await mainPage.getFavouriteLabel(`${chosenChannel}`)
        await channelFavouriteLabel.waitForDisplayed({timeout: 5000, timeoutMsg: "channelFavouriteLabel isn't displayed"})
        await channelFavouriteLabel.click()

        const sectionFavourite = await mainPage.getSection("Избранные")
        await sectionFavourite.waitForDisplayed({timeout: 5000, timeoutMsg: "sectionFavourite isn't displayed"})
        await sectionFavourite.click()

        const favouriteChannel = await mainPage.getChannel(`${chosenChannel}`)
        const favouriteChannelName = await favouriteChannel.getText()
        expectChai(`${chosenChannel}`, "There is no such a channel in a favourite section").to.be.equal(favouriteChannelName)
    })

    it("Remove from favourite", async function() {
        await driver.startActivity(process.env.APPPACKAGE, "com.infolink.limeiptv.StartupActivity")
        try {
            await adsPage.closeADS()
        } catch { try {
            await adsPage.closeBareADS()
            } catch {}            
        }

        const sectionAll = await mainPage.getSection("Все")
        await sectionAll.waitForDisplayed({timeout: 5000, timeoutMsg: "sectionAll isn't displayed"})
        await sectionAll.click()

        const channelsListContainer = await mainPage.channelsListContainer

        await browser.execute('mobile: scroll', {elementId: `${channelsListContainer.elementId}`, 
            strategy: "-android uiautomator", selector: `text("${chosenChannel}")`})

        let channelFavouriteLabel = await mainPage.getFavouriteLabel(`${chosenChannel}`)
        await channelFavouriteLabel.waitForDisplayed({timeout: 5000, timeoutMsg: "channelFavouriteLabel isn't displayed"})
        await channelFavouriteLabel.click()

        const sectionFavourite = await mainPage.getSection("Избранные")
        await sectionFavourite.waitForDisplayed({timeout: 5000, timeoutMsg: "sectionFavourite isn't displayed"})
        await sectionFavourite.click()

        channelFavouriteLabel = await mainPage.getFavouriteLabel(`${chosenChannel}`)
        await channelFavouriteLabel.waitForDisplayed({timeout: 5000, timeoutMsg: "channelFavouriteLabel isn't displayed"})
        await channelFavouriteLabel.click()

        const confirmButton = await modalWindowPage.confirmButton
        await confirmButton.waitForDisplayed({timeout: 5000, timeoutMsg: "confirmButton isn't displayed"})
        await confirmButton.click()

        const emptySectionMessage = await favouritePage.emptySectionMessage
        await emptySectionMessage.waitForDisplayed({timeout: 5000, timeoutMsg: "emptySectionMessage isn't displayed"})
        const text = await emptySectionMessage.getText()

        expectChai(`${text}`, "Channels are presented").to.include("нет каналов")
    })
})