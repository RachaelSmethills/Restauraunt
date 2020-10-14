const sqlite3 = require('sqlite3');

class DatabaseLoader {
    constructor() {
        this.db = new sqlite3.Database('./db.sqlite');
    }

    // Adds data to requested table
    load(table, dataArray, callback) {
        if (!dataArray || !table || !callback) {
            throw new Error('Missing param');
        }

        if (dataArray.length == 0) {
            return callback();
        }
        console.log(`Creating: ${table}`);

        const dataObject = dataArray.pop();
        
        const dataKeys = Object.keys(dataObject); // Get all keys of provided object

        const dataKeysNonObjects = dataKeys.filter(x => typeof dataObject[x] != 'object')
        const dataValuesNonObjects = dataKeysNonObjects.map(x => dataObject[x]);
        
        const fields = `(${dataKeysNonObjects.map(x => x).join(', ')})`, // e.g. (name, city, location)... Joins keys into string of values
            placeHolders = `(${dataKeysNonObjects.map(x => '?').join(', ')})`; // e.g. (?, ?, ?, ?) Provides a paramater placeholder per value

        const insertQuery = `INSERT INTO ${table} ${fields} VALUES ${placeHolders};`; // Final insert query

        this.db.run(insertQuery, dataValuesNonObjects, (error) => { // Executes the query with provided paramaters
            if (error) throw new Error(error);
            dataKeys
                .filter(x => typeof dataObject[x] === 'object')
                .forEach(x => {
                    console.log(`Now processing Sub items of: ${table}`);
                    this.db.get('SELECT last_insert_rowid() as id;', (error, row) => {
                        const obj = {}; obj[`${table}id`] = row.id;
                        dataObject[x].map(y => Object.assign(y, obj));
                        this.load(x, dataObject[x], callback);
                    });
                });
            console.log('NEXT RESTATURNET ');
            this.load(table, dataArray, callback);
        });
    }
}

module.exports = DatabaseLoader;