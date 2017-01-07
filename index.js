const path = require('path');
const url = require('url');

const electron = require('electron');
const {app, BrowserWindow, session} = electron;

const htmlPath = path.join(__dirname, 'html');

app.on('ready', () => {
    var mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        if(details.responseHeaders['x-frame-options']) {
            delete details.responseHeaders['x-frame-options'];
        }
        callback({cancel: false, responseHeaders: details.responseHeaders});
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(htmlPath, 'index.html'),
        slashes: true,
        protocol: 'file:'
    }));
});
