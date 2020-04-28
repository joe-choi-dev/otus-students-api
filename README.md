# otus-students-api

Otus-students-api is the backend part of the coding challenge for Otus using nodejs and express.

## Installation

Use the npm to install otus-students-api. 

Node Version = 10.15.3

```bash
npm install
```

## Usage

```bash
npm start
```

The server will run on localhost:3000

## Write Up

I would design the SQL DB as follows:  

**Students**  
id - Integer (pk)   
firstName - Varchar   
lastName - Varchar  
email - Varchar  
createdAt - Datetime    
updatedAt - Datetime         

**Classes**  
id - Integer (pk)  
name - Varchar   
createdAt - Datetime    
updatedAt - Datetime      

**Enrollments**  
id - Integer (pk)   
studentId - Integer (fk - Students)  
classId - Integer (fk - Classes)    
grade - Decimal  
createdAt - Datetime    
updatedAt - Datetime

**Summary** -- The Students to Enrollments and Classes to Enrollments relationships are both 1 to many.
This would allow for adding class specific api's later on (ie. search by class, get all classes, and schedule changes).
