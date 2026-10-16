const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

const app = express();
app.get('/', (_req, res) => res.type('text').send('Tanjiro Games chat server is online.'));
app.get('/health', (_req, res) => res.json({ ok: true, service: 'tanjiro-games-chat' }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  maxHttpBufferSize: 10_000,
  connectionStateRecovery: { maxDisconnectionDuration: 2 * 60 * 1000 }
});

// Short in-memory history only; messages disappear when the server restarts.
const history = [];
const lastSentAt = new Map();
const MAX_HISTORY = 100;
const cleanText = (v, max) => String(v ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);

io.on('connection', socket => {
  socket.emit('chat:history', history);
  socket.on('chat:join', data => {
    socket.data.displayName = cleanText(data?.name, 24) || 'Tanjiro Fan';
  });
  socket.on('chat:send', data => {
    const now = Date.now();
    const previous = lastSentAt.get(socket.id) || 0;
    if (now - previous < 900) {
      socket.emit('chat:error', 'Slow down a little before sending another message.');
      return;
    }
    const name = cleanText(data?.name, 24) || socket.data.displayName || 'Tanjiro Fan';
    const text = cleanText(data?.text, 500);
    if (!text) return;
    lastSentAt.set(socket.id, now);
    const message = { id: crypto.randomUUID(), name, text, at: now };
    history.push(message);
    if (history.length > MAX_HISTORY) history.shift();
    io.emit('chat:message', message);
  });
  socket.on('disconnect', () => lastSentAt.delete(socket.id));
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => console.log(`Tanjiro Games chat listening on ${port}`));
