# VUTTR — Very Useful Tools to Remember(API)

These is APIs for a challenge project of BossaBox

## Table of Contents
- [Installation](#installation)
> - [DataBase](#database)
>> - [By NPM](#by-npm)
>> - [Manualy](#manualy)
- [Running](#running)
- [Documentation](#api-documentation)
- [Test](#test)

## Installation
To install VUTTR use:
```bash
npm install
```

### DataBase
VUTTR use MySQL, [Sequelize](http://docs.sequelizejs.com/) and [Sequelize-cli](https://github.com/sequelize/cli).

Configurations are set to use a localhost on 3306 port. If you need to change database configuration edit: ./config/config.json.

To create and populate dataBase you have two options:

##### By NPM
 To create database schema, tables and populate it with test data:
```bash
npm run dataBase
```

##### Manualy
To create database schema:
```bash
./node_modules/.bin/sequelize db:create
```

To create tables:
```bash
./node_modules/.bin/sequelize db:migrate
```

To populate with test data:
```bash
./node_modules/.bin/sequelize db:seed:all
```

## Running
This project run by default on port 3000 and need a MySql database runing on port 3306

> * To start the APIs:
> ```bash
> npm start
> ```

 > * To change de default port:
 > ```bash
 >set PORT=YOU_PORT && node vuttr
 >```

 > * To change database connection configuration edit: ./data/connection.js

## API Documentation
These APIs are documented on [API BluePrint](https://apiblueprint.org/), to detailed documentation see [api.apib](https://github.com/david-pbarros/vuttrBack/blob/master/doc/api.apib) file.

To see a user friendly version use [html](https://htmlpreview.github.io/?https://github.com/david-pbarros/vuttrBack/blob/master/doc/api.html) version

 ## Test
Vuttr use [Dredd](https://github.com/apiaryio/dredd) to run integration test. 

You can run test by:
```bash
npm test
```
