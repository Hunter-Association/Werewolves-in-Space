const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const router = require('./routes');
const path = require('path');
const { playerMap, roundsTimer } = require('./models/serverState');

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
app.use(router);

io.on('connection',  (socket) => {

  socket.on('join-game', async (gameID, player) => {
    socket.player = player;
    socket.gameID = gameID;
    playerMap.set(socket.id, player);
    socket.gameID = gameID;
    socket.join(gameID);

    const allPlayers = await io.in(gameID).allSockets();
    const playersArr = [...allPlayers].map(sktID => playerMap.get(sktID));
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

const PORT = process.env.PORT || 3000;

// Please dont touch this. This wont break your routes, and is equivelent to app.listen()
httpServer.listen(PORT, () => console.log('Listening on port:', PORT))
