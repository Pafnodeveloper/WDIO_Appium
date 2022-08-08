class MenuPage {

    get authoriseButton() {
        return $("id=com.infolink.limeiptv:id/reg_email")
    }

    get settingsButton() {
        return $("//*[contains(@text, 'Настройки')]")
        return $('id=com.infolink.limeiptv:id/profile_settings_button')
    }

    get timeZoneCategory() {
        return $('//*[@text="Отображение времени"]/..')
    }

    get tzMoscow() {
        const selector = 'new UiSelector().resourceId("android:id/text1").checked(false)'
        return $(`android=${selector}`)
    }

    get getBack() {
        return $('~Navigate up')
    }

    get channelsList() {
        return $('id=com.infolink.limeiptv:id/live_tv')
    }
}

export default new MenuPage()