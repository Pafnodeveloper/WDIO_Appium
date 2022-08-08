class AuthorisationPage {

    get authoriseFields() {
        return $("id=com.infolink.limeiptv:id/panel_login")
    }

    get emailForm() {
        return $('id=com.infolink.limeiptv:id/email_text')
    }

    get passwordForm() {
        return $('id=com.infolink.limeiptv:id/password_text')
    }

    get makeLoginButton() {
        return $('id=com.infolink.limeiptv:id/btn_sub')
    }
}

export default new AuthorisationPage()