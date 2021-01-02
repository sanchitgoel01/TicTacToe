# Multiplayer Tic Tac Toe

## Project Requirements
This project requires `nodejs` and `npm`. 

## Project setup
Contains both a frontend and backend. It's recommended in development to run both separately.

The frontend uses `yarn`, while the backend uses `npm`. 
To setup the frontend, go into the `frontend` directory and run `yarn install`.
To set up the backend, go into the `backend` directory and run `npm install`. The backend also requires a `.env` file,
which can be copied and modified from the provided `.env-sample`. 

## Running in Development
Start the backend first by going into the `backend` directory and running `node server.js` which will listen on host `localhost:3000`.
Then, to start the frontend, go into the `frontend` directory and run `yarn serve` which can be accessed by `localhost:8080`
in the browser. 

## Running in Production
The application can be ran as a simple node app. Just build the frontend distribution and copy it into the backend.
Do this by going into the `frontend` directory and running `yarn build`, then copy the `dist` folder into the `backend` directory. Make sure to set the `NODE_ENV` to `production` in the backend `.env` file. Once that is done, the application
can be ran by doing `node server.js` and visiting `localhost:3000` in the browser.
