const GameSession = require('./GameSession.js');
const express = require('express');
var app = express();
var http = require('http').createServer(app);

// Load .env file
require('dotenv').config();

const io = require('socket.io')(http, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
});

const gameSessions = {};

// Returns random value in [min, max] (inclusive bounds).
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGameCode() {
  let charStr = "";

  for (let i = 0; i < 4; i++) {
    const unicodeVal = 97 + getRndInteger(0, 25);
    const unicodeChar = String.fromCharCode(unicodeVal);
    charStr += unicodeChar;
  }

  return charStr;
}

function unregisterSocketListeners(socket) {
  socket.removeAllListeners('join-game');
  socket.removeAllListeners('new-game');
}

function registerSocketListeners(socket) {
  socket.on("join-game", gameCode => {
    const session = gameSessions[gameCode];
    if (!session) {
      socket.emit('joined-game', { error:  "No game was found matching that game code!" });
    }
    else if (session.numConnections == 2) {
      socket.emit('joined-game', { error:  "Game is full!" });
    }
    else {
      unregisterSocketListeners(socket);
      const sessionData = { gameCode: gameCode, numPlayers: session.numConnections };
      socket.emit('joined-game', sessionData);
      // Let the other player know that someone else has joined!
      session.broadcast('joined-game', sessionData);
      session.addConnection(socket);
    }
  });

  socket.on('new-game', () => {
    // First thing we do is unregister any more listeners.
    unregisterSocketListeners(socket);

    var gameCode = generateGameCode();
    while (gameSessions[gameCode]) {
      gameCode = generateGameCode();
    }

    const session = new GameSession();
    gameSessions[gameCode] = session;
    session.onEndGame(() => {
      // Remove property
      delete gameSessions[gameCode];
    });

    socket.emit('joined-game', { gameCode: gameCode, numPlayers: session.numConnections });
    session.addConnection(socket);

    // Add a listener for cancelling game creation
    socket.on('cancel-creation', (gameCode) => {
      // Remove listener to prevent double
      socket.removeAllListeners('cancel-creation');
      const session = gameSessions[gameCode];
      // No session exists.
      if (!session)
        return;
  
      // If two players are connected, it's too late to cancel.
      if (session.numConnections == 2)
        return;
  
      delete gameSessions[gameCode];
  
      // We must re-register all the listeners for the socket
      registerSocketListeners(socket);
    });
  });
}

// GameBoard object
io.on('connection', socket => {
  // Join Game listeners
  registerSocketListeners(socket);
});

// Heroku does not bind to 3000, so read the port if set.
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Listening on port ' + port);
});

const NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();
console.log("Running in " + NODE_ENV + " environment!");
if (NODE_ENV == 'production' || NODE_ENV == 'prod') {
  const staticFileMiddleware = express.static('dist');
  app.use(staticFileMiddleware);
}