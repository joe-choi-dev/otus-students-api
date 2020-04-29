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

**Bad Data Q** -- Firstly at the application layer apply validations on input which forces required parameters and rules one entry. For further validation at the db layer we apply constraints. This can include data-type, foreign-key, unique, regex, etc. In nodejs, usually this comes with your database querying library (ie. sequelize allows you to declare constraints on your db models). An example of a rule we would apply is making sure the email follows a specific regex email pattern. Both validation at the application and db layer would at the very least allow your data to conform to your set rules. 
Secondly, if bad data still enters the system, we can do cleaning and analysis via open source tools such as Google Refine. This would allow us to look through our data and apply transformation scripts to fix everything from typos to duplication errors. If we're simply looking to solve a particular bug (ie. removing a few strings from an autocomplete api), then we can just run a migration script that runs find and replace operations and make it a small pull request. 
