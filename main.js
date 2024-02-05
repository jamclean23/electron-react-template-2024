// Entry point for electron


// ====== IMPORTS ======

// System
const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');


// ====== FUNCTIONS ======

async function main () {
    
    // Waits for app to be ready and display window
    await app.whenReady()
    const win = createWindow(1000, 600, './templates/index/index.html', true);

    // Add event listeners to app
    addEventListeners();

}

/**
 * @param {Number} width - Initial width of browser window
 * @param {Number} height - Initial height of the browser window
 * @param {String} template - Path to html file
 * @param {Boolean} toolbar - If false, removes toolbar from browser window
 * @returns Electron window object
 */
function createWindow (width = 600, height = 300, template, toolbar = true) {

    // Initialize a new browser window object
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        width,
        height
    });

    // Sets template if provided
    if (template) {
        win.loadFile(template);
    }

    // Removes menubar if specified
    if (!toolbar) {
        win.setMenu(null);
    }

    return win;
}

function addEventListeners () {

    // Test ipc
    ipcMain.handle('test', (event)=> {
        
        const responses = [
            'Hello!',
            'Hi!',
            'Boy howdy!',
            'Top of the morning!',
            'Buenos Dias!'
        ];

        const randomIndex = Math.floor(Math.random()*5);

        return responses[randomIndex];
    });

    // Mac OS kills process when window closed
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })
}

function setMenu (win) {
    win.setMenu(null);
}

// ====== MAIN ======

main();

