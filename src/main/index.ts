import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import './ipc/api/endpoints/transcribeSettings';
import { registerIPCHandlers } from './ipc';
import { createMainWindow } from './windows/mainWindow';

let ws: WebSocket = new WebSocket(`ws://localhost:8000/ws`);

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  const window = createMainWindow();
  registerIPCHandlers(window, ws);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
