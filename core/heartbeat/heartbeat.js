const ws = require("../WebSocketManager/WebSocketManager.js");
const payloads = require("./payloads/payloads.js");

class Heartbeat {
    interval = null;

    identify = () => {
        ws.send(payloads.identify);
        console.log("sent payload to identify");
        setTimeout(this.keepAlive, this.interval);
    }

    keepAlive = () => {
        ws.send(payloads.hello);
        console.log("sent payload to keep connection alive");
        setTimeout(this.keepAlive, this.interval);
    }
}

module.exports = new Heartbeat();