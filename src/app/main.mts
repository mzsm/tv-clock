import { app, BrowserWindow } from 'electron'
import path from 'path'
import * as url from 'url'
import electronSquirrelStartup from 'electron-squirrel-startup'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 340,
    height: 132,
    resizable: false,
    transparent: true,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
    roundedCorners: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })
  // mainWindow.setIgnoreMouseEvents(true, {forward: true})

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL).then()
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)).then()
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode: 'undocked'})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
