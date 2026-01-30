import { BrowserWindow, ipcMain } from 'electron';

export const registerDownloadWS = (mainWindow: BrowserWindow, ws: WebSocket) => {
  ws.onopen = () => {
    console.log('MAIN: open');
    mainWindow.webContents.send('ws-status', 'open');
  };

  ws.onerror = (err) => {
    console.log('MAIN: error', err);
    mainWindow.webContents.send('ws-error', String(err));
  };

  ws.onclose = () => {
    console.log('MAIN: closed');
    mainWindow.webContents.send('ws-status', 'closed');
  };

  ws.onmessage = (event) => {
    console.log('MAIN: message', event.data);
    mainWindow.webContents.send('ws-message', event.data);
  };

  ipcMain.handle('ws-send', async (_, message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      return true;
    }
    return false;
  });

  ipcMain.handle('ws-close', async (_, _message: string) => {
    ws.close();
  });
};
