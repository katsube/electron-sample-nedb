const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myapi', {
    getRanking: async () => await ipcRenderer.invoke('getRanking')
  }
)