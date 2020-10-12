
class Menu{
    constructor(title, icon){
        this.title = title;
        this.icon = icon;
        this.items = [];
    }

    additem(...items){
        items.map(x => this.items.push(x));
    }
}

module.exports = Menu;
