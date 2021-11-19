CREATE TABLE  toDoList (
	id SERIAL PRIMARY KEY,
	"category"  varchar, 
	 "task" varchar
);

INSERT INTO toDoList 
("category", "task")
VALUES
('Bathroom', 'Need to clean the toliets and bath tubes'),
('Shopping', 'Got to target and Cub Foods');