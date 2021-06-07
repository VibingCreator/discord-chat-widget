const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  ipcRendererSend: (channel, payload) => ipcRenderer.send(channel, payload),
  ipcRendererOn: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(event, ...args))
});