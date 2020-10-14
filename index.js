const repository = require('./database/restaurantRepository'),
    restaturantData = require('./restaurants.json');

const dbLoader = new repository();

dbLoader
.createRestaurantDb()
.then(() =>{
    dbLoader.insert('restauraunts', restaturantData, () => console.log('DONE IT ALL'))
});
