const Restaurant = require('./restaurant'),
    Menu = require('./menu');

describe('Restaurant', () => {
    test('assigns varaibles as expected', () => {

        const pizzaPalace = new Restaurant('Flan', '../image.jpg', 'Texas');

        expect(pizzaPalace.name).toEqual('Flan');
        expect(pizzaPalace.imageURL).toEqual('../image.jpg');
        expect(pizzaPalace.city).toEqual('Texas');
    });  

    test('add menu assigns menus as expected', () => {
        const bigMooseInc = new Restaurant('The big Moose', '../image.jpg', 'Texas');
            menu1 = new Menu('A La Carte', '😘'),
            menu2 = new Menu('Lunch', '😘'),
            menu3 = new Menu('Bar', '😳');

        bigMooseInc.addMenu(menu1, menu2, menu3);

        expect(bigMooseInc.menus.length).toEqual(3);
    });
})
