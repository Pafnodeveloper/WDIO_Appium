class MainPage {

    get searchLens() {
        return $('id=com.infolink.limeiptv:id/search_button')
    }

    get searchLine() {
        return $('id=com.infolink.limeiptv:id/search_text')
    }

    get channelsListContainer() {
        const selector = 'new UiSelector().scrollable(true).className("androidx.recyclerview.widget.RecyclerView")'
        return $(`android=${selector}`)
    }

    get menuSandwitch() {
        return $('id=com.infolink.limeiptv:id/main_menu_button')
    }

    get menuSandwitchRu() {
        return $('~Меню')
    }

    get getAllChannels() {
        return $$('id=com.infolink.limeiptv:id/list_item')
    }

    async getSection(sectionName) {
        return $(`~${sectionName}`)
    }

    async getFavouriteLabel(channelName) {
        return $(`//*[contains(@text, '${channelName}')]/following-sibling::android.widget.ImageView`)
    }

    async getChannel(channelName) {
        const selector = `new UiSelector().text("${channelName}")`
        return $(`android=${selector}`)
    }
}

export default new MainPage()