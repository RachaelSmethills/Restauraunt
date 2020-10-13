CREATE TABLE restauraunts(
    id INTEGER PRIMARY KEY, 
    name Text
);

INSERT INTO restauraunts 
    (name) 
VALUES  
    ('The Fox Hole'),
    ('Gildersome Arms'),
    ('The Unicorn');

UPDATE restauraunts 
SET name = 'Call Lane Social' 
WHERE id=1;

SELECT * FROM restauraunts;

DELETE FROM restauraunts
WHERE id = 2;

SELECT * FROM restauraunts;

