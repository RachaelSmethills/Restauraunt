const DatabaseLoader = require("./databaseLoader");

class RestaurantRepository extends DatabaseLoader {
    constructor() {
        super();
    }

    createRestaurantDb() {
        return new Promise((resolve, reject) =>{
            this.db.exec(`
            CREATE TABLE IF NOT EXISTS restauraunts(
                id INTEGER PRIMARY KEY, 
                name Text,
                image TEXT
            );
            CREATE TABLE IF NOT EXISTS menus(
                id INTEGER PRIMARY KEY, 
                title Text,
                restaurauntsId INTEGER,
                FOREIGN KEY(restaurauntsId) REFERENCES restauraunts(id)
            );
            CREATE TABLE IF NOT EXISTS items(
                id INTEGER PRIMARY KEY, 
                name Text,
                price DECIMAL,
                menusId INTEGER,
                FOREIGN KEY(menusId) REFERENCES menus(id)
            );
            `, resolve());
        });
    }

    insertMenuItems(menuItems, menus, restaurants, callback) {
        if (!menuItems.length) return this.insertMenus(menus, restaurants, callback);
        let self = this;

        const dataObject = menuItems.pop();
        const qb = this.generateInsertQuery('items', dataObject);
        this.db.run(qb.query, qb.params, function(error) { // Executes the query with provided paramaters
            if (error) throw new Error(error);
            self.insertMenuItems(menuItems, menus, restaurants, callback);
        });
    }

    insertMenus(menus, restaurants, callback) {
        if (!menus.length) return this.insertRestaurants(restaurants, callback);
        let self = this;

        const dataObject = menus.pop();
        const qb = this.generateInsertQuery('menus', dataObject);
        this.db.run(qb.query, qb.params, function(error) { // Executes the query with provided paramaters
            if (error) throw new Error(error);
            const obj = {}; obj[`menusid`] = this.lastID;
            self.insertMenuItems(dataObject['items'].map(y => Object.assign(y, obj)),menus, restaurants, callback);
        });
    }

    insertRestaurants(restaurants, callback) {
        if (!restaurants.length) return callback();
        let self = this;

        const dataObject = restaurants.pop();
        const qb = this.generateInsertQuery('restauraunts', dataObject);
        this.db.run(qb.query, qb.params, function(error) { // Executes the query with provided paramaters
            if (error) throw new Error(error);
            const obj = {}; obj[`restaurauntsid`] = this.lastID;
            self.insertMenus(dataObject['menus'].map(y => Object.assign(y, obj)), restaurants, callback);
        });
    }
}

module.exports = RestaurantRepository;