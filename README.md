# Tanjiro Games online chat server

This is the realtime server for the Secret Lounge in `Tanjiro_Games.html`.

## Deploy it online (Render example)

1. Put this folder in a GitHub repository (the repository should contain `server.js`, `package.json`, and this README at its root).
2. In Render, create **New + → Web Service** and connect that repository.
3. Use build command `npm install` and start command `npm start`. Choose a free instance if available to you.
4. After deployment, copy the service's public HTTPS URL, such as `https://your-service-name.onrender.com`.
5. Open `Tanjiro_Games.html` in a text editor and find `const TANJIRO_CHAT_SERVER_URL = 'https://YOUR-TANJIRO-CHAT-SERVER.onrender.com';`. Replace the placeholder with your real Render URL, keeping the quotes.
6. Save and share the updated HTML file with friends. Everyone needs to use that updated file and be online at the same time.

## Notes

- Messages are broadcast live to everyone connected to the same server.
- The latest 100 messages are kept in memory and are cleared when the service restarts.
- This prototype does not have accounts, private messages, persistent storage, or strong abuse prevention. Anyone who knows the server URL can connect. Don't share personal details; only use a nickname. For a public release, add moderation, reporting/blocking, authentication, and stricter origin/rate controls.
- Socket.IO's browser client is loaded from its public CDN by the HTML file, so the client needs internet access.
