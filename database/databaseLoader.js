const sqlite3 = require('sqlite3');

class DatabaseLoader {
    constructor() {
        this.db = new sqlite3.Database('./db.sqlite');
    }

    generateInsertQuery(table, dataObject) {
        const dataKeys = Object.keys(dataObject); // Get all keys of provided object

        const dataKeysNonObjects = dataKeys.filter(x => typeof dataObject[x] != 'object')
        const dataValuesNonObjects = dataKeysNonObjects.map(x => dataObject[x]);
        
        const fields = `(${dataKeysNonObjects.map(x => x).join(', ')})`, // e.g. (name, city, location)... Joins keys into string of values
            placeHolders = `(${dataKeysNonObjects.map(x => '?').join(', ')})`; // e.g. (?, ?, ?, ?) Provides a paramater placeholder per value

        return {
            query: `INSERT INTO ${table} ${fields} VALUES ${placeHolders};`, // Final insert query
            params: dataValuesNonObjects
        }
    }
}

module.exports = DatabaseLoader;