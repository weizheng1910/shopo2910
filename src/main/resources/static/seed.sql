/* 
psql -d store -f tables.sql
 
*/

INSERT INTO products (id, name, description, cost, image) VALUES(1256,'Apple', 'Granny Smith', 0.70, 'https://i.imgur.com/a0GoVAp.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1111, 100, (SELECT id FROM products WHERE name='Apple'));

INSERT INTO products (id, name, description, cost, image) VALUES(1356,'Mango', 'Fairchild', 1.20, 'https://i.imgur.com/EqX6F2A.jpg');
INSERT INTO inventories (id, quantity, product_id) VALUES(1112, 100, (SELECT id FROM products WHERE name='Mango'));

INSERT INTO products (id, name, description, cost, image) VALUES(1456,'Longan', 'Chompoo (per 100g)', 1.35, 'https://i.imgur.com/Gw9hL89.jpg');
INSERT INTO inventories (id, quantity, product_id) VALUES(1113, 100, (SELECT id FROM products WHERE name='Longan'));

INSERT INTO products (id, name, description, cost, image) VALUES(1556,'Dragonfruit', 'Pritaya', 1.90, 'https://i.imgur.com/xVVKcwl.jpg');
INSERT INTO inventories (id, quantity, product_id) VALUES(1114, 100, (SELECT id FROM products WHERE name='Dragonfruit'));

INSERT INTO products (id, name, description, cost, image) VALUES(1656,'Lychee', 'China (per 100g)', 3.45, 'https://i.imgur.com/GufEU0D.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1115, 100, (SELECT id FROM products WHERE name='Lychee'));

INSERT INTO products (id, name, description, cost, image) VALUES(1789,'Guava', 'Ruby Supreme', 4.90, 'https://i.imgur.com/aNoOKTt.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1116, 100, (SELECT id FROM products WHERE name='Guava'));

INSERT INTO products (id, name, description, cost, image) VALUES(2876,'Orange', 'Blood', 2.30, 'https://i.imgur.com/84hQaDs.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1117, 100, (SELECT id FROM products WHERE name='Orange'));

INSERT INTO products (id, name, description, cost, image) VALUES(2985,'Grapefruit', 'Greenish', 2.10, 'https://i.imgur.com/pRdbN1I.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1118, 100, (SELECT id FROM products WHERE name='Grapefruit'));

INSERT INTO products (id, name, description, cost, image) VALUES(2999,'Papaya', 'Dole', 5.20, 'https://i.imgur.com/tOvKQze.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1119, 100, (SELECT id FROM products WHERE name='Papaya'));

INSERT INTO products (id, name, description, cost, image) VALUES(3211,'Strawberry', 'Himalayan (per 100g)', 9.40, 'https://i.imgur.com/dtZWKFR.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1120, 100, (SELECT id FROM products WHERE name='Strawberry'));

INSERT INTO products (id, name, description, cost, image) VALUES(3333,'Blueberry', 'Tibetan (per 100g)', 9.34, 'https://i.imgur.com/gqfFCmP.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1121, 100, (SELECT id FROM products WHERE name='Blueberry'));

INSERT INTO products (id, name, description, cost, image) VALUES(3422,'Banana', 'Brazillian (per 100g)', 2.34, 'https://i.imgur.com/LnMJkOt.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1122, 100, (SELECT id FROM products WHERE name='Banana'));

INSERT INTO products (id, name, description, cost, image) VALUES(3433,'Avocado', 'Tibetan', 3.45, 'https://i.imgur.com/1cfpIkN.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1123, 100, (SELECT id FROM products WHERE name='Avocado'));

INSERT INTO products (id, name, description, cost, image) VALUES(3785,'Mangosteen', 'Pakistan', 1.20, 'https://i.imgur.com/yJp0ONY.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1124, 100, (SELECT id FROM products WHERE name='Mangosteen'));

INSERT INTO products (id, name, description, cost, image) VALUES(4561,'Kiwi', 'African', 1.20, 'https://i.imgur.com/72zkMFf.png');
INSERT INTO inventories (id, quantity, product_id) VALUES(1125, 100, (SELECT id FROM products WHERE name='Kiwi'));

