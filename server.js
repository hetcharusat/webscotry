const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });
console.log(`WebSocket server running on port ${PORT}`);
const clients = [];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Handle terminal input → send to all connected clients
rl.on('line', input => {
    clients.forEach(ws => ws.send(`Server: ${input}`));
});

// WebSocket connection
wss.on('connection', ws => {
    clients.push(ws);
    console.log('Frontend connected');

    // Handle incoming messages from frontend
    ws.on('message', msg => {
        console.log('Frontend:', msg.toString());
    });

    ws.on('close', () => {
        clients.splice(clients.indexOf(ws), 1);
        console.log('Frontend disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
