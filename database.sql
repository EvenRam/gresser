-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "user" (
 	 
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (1000) NOT NULL,
    "last_name" VARCHAR (1000) NOT NULL,
    "phone_number" bigint,
    "location" VARCHAR (2000),
    "union_affiliation" VARCHAR (1000),
    "employee_number" bigint, -- assuming Employee_Number is a numeric field
     "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "roleId" bigint,
    "active" boolean
    
);




CREATE TABLE "jobs" (
	"job_id" SERIAL PRIMARY KEY,
	"job_number" INT, 
	"job_name" VARCHAR (1000),
	"location" VARCHAR (1000),
	"start_date" date,
	"end_date" date,
	"status" boolean
);

CREATE TABLE "add_employee" (
	"id" SERIAL PRIMARY KEY, 
	"first_name" VARCHAR(80),
	"last_name" VARCHAR(80),
	"employee_number" VARCHAR(80),
	"union_id" VARCHAR(80),
	"employee_status" BOOLEAN,
	"phone_number" VARCHAR(80),
	"email" VARCHAR(80),
	"address" VARCHAR(120)
);

INSERT INTO "add_employee" 
("first_name", "last_name", "employee_number", "union_id", "employee_status", "phone_number", "email", "address") 
VALUES ('John', 'Doe', '12345', '67890', 'true', '123-456-7890', 'john.doe@example.com', '123 Main St');