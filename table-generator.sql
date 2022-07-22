
USE InventoryDatabase;

create table warehouse (warehouseID int not null auto_increment,
						warehouseName varchar(200),
						address varchar(200),
                        city varchar(20),
                        state varchar(20),
                        zipcode long,
						capacity long,
                        primary key(warehouseID)
);


create table inventory (itemID int not null auto_increment,
						itemName varchar(20),
                        itemCompany varchar(20),
                        itemCategory varchar(20),
                        itemPrice long,
                        itemQuantity long,
                        warehouseID int not null,
                        primary key(itemID),
						foreign key (warehouseID) references warehouse(warehouseID)
);

insert into warehouse values(1, 'UnitPrime', '9241 13th Ave SW', 'Seattle', 'WA', 98106, 600);
insert into warehouse values(2, 'Omega', '828 South Galvin Drive', 'Dallas', 'TX', 7523, 1000);


insert into inventory values(1, 'Galaxy S9', 'Samsung', 'Smartphones', 1000, 10, 1);
insert into inventory values(2, 'Galaxy Fold', 'Samsung', 'Smartphones', 2000, 100, 1);
insert into inventory values(3, '27 ES FHD', 'HP', 'Monitors', 300, 50, 1);
insert into inventory values(4, 'iPhone XS', 'Apple', 'Smartphones', 1800, 70 , 2);
insert into inventory values(5, 'Galaxy 10', 'Samsung', 'Smartphones', 2000, 40, 1);
insert into inventory values(7, '9000 HD ', 'HP', 'Monitors', 300, 60, 1);
insert into inventory values(8, 'Apple XS', 'Apple', 'Smartphones', 1800, 70 , 2);
select * from inventory;

select count(itemName) from inventory group by itemCompany;
select * from inventory ;

