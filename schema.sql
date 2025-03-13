-- Target: PostgreSQL

-- NOTE: This script is not complete. Unfortunately, some fields and tables have not been documented.


-- If the database exists, drop it and create a new one
DROP DATABASE IF EXISTS employeeportal;
CREATE DATABASE employeeportal;

-- Employees
CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(128),
    phone VARCHAR(15),
    hoursWorked INTEGER ,
    leaveBalance INTEGER,
    canPost BOOLEAN,
    manager INTEGER,
    account_type VARCHAR(255)
);

-- Address
CREATE TABLE Address (
    id INTEGER PRIMARY KEY,
    house_no VARCHAR(45) NOT NULL,
    street VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    postcode VARCHAR(45) NOT NULL,
    country VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES Employees (id)
);

-- Post
CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    body TEXT NOT NULL,
    date DATE NOT NULL,
    author INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES Employees (id)
);

-- PostReplies (A table to store the replies on a post)
CREATE TABLE PostReplies (
    id INTEGER NOT NULL,
    replyTo INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES Post (id),
    FOREIGN KEY (replyTo) REFERENCES Post (id),
    PRIMARY KEY (id, replyTo)
);

-- Issue
CREATE TABLE Issue (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    author INTEGER NOT NULL,
    solved BOOLEAN NOT NULL,
    FOREIGN KEY (author) REFERENCES Employees (id)
);

-- FAQ
CREATE TABLE FAQ (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- CompanyProgram
CREATE TABLE CompanyProgram (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255) NOT NULL
);

-- Training
CREATE TABLE Training (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL
);

-- TrainingMembers (A table to store the members of a training)
CREATE TABLE TrainingMembers (
    training_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (training_id) REFERENCES Training (id),
    FOREIGN KEY (employee_id) REFERENCES Employees (id),
    PRIMARY KEY (training_id, employee_id)
);

-- HR Ticket
CREATE TABLE Ticket (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    submittedBy INTEGER NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (submittedBy) REFERENCES Employees (id)
);

-- LeaveRequest (Child of Ticket Class)
CREATE TABLE LeaveRequest (
    id INTEGER PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason TEXT NOT NULL,
    accepted BOOLEAN default NULL,
    FOREIGN KEY (id) REFERENCES Ticket (id)
);

-- Resource
CREATE TABLE Resource (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255) NOT NULL
);

-- Network (A group for employees to join)
CREATE TABLE Network (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL
);

-- NetworkMembers (A table to store the members of a network)
CREATE TABLE NetworkMembers (
    network_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (network_id) REFERENCES Network (id),
    FOREIGN KEY (employee_id) REFERENCES Employees (id),
    PRIMARY KEY (network_id, employee_id)
);

-- Achievements
CREATE TABLE Achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    date DATE NOT NULL,
    recipient INTEGER NOT NULL,
    FOREIGN KEY (recipient) REFERENCES Employees (id)
);

-- Document
CREATE TABLE Document (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    owner INTEGER NOT NULL,
    uploadDate DATE NOT NULL,
    url varchar NOT NULL,
    type VARCHAR(255),
    FOREIGN KEY (owner) REFERENCES Employees (id)
);

-- DocumentAccess (A table to store the employees who have access to a document)
-- By default, the uploader of the document has access to it
CREATE TABLE DocumentAccess (
    document_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    role VARCHAR(255), -- Every employee of this role can access the document
    FOREIGN KEY (document_id) REFERENCES Document (id),
    FOREIGN KEY (employee_id) REFERENCES Employees (id),
    PRIMARY KEY (document_id, employee_id)
);

-- Add the foreign key constraint for manager after the table creation
ALTER TABLE Employees ADD CONSTRAINT fk_manager FOREIGN KEY (manager) REFERENCES Employees (id);