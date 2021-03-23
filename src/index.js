/**
 * メインプロセス
 *
 * @author M.Katsube <katsubemakito@gmail.com>
 */

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ranking = require('./ranking')

function createWindow (file) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  })

  win.loadFile(`public/${file}`)
}

app.whenReady().then( ()=>{
  createWindow('index.html')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


//----------------------------------------
// IPC通信
//----------------------------------------
// ランキングデータを返却
ipcMain.handle('getRanking', async (event) => {
  const data = await ranking.getData()
  return(data)
})