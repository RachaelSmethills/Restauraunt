const sqlite3 = require('sqlite3');

class DatabaseLoader {
    constructor() {
        this.db = new sqlite3.Database('./db.sqlite');
    }

    insert(table, dataArray, callback) {
        if (!dataArray.length) return callback();
        let self = this;

        const dataObject = dataArray.pop();
        const dataKeys = Object.keys(dataObject); // Get all keys of provided object

        const dataKeysNonObjects = dataKeys.filter(x => typeof dataObject[x] != 'object')
        const dataValuesNonObjects = dataKeysNonObjects.map(x => dataObject[x]);
        
        const fields = `(${dataKeysNonObjects.map(x => x).join(', ')})`, // e.g. (name, city, location)... Joins keys into string of values
            placeHolders = `(${dataKeysNonObjects.map(x => '?').join(', ')})`; // e.g. (?, ?, ?, ?) Provides a paramater placeholder per value

        const insertQuery = `INSERT INTO ${table} ${fields} VALUES ${placeHolders};`; // Final insert query
        this.db.run(insertQuery, dataValuesNonObjects, function(error) { // Executes the query with provided paramaters
            if (error) throw new Error(error);
            dataKeys
                .filter(x => typeof dataObject[x] === 'object')
                .forEach(x => {
                    const obj = {}; obj[`${table}id`] = this.lastID;
                    dataObject[x].map(y => Object.assign(y, obj));
                    self.insert(x, dataObject[x], () => '');
                });
            self.insert(table, dataArray, callback);
        });
    }
}

module.exports = DatabaseLoader;