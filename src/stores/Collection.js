export default class Collection {
    #id = ''
    #name = ''
    #thumbnail = ''
    constructor(name) {
        this.#name = name
        return this
    }

    // getters
    get name() {
        return this.#name
    }
    get thumbnail() {
        return this.#thumbnail
    }
    get id() {
        return this.#id
    }

    // setters
    set id(value) {
        this.#id = value
        return this
    }
    set name(value) {
        this.#name = value
        return this
    }
    set thumbnail(value) {
        this.#thumbnail = value
        return this
    }
}