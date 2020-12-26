const GameSession = require('./GameSession.js');
var app = require('express')();
var http = require('http').createServer(app);

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
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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


// GameBoard object
io.on('connection', socket => {
    const unregisterListeners = () => {
      socket.removeAllListeners('join-game');
      socket.removeAllListeners('new-game');
    }

    console.log("Socket Has Connected!");
    // Join Game listeners
    socket.on("join-game", gameCode => {
      const session = gameSessions[gameCode];
      if (!session) {
        socket.emit('invalid-code', "No game was found matching that game code!");
      }
      else if (session.numConnections == 2) {
        socket.emit('invalid-code', "Game is full!");
      }
      else {
        unregisterListeners();
        const sessionData = { gameCode: gameCode, numPlayers: session.numConnections };
        socket.emit('joined-game', sessionData);
        // Let the other player know that someone else has joined!
        session.broadcast('joined-game', sessionData);
        session.addConnection(socket);
      }
    });

    socket.on('new-game', () => {
      // First thing we do is unregister any more listeners.
      unregisterListeners();

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
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});