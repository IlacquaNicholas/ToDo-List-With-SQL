CREATE TABLE  toDoList (
	"id" SERIAL PRIMARY KEY,
	"category"  varchar, 
	 "task" varchar,
	 "completed" varchar
);

INSERT INTO toDoList 
("category", "task","completed")
VALUES
('Bathroom', 'Need to clean the toliets and bath tubes','No' ),
('Shopping', 'Got to target and Cub Foods', 'No');