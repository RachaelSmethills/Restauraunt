const repository = require('./database/restaurantRepository'),
    restaturantData = require('./restaurants.json');

const dbLoader = new repository();

dbLoader
.createRestaurantDb()
.then(() =>{
    console.log('Running insert... ehhhhhh');
    dbLoader.load('restauraunts', restaturantData, () => console.log('WE GOT HERE'));
});
