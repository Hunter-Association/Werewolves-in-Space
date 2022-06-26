const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const router = require('./routes');
const path = require('path');

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
app.use(router);

let map = new Map();
let rounds;
io.on('connection', socket => {

  socket.on('join-game', async (gameID, player) => {
    socket.player = player;
    socket.gameID = gameID;
    map.set(socket.id, player);
    socket.gameID = gameID;
    socket.join(gameID);

    const allPlayers = await io.in(gameID).allSockets();
    const playersArr = [...allPlayers].map(sktID => map.get(sktID));
    io.to(gameID).emit('player-joined', playersArr);
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
    clearInterval(rounds)
  })

  socket.on('start-game', (gameID, roundLength = 120000) => {
    io.to(gameID).emit('game-started', roundLength)
    rounds = setInterval(() => {
      io.to(gameID).emit('toggle-round')
    }, roundLength);
  })
})

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log('Listening on port:', PORT))