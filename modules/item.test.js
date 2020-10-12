const Item = require("./item");

describe('Item', () => {
    test('assigns name and price', () => {

        const myItem = new Item('Flan', 78)

        expect(myItem.name).toEqual('Flan');
        expect(myItem.price).toEqual(78);

    });  
})
