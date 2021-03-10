const { app, BrowserWindow } = require("electron");

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 700,
    height: 600,

    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.setBounds({
  //   x: 1920 / 2,
  //   y: 1080 / 2,
  //   width: 500,
  //   height: 400,
  // });
  // const winBounds = win.getBounds();

  // console.log(winBounds);

  win.loadFile("index.html");

  var ipcMain = require("electron").ipcMain;
  ipcMain.on("asynchronous-message", function (evt, message) {
    if (message == "createNewWindow") {
      // Message received.
      // Create new window here.
    }
  });
  // win.setFullScreen(true);

  // win.webContents.on("requestBounds", (event, bounds) => {
  //   win.webContents.send("bounds", win.getBounds());
  // });
  // win.maximize();
}

function initBot() {
  // bot integration

  const DiscordBot = require("./DiscordBot").DiscordBot;
  const Bot = new DiscordBot(win);

  // const DiscordBotController = require("./DiscordBotController")
  //   .DiscordBotController;
  // const Bot = new DiscordBotController(
  //   "ODEyNDU3Mjk2NTU0MzYwODMy.YDBB0g.RdNLbCWOzkKaTQvojc1P9QuZcFQ"
  // );
  // const DiscordBotArduino = require("./DiscordBotArduino").DiscordBotArduino;
  // const Bot = new DiscordBotArduino(
  //   "ODEyNDU3Mjk2NTU0MzYwODMy.YDBB0g.RdNLbCWOzkKaTQvojc1P9QuZcFQ"
  // );
}

app.allowRendererProcessReuse = false;

app.whenReady().then(createWindow).then(initBot);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
