class ChannelPage {

    get channelName() {
        return $('id=com.infolink.limeiptv:id/channelName')
    }

    get backToChannelsList() {
        return $('id=com.infolink.limeiptv:id/back_button')
    }

    get searchResultChanel() {
        return $('id=com.infolink.limeiptv:id/chanel_name')
    }

    get videoWidget() {
        return $('id=com.infolink.limeiptv:id/video')
    }

    get controllPanel() {
        return $('id=com.infolink.limeiptv:id/controll_panel')
    }

    get currentTime() {
        return $('id=com.infolink.limeiptv:id/seek_start')
    }

    get videoDuration() {
        return $('id=com.infolink.limeiptv:id/seek_stop')
    }

    get timeBar() {
        return $('id=com.infolink.limeiptv:id/seek_bar')
    }

    get changeQualityButton() {
        // return $('id=com.infolink.limeiptv:id/quality_image')
        return $('id=com.infolink.limeiptv:id/quality_player')
    }

    get qualityOptions() {
        return $('id=com.infolink.limeiptv:id/group_quality_scroll_view')
    }

    get makeFullScreen() {
        return $('id=com.infolink.limeiptv:id/mediacontrollerfullscreen')
    }

    get onlySoundButton() {
        return $('id=com.infolink.limeiptv:id/only_sound_button')
    }

    get fullScreenChannelsList() {
        return $$('android.view.ViewGroup')
    }

    get channelDown() {
        return $('id=com.infolink.limeiptv:id/channel_down_button')
    }

    get channelUp() {
        return $('id=com.infolink.limeiptv:id/channel_up_button')
    }

    async neededQuality(quality) {
        const selector = `new UiSelector().text("${quality}")`
        return $(`android=${selector}`)
    }
}

export default new ChannelPage()