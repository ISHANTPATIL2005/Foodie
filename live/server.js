const WebSocket = require("ws");

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log("🟢 WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
    console.log("🟡 New client connected");

    // Receive message from client
    ws.on("message", (message) => {
        console.log("📩 Received:", message.toString());

        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("🔴 Client disconnected");
    });

    ws.onmessage = (e) => console.log("From server:", e.data);

    ws.onopen = () => {
        ws.send("Hello from client");
    };


});





