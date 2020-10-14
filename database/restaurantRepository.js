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
}

module.exports = RestaurantRepository;