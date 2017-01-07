const path = require('path');
const url = require('url');

const electron = require('electron');
const {app, BrowserWindow, session} = electron;
const {webRequest} = session.defaultSession;

const pathTo = {
    resourcesPath: path.join(__dirname, 'resources'),
    resources: function(file) {
        return path.join(this.resourcesPath, file);
    }
};

app.on('ready', () => {
    var mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    webRequest.onHeadersReceived((details, callback) => {
        if(details.responseHeaders['x-frame-options']) {
            delete details.responseHeaders['x-frame-options'];
        }
        callback({
            cancel: false,
            responseHeaders: details.responseHeaders
        });
    });

    mainWindow.loadURL(url.format({
        pathname: pathTo.resources('index.html'),
        slashes: true,
        protocol: 'file:'
    }));
});
