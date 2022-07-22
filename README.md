# SKillbox
## An Online Inventory Management Solution

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Skillbox is a single page application to allow user to manage multiple warehouses and its inventory.


## Folder and Files

- apache-tomcat : tomcat server to run the backend 
- inventory-app : angular application for the frontend 
- maven-inventory: java JDBC/Servelet backend application 
- table-generator: MySQL file to generate your table 

## ER Diagram 

![alt text](https://i.imgur.com/OkHzlhZ.png)


## Installation
To run the frontend . Do the following commands : 

```
cd inventory-app
npm install
ng serve
```

To run the backend : Use Spring Boot Suite and import the maven-invetory file and then deploy your application 
on a working Tomcat server

## License

MIT
