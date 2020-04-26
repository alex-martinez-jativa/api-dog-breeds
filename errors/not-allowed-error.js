module.exports = class NotAllowedError extends Error {
    constructor(...args) {
        super(...args)

        this.name = NotAllowedError.name
    }
}