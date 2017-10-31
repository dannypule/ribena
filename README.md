# Node, Postgres, Typescript starter seed project (https://github.com/dannypule)

## Prereqs

Node 6.10.x or a higher LTS release

NPM 3.x.x

An `.env` file - speak to your project's maintainter or setup your configuration. An example `.env-example` file is included with this project for your reference.

## Getting started

`npm install`

`npm run dev` (run in dev mode)

`npm run debug` (run in debug mode)

## Setting up the database

This project is configured to run with an external Postgres database. Heroku have a free add-on which you can use with an existing application.

When you have your postgres database details ready, enter them into the .env file.

To seed the db with demo data, run this command `npm run setup:db`

View your database data using this test command `http://localhost:5566/api/users`

### Contributor(s) Danny Pule - open sourced under the MIT Liscense https://github.com/dannypule
