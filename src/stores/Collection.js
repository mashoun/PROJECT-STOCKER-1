import Item from "./Item"
export default class Collection {
    id = ''
    name = ''
    thumbnail = ''
    items = []
    constructor(name) {
        this.name = name
        return this
    }

    // getters
    getName() {
        return this.name
    }
    getThumbnail() {
        return this.thumbnail
    }
    getId() {
        return this.id
    }

    getItems() {
        return this.items
    }

    getAsJson() {
        return {
            id: this.id,
            name: this.name,
            thumbnail: this.thumbnail,
            items: this.items
        }
    }


    // setters
    setId(value) {
        this.id = value
        return this
    }
    setName(value) {
        this.name = value
        return this
    }
    setThumbnail(value) {
        this.thumbnail = value
        return this
    }

    setItems(items) {
        // items.forEach(node => {
        //     this.items.push(new Item(node.name, node.quantity, node.price).setId(node.id))
        // });
        this.items = items
    }
}