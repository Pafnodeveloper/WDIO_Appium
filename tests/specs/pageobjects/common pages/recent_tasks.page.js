class RecentTasksPage {

    async getRecentTask(task) {
        const selector = `new UiSelector().description("${task}")`
        return $(`android=${selector}`)
    }
}

export default new RecentTasksPage()