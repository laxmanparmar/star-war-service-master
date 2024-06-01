## Repo Purpose
This is a star-war server, which provide planets/Character details and we can create new planets/characters.


## Prerequisite
1. Postgres db should be running
2. update the .env file with connection string url to postgres server

Note: restarting the server result in deleting all data.

To run the application
1. Once following the `prerequisite` steps
1. do `npm i`
2. run `npm run start`


## `npm run migrate`
To add(Migrate the db)
To create a table in db run below command

## `npm run seed`
To seed the database with existing data
    To add or update seeds data please update it under `data/seeds` directory

    it would be update when the server run. to explicitly update it

    run below command

## `npm run start`
 This command deletes all tables, create table again, seed data from `data/seeds` directory
 and run the apollo graphql server


## `npm run local`
 Runs the application.

To run the app as docker first build the docker image of the app as
go to the app directory with the Dockerfile. Now build the container image using the docker build command.

`docker build -t strapiserrver:latest .`

to run `docker run --rm -d  -p 3000:3000/tcp strapiserver:latest <`

App would be hosted on `localhost:3000/graphql`
