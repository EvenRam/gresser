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
    "status" VARCHAR(20) DEFAULT 'active'
	);


CREATE TABLE rain_days (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(job_id),
  date DATE NOT NULL,
  UNIQUE(job_id, date)
);


CREATE TABLE "project" (
  "id" SERIAL PRIMARY KEY,
  "project_name" VARCHAR(80)
);
INSERT INTO "project" ("project_name")
VALUES ('2200 - Minneapolis'),
	('2100 - St. Paul'),
	('2456 - Brooklyn Park'),
	('2250 - West Bank Minneapolis'),
	('2130 - Fairview');
	
CREATE TABLE "add_employee" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(80),
	"last_name" VARCHAR(80),
	"employee_number" VARCHAR(80),
	"union_id" VARCHAR(80),
	"employee_status" BOOLEAN,
	"phone_number" VARCHAR(80),
	"email" VARCHAR(80),
	"address" VARCHAR(120),
	 "project_id" INT,
  FOREIGN KEY ("project_id") REFERENCES "project" ("id")
);
--Insert Values with construction guy names
INSERT INTO "add_employee"
("first_name", "last_name", "employee_number", "union_id", "employee_status", "phone_number", "email", "address", "project_id")
VALUES
('John', 'Smith', '10001', '20001', 'true', '555-123-4567', 'john.smith@example.com', '101 First St', '1'),
('Mike', 'Johnson', '10002', '20002', 'true', '555-234-5678', 'mike.johnson@example.com', '102 Second St', '2'),
('Dave', 'Brown', '10003', '20003', 'true', '555-345-6789', 'dave.brown@example.com', '103 Third St', '3'),
('Tom', 'Davis', '10004', '20004', 'true', '555-456-7890', 'tom.davis@example.com', '104 Fourth St', '4'),
('Jim', 'Miller', '10005', '20005', 'true', '555-567-8901', 'jim.miller@example.com', '105 Fifth St', '5'),
('Steve', 'Wilson', '10006', '20006', 'true', '555-678-9012', 'steve.wilson@example.com', '106 Sixth St', '1'),
('Bob', 'Moore', '10007', '20007', 'true', '555-789-0123', 'bob.moore@example.com', '107 Seventh St', '2'),
('Dan', 'Taylor', '10008', '20008', 'true', '555-890-1234', 'dan.taylor@example.com', '108 Eighth St', '3'),
('Joe', 'Anderson', '10009', '20009', 'true', '555-901-2345', 'joe.anderson@example.com', '109 Ninth St', NULL);