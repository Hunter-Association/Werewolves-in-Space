const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const router = require('./routes');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv').config();
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.use(router);

app.use(express.static(path.join(__dirname, './public')))
const PORT = process.env.PORT || 3000;


//=====SOCKETS==================
const playerMap = {};
const gameState = {
  isDay: true,
  isDone: false,
  winners: '',
}

io.on('connection', socket => {

  socket.on('join-game', async (gameID, player) => {
    playerMap[socket.id] = player;
    socket.join(gameID);
    const allPlayers = await io.in(gameID).allSockets();
    const playersArr = [...allPlayers].map(sktID => playerMap[sktID]);
    gameState.players = playersArr;
    io.to(gameID).emit('player-joined', playersArr);
  })
  socket.on('ready', (player, gameID) => {
    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].username === player.username) {
        gameState.players[i].charDex = player.charDex;
        gameState.players[i].status = true;
      }
    }
    console.log(player.charDex);
    io.to(gameID).emit('ready', player)
  })
  socket.on('start-game', (gameID) => {
    //start timer
    gameState.players[0].isWolf = true;
    io.to(gameID).emit('game-started', gameState.players)
  })
  socket.on('suspect', (gameID, player, suspect) => {
    // console.log(gameID)
    // console.log("🚀 suspect", suspect);
    // console.log("🚀 player",  player);

    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].username === player.username) {
        console.log('preSus', gameState)
        gameState.players[i].suspect = suspect;
      }
      console.log('postSus', gameState)
    }
    io.to(gameID).emit('state-change', gameState)
  })
  socket.on('lockIn', (gameID, player, colonist) => {
    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].username === player.username) {
        gameState.players[i].isLockedIn = true;
        gameState.players[i].suspect.votesAgainst += 1;
        gameState.players.forEach(p => {
          if (p.username === gameState.players[i].suspect.username) {
            p.votesAgainst += 1;
          }
        })
      }
    }
    if (gameState.players.every((p) => p.isLockedIn)) {
      let victim = {votesAgainst: 0};
      gameState.players.forEach((p) => {
        if (p.votesAgainst > victim.votesAgainst) {
          victim = p;
        }
      })
      gameState.players.forEach((p) => {
        if (p.username === victim.username) {
          p.isDead = true;
        }
      })
      if (gameState.players.filter((p) => !p.isDead).length === 2) {
        console.log('problem is in your wolves win condition ')
        gameState.isDone = true;
        gameState.winners = 'wolves';
      }
      if (gameState.players.filter((p) => p.isDead && p.isWolf).length !== 0) {
        console.log('problem is in your wolves colonists condition ')
        gameState.isDone = true;
        gameState.winners = 'Colonists'
      }
      gameState.isDay = false;
    }
    let data = {...gameState}
    if (gameState.isDone) {
      gameState.players = [];
      gameState.isDay = true;
      gameState.winners = '';
      gameState.isDone = false;
    }
    io.to(gameID).emit('state-change', data)

  })
  socket.on('eat', (gameID, victim) => {
    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].username === victim.username) {
        gameState.players[i].isDead = true;
      }
    }
    if (gameState.players.filter((p) => !p.isDead).length === 2) {
      gameState.isDone = true;
      gameState.winners = 'wolves';
    }
    gameState.isDay = true;
    let data = {...gameState};
    if (gameState.isDone) {
      gameState.players = [];
      gameState.isDay = true;
      gameState.winners = '';
      gameState.isDone = false;
    }
    gameState.players.forEach(p => {
      if (!p.isDead) {
        p.isLockedIn = false;
      }
    });
    io.to(gameID).emit('state-change', data)
  })
  socket.on('chat-message', (gameID, player, msg) => {
    !player.isDead ?
    io.to(gameID).emit('chat-message', player, msg)
    :
    io.to(gameID).emit('dead-chat-message', player, msg);
  })
})

httpServer.listen(PORT, () => console.log('Listening on port:', PORT))
