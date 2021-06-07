const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const ws = require("./core/WebSocketManager/WebSocketManager.js");
const hb = require("./core/heartbeat/heartbeat.js");

// process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "./preload.js"),
    }
  });

  mainWindow.loadFile("./webview/index.html");
  mainWindow.show();

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("ping", "Ping!");
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("pong", (event, arg) => {
  console.log(arg);
});

ws.on("open", () => {
  ws.isConnected = true;
  console.log("opened a connection with the endpoint");
});

ws.on("message", (data) => {
  const { t, s, op, d } = JSON.parse(data);

  switch(op) {
    case 10:
      hb.interval = d.heartbeat_interval;
      setTimeout(hb.identify, (hb.interval * Math.random()));

      break;
    
    case 11:
      console.log("heartbeat ACK");
      break;
    
    default:
      break;
  }
});

ws.on("close", () => {
  ws.isConnected = false;
  console.log("connection with the endpoint has been terminated");
});