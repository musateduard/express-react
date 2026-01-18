## description

this is a showcase project of a distributed app with microservices architecture.
the project is structured as a monolith with the frontend and backend services located in the same repository.
the frontend is written in react using material ui components and the backend is written in express js with typescript and running on node js.
the backend uses mongodb for data storage and the app is deployed as a self contained docker compose app.


## requirements

- unix based os
- docker
- node


## running the app in dev mode

to run this app in dev mode you need to follow these steps:

1. start a mongodb docker container that is accessible from localhost
2. install backend dependencies
3. run the backend app
4. install frontend dependencies
5. run the frontend app


### start mongodb docker container

note: you need to run the mongodb container every time you run the app in dev mode

```bash
docker run -it --rm --publish 27017:27017 --name mongodb-dev mongo:8.2.3-noble
```


### install backend app dependencies

note: the backend app uses `mongoose` library for schema validation. you need to install all dependencies
before running the app, otherwise it won't start.

```bash
cd backend
npm install
```


### create backend .env file

necessary data like api urls need to be stored in a `.env` file.
this is for security purposes since `.env` files are to be accessible only at runtime and
are not to be committed to version control.

note: in a production environment the `.env` file would be provided either via docker secrets or environment variables.
for the purposes of this showcase, adding the files manually is sufficient.

place the `.env` file in the root backend folder

```
backend
  ∟ .env
```

when running in dev mode you need to add the following variables to `.env`

```bash
MONGO_URI="mongodb://localhost:27017/express_react"
ALLOWED_ORIGINS="http://localhost,http://localhost:5173"
```

when running the app from docker compose you need the following variables

```bash
MONGO_URI="mongodb://database:27017/express_react"
ALLOWED_ORIGINS="http://localhost,http://localhost:5173"
```


### start the express js app

```bash
cd backend
npm run dev
```


### install frontend dependencies

note: the frontend app uses `react` and `material ui` libraries. all packages need to be installed
before running the app, otherwise it won't start.

```bash
cd frontend
npm install
```


### create frontend .env file

place the `.env` file in the root frontend folder

note: in a production environment the `.env` file would be provided either via docker secrets or environment variables.
for the purposes of this showcase, adding the files manually is sufficient.

```
frontend
  ∟ .env
```

for both dev mode and docker compose add the following variable to the `.env` file

```bash
VITE_API_URL="http://localhost:3000"
```


### start the frontend app

after running the frontend app you can access it on `http://localhost:5173`

```bash
cd frontend
npm run dev
```


## deployment

### add execute permissions to the deployment script

to run the app in docker compose you need to add execute permissions to `deploy_to_docker.sh`

```bash
sudo chmod u+x deploy_to_docker.sh
```


### run the docker compose app

note: don't forget to update the `MONGO_URI` variable in your backend `.env` file

note: you can access the docker compose app at `http://localhost`

```bash
./deploy_to_docker.sh
```

alternately you can run the docker compose app manually without the deployment script

```bash
cd backend
npm run build
cd ..

cd frontend
npm run build
cd ..

docker compose up --build
```
