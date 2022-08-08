class NotificationPage {

    get tgNotification() {
        return $(`id=android:id/message_text`)
    }

    get notificationList() {
        return $('id=com.android.systemui:id/notification_stack_scroller')
    }

    get dismissNotifications() {
        return $('id=com.android.systemui:id/dismiss_view')
    }

    get dismissSMS() {
        return $('id=com.android.systemui:id/dismiss_text')
    }
}

export default new NotificationPage()