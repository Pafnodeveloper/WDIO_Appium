module.exports = {
    addCustomMatchers: () => {
        expect.extend({
            lessThen(actual, expected) {
                return { pass: actual < expected, message: () => `${actual} is greater or even ${expected}` }
            },
        })
    }
}