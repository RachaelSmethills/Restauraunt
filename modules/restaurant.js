class Restaurant {
    constructor(name, imageURL, city){
        this.name = name;
        this.imageURL = imageURL;
        this.city = city;
        this.menus = [];
    }

    addMenu(...menus){
        menus.map(x => this.menus.push(x));
    }
}

module.exports = Restaurant;
