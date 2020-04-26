module.exports = class ContentError extends Error {
    constructor(...args) {
        super(...args)

        this.name = ContentError.name
    }
}