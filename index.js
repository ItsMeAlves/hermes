let url = require('url');
let path = require('path');
let electron = require('electron');
let { app, BrowserWindow } = electron;

app.on('ready', () => {
    let window = new BrowserWindow({
	width: 800,
	height: 600,
	icon: path.join(__dirname, 'icon.png')
    });

    let windowRequest = window.webContents.session.webRequest;
    windowRequest.onHeadersReceived({}, (request, done) => {

	if(request.responseHeaders['X-Frame-Options'])
	    delete request.responseHeaders['X-Frame-Options'];
	if(request.responseHeaders['x-frame-options'])
	    delete request.responseHeaders['x-frame-options'];

	done({cancel: false, responseHeaders: request.responseHeaders});
    });

    window.on('closed', () => {
	window.removeAllListeners();
	window = null;

	process.exit(0);
    });

    window.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	slashes: true,
	protocol: 'file:'
    }));
});
