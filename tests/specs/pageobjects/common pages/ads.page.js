class AdsPage {

    get adsBannerClose() {
        const selector = 'new UiSelector().resourceIdMatches(\".*id/close[Banner]*\")'
        return $(`android=${selector}`)
    }

    get bareADS() {
        const selector = 'new UiSelector().clickable(true).className("android.widget.FrameLayout")'
        return $(`android=${selector}`)
    }

    async closeBareADS() {
        const closeADS = await this.bareADS
        await closeADS.waitForDisplayed({timeout: 6000, timeoutMsg: "Ads isn't displayed"})
        await closeADS.click()
    }

    async closeADS() {
        const closeADS = await this.adsBannerClose
        await closeADS.waitForDisplayed({timeout: 6000, timeoutMsg: "Ads isn't displayed"})
        await closeADS.click()     
    }
}

export default new AdsPage()