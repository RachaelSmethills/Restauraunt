CREATE TABLE restauraunts(
    id INTEGER PRIMARY KEY, 
    name Text,
    image TEXT
);

CREATE TABLE menus(
    id INTEGER PRIMARY KEY, 
    title Text,
    restaurauntId INTEGER,
    FOREIGN KEY(restaurauntId) REFERENCES restauraunts(id)
);

CREATE TABLE items(
    id INTEGER PRIMARY KEY, 
    name Text,
    price DECIMAL,
    menuId INTEGER,
    FOREIGN KEY(menuId) REFERENCES menus(id)
);


INSERT INTO restauraunts 
    (name) 
VALUES  
    ('The Fox Hole'),
    ('Gildersome Arms'),
    ('The Unicorn');

INSERT INTO menus 
    (name, restaurauntId) 
VALUES  
    ('A La Carte', 1),
    ('Lunch', 2),
    ('Bar', 3);

INSERT INTO items 
    (name, price, menuId) 
VALUES  
    ('Pancakes', 6.65, 1),
    ('Strawberry Parfait', 4.35, 2),
    ('Tarte aux Citrone', 5.25, 3);

UPDATE restauraunts 
SET name = 'Call Lane Social' 
WHERE id=1;


SELECT 
    r.name as [restaurant name],
    m.name as [menu],
    i.NAME as item,
    i.price
FROM restauraunts r
INNER JOIN menus m ON r.id = m.restaurauntId
INNER JOIN Items i on i.menuId = m.Id;


