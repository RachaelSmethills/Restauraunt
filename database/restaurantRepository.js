const DatabaseLoader = require("./databaseLoader");

class RestaurantRepository extends DatabaseLoader {
    constructor() {
        super();
    }

    createRestaurantDb() {
        return new Promise((res, rej) => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS restauraunts(
                    id INTEGER PRIMARY KEY, 
                    name Text,
                    image TEXT
                );`, (error) => {
                    if (error) return rej(error)
                    console.log('Restaurants table created', error);
                    this.db.run(`
                    CREATE TABLE IF NOT EXISTS menus(
                        id INTEGER PRIMARY KEY, 
                        title Text,
                        restaurauntsId INTEGER,
                        FOREIGN KEY(restaurauntsId) REFERENCES restauraunts(id)
                    );`, (error) => {
                        if (error) return rej(error)
                        console.log('Menus table created', error);
                        this.db.run(`
                        CREATE TABLE IF NOT EXISTS items(
                            id INTEGER PRIMARY KEY, 
                            name Text,
                            price DECIMAL,
                            menusId INTEGER,
                            FOREIGN KEY(menusId) REFERENCES menus(id)
                        );`, (error) => {
                            if (error) return rej(error)
                            console.log('Items table created', error);
                            return res();
                    });
                });
            });
        })
    }
}

module.exports = RestaurantRepository;