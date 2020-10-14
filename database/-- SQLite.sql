-- SQLite
select r.name as 'Restaurant',
    m.title as 'Menu Title',
    i.name as 'Item Name',
    i.price
    from restauraunts r
    inner join menus m on m.restaurauntsId = r.id
    inner join items i on i.menusId = m.id
ORDER BY r.ID, m.Id, i.id;

