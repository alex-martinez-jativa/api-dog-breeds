module.exports = class NotFoundError extends Error {
    //constructor(message, fileName, lineNumber) {
    constructor(...args) {
        //super(message, fileName, lineNumber)
        super(...args)

        this.name = NotFoundError.name
    }
}