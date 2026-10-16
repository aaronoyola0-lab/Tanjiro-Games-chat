# Tanjiro Games Chat Server

Includes the shared public lounge plus private-code rooms for friends. Room chat history is kept in memory and clears when the server restarts.

## Deploy/update on Render
1. Replace the files in your existing GitHub repository with these files.
2. Commit and push the changes so Render redeploys the service.
3. Keep the existing service URL: `https://tanjiro-games-chat.onrender.com`.
4. Open the updated Tanjiro Games HTML file. Click **Developer Mode**, enter the UI password, choose a room name and a room code of at least 3 letters/numbers, then press **Create / Join**.
5. Friends use the same updated HTML and enter the exact same room code.

## Important
The developer password is checked in the HTML and is not strong security. Room codes are shared secrets, not encryption; anyone who knows a code can join. Do not use personal information as a code. Public lounge messages are still public.
