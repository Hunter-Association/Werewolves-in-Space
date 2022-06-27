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

io.on('connection', socket => {

  socket.on('join-game', async (gameID, player) => {
    socket.player = player;
    socket.gameID = gameID;
    // playerMap.set(socket.id, player);
    socket.gameID = gameID;
    socket.join(gameID);

    const allPlayers = await io.in(gameID).allSockets();
    const playersArr = [...allPlayers].map(sktID => playerMap.get(sktID));
    io.to(gameID).emit('player-joined', playersArr);
  })
  socket.on('ready', (player) => {
    io.to(gameID).emit('')
  })
  socket.on('vote', (gameID, player, suspect) => {
    io.to(gameID).emit('player-voted', player, suspect)
  })
  socket.on('voteToEat', (gameID, player, astronaut) => {
    io.to(gameID).emit('werewolf-spotted', player, astronaut)
  })
  socket.on('murdered', (gameID, player, victim) => {
    io.to(gameID).emit('murdered', player, victim)
  })
  socket.on('disconnect', () => {
    io.emit('player-disconnected')
  })
  socket.on('game-over', (winningTeam) => {
    io.emit('game-over', winningTeam)
    clearInterval(roundsTimer)
  })
  socket.on('start-game', (gameID, roundLength = 120000) => {
    io.to(gameID).emit('game-started', roundLength)
    roundsTimer = setInterval(() => {
      io.to(gameID).emit('toggle-round')
    }, roundLength);
  })
  socket.on('chat-message', (gameID, player, msg) => {
    socket.join(gameID);
    !player.isAlive ?
    io.to(gameID).emit('chat-message', player, msg)
    :
    io.to(gameID).emit('dead-chat-message', player, msg);
  })

})

httpServer.listen(PORT, () => console.log('Listening on port:', PORT))
