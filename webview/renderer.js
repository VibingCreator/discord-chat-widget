window.bridge.ipcRendererOn("ping", (event, arg) => {
    console.log(arg);
    event.sender.send("pong", "Pong!");
});