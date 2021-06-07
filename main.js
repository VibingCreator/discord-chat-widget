const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

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