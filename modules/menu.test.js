const Menu = require('./menu'),
    Item = require('./item');

describe('Menu', () => {

    test('assigns varaibles as expected', () => {
        const myMenu = new Menu('Flan', '@');

        expect(myMenu.title).toEqual('Flan');
        expect(myMenu.icon).toEqual('@');
    });

    test('add item assigns menus as expected', () => {
        const myMenu = new Menu('Flan', '@'),
            item1 = new Item('Pinot Noir', 65),
            item2 = new Item('Picpoul de Pinet', 5),
            item3 = new Item('Sauvignon', 20);

        myMenu.additem(item1, item2, item3);

        expect(myMenu.items.length).toEqual(3);
    });
})
