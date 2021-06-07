const WebSocket = require("ws");

class WebSocketManager {
    endpoint = "wss://gateway.discord.gg/?v=9&encoding=json";
    isConnected = false;
    ws = null;

    constructor() {
        this.ws = new WebSocket(this.endpoint);
    }

    send = (payload) => {
        return this.ws.send(JSON.stringify(payload));
    }

    on = (event, callback) => {
        return this.ws.on(event, (...args) => callback(...args));
    }
}

module.exports = new WebSocketManager();