class WifiPage {

    get wifiSettings() {
        const selector = `new UiSelector().textContains("AndroidWifi")`
        return $(`android=${selector}`)    }

    get modifyWifi() {
        return $('~Modify')
    }

    get advancedOptions() {
        return $('~Drop down list Advanced Options')
    }

    get proxySettings() {
        return $('id=com.android.settings:id/proxy_settings')
    }

    async getManual(option) {
        const selector = `new UiSelector().clickable(true).text("${option}")`
        return $(`android=${selector}`)
    }

    get proxyHostname() {
        return $('id=com.android.settings:id/proxy_hostname')
    }

    get proxyPort() {
        return $('id=com.android.settings:id/proxy_port')
    }

    get saveButton() {
        return $('id=android:id/button1')
    }

    get navigateUp() {
        return $('~Navigate up')
    }

    async setupProxy() {        
        const wifiSettings = await this.wifiSettings
        await wifiSettings.waitForDisplayed({timeout: 10000, timeoutMsg: "wifiSettings isn't displayed"})
        await wifiSettings.click()

        const modifyWifi = await this.modifyWifi
        await modifyWifi.waitForDisplayed({timeout: 10000, timeoutMsg: "modifyWifi isn't displayed"})
        await modifyWifi.click()

        const advancedOptions = await this.advancedOptions
        await advancedOptions.waitForDisplayed({timeout: 10000, timeoutMsg: "advancedOptions isn't displayed"})
        await advancedOptions.click()

        const proxySettings = await this.proxySettings
        await proxySettings.waitForDisplayed({timeout: 10000, timeoutMsg: "proxySettings isn't displayed"})
        await proxySettings.click()

        const manual = await this.getManual('Manual')
        await manual.waitForDisplayed({timeout: 10000, timeoutMsg: "manual isn't displayed"})
        await manual.click()

        const proxyHostname = await this.proxyHostname
        await proxyHostname.waitForDisplayed({timeout: 10000, timeoutMsg: "proxyHostname isn't displayed"})
        await proxyHostname.click()

        await proxyHostname.setValue("")

        const proxy_port = await this.proxyPort
        await proxy_port.setValue('')

        const saveButton = await this.saveButton
        await saveButton.waitForDisplayed({timeout: 10000, timeoutMsg: "saveButton isn't displayed"})
        await saveButton.click()

        const navigateUp = await this.navigateUp
        await navigateUp.waitForDisplayed({timeout:10000, timeoutMsg: "navigateUp isn't displayed"})
        await navigateUp.click()
    }

    async removeProxy() {
        const wifiSettings = await this.wifiSettings
        await wifiSettings.waitForDisplayed({timeout: 10000, timeoutMsg: "wifiSettings isn't displayed"})
        await wifiSettings.click()

        const modifyWifi = await this.modifyWifi
        await modifyWifi.waitForDisplayed({timeout: 10000, timeoutMsg: "modifyWifi isn't displayed"})
        await modifyWifi.click()

        const proxySettings = await this.proxySettings
        await proxySettings.waitForDisplayed({timeout: 10000, timeoutMsg: "proxySettings isn't displayed"})
        await proxySettings.click()

        const manual = await this.getManual('None')
        await manual.waitForDisplayed({timeout: 10000, timeoutMsg: "manual isn't displayed"})
        await manual.click()

        const saveButton = await this.saveButton
        await saveButton.waitForDisplayed({timeout: 10000, timeoutMsg: "saveButton isn't displayed"})
        await saveButton.click()

        const navigateUp = await this.navigateUp
        await navigateUp.waitForDisplayed({timeout:10000, timeoutMsg: "navigateUp isn't displayed"})
        await navigateUp.click()
    }
}

export default new WifiPage()