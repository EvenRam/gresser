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
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "phone_number" bigint,
    "location" text,
    "union_affiliation" text,
    "employee_number" bigint, -- assuming Employee_Number is a numeric field
    "email" text NOT NULL,
    "password" text NOT NULL,
    "roleId" bigint,
    "active" boolean
    
);

CREATE TABLE IF NOT EXISTS "Jobs" (
	"JobID" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"JobName" text NOT NULL,
	"Location" text NOT NULL,
	"StartDate" date NOT NULL,
	"EndDate" date NOT NULL,
	PRIMARY KEY ("JobID")
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