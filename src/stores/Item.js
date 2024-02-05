export default class Item {
    constructor(name, quantity, price) {
        this.name = name
        this.quantity = quantity
        this.price = price
        return this
    }

    setId(id) {
        this.id = id
        return this
    }

    setTags(tags) {
        this.tags = tags
        return this
    }

    getItem() {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            ...this.tags
        }
    }


}