const sqlite3 = require('sqlite3');

class DatabaseLoader {
    constructor() {
        this.db = new sqlite3.Database('./db.sqlite');
    }

    // Adds data to requested table
    load(table, dataArray) {
        return new Promise((res, rej) => {
            if (!dataArray || !table) {
                throw new Error('Missing param');
            }
    
            if (dataArray.length == 0) {
                console.log('-------------------- Done with this ----------------', table);
                return res([table, dataArray]);
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
                console.log('Added data to table: ', table);
                const subItems = dataKeys.filter(x => typeof dataObject[x] === 'object');
                if (subItems.length == 0) {
                    console.log('* Loop Done - ', table, dataArray);
                    return res([table, dataArray]);
                } else {
                    subItems.forEach((x)=> {
                        console.log(`Now processing Sub items of: ${table}`);
                        this.db.get('SELECT last_insert_rowid() as id;', (error, row) => {
                            const obj = {}; obj[`${table}id`] = row.id;
                            dataObject[x].map(y => Object.assign(y, obj));
                            return res([x, dataObject[x]]);
                        });
                    });
                }
                    
            });
        }).then(([table, dataArray]) => {
            console.log(' ***************************** Whats all this tble: ', table);
            console.log('whats all this data:', dataArray);
            if (dataArray.length === 0) return Promise.resolve();
            return this.load(table, dataArray);
        }).catch(error => console.log('Failure!', error));
    }
}

module.exports = DatabaseLoader;