import { BrowserWindow, ipcMain } from 'electron';
import WebSocket from 'ws';

export const registerDownloadWS = (mainWindow: BrowserWindow) => {
  let ws: WebSocket | null = null;

  ipcMain.handle('ws-connect', async (_event, url: string) => {
    if (ws) {
      ws.close();
      ws = null;
    }

    ws = new WebSocket(url);

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
  });

  ipcMain.handle('ws-send', async (_, message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      return true;
    }
    return false;
  });
};
