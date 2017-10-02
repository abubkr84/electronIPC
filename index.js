const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path')
const url = require('url')

let mainWindow;

app.on('ready', ()=>{
    console.log('app ready to go');
    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }));
});
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
      console.log('Videolength: ', metadata.format.duration);
      mainWindow.webContents.send('videolength', metadata.format.duration)
    })
});