import { registerFileDialogHandlers } from './dialog/fileDialog';
import { registerAPIHandlers } from './api/endpoints/transcribeSettings';
import { registerModelAPIHandlers } from './api/endpoints/modelSettings';
import { registerDownloadWS } from './ws/download';
import { BrowserWindow } from 'electron';

export const registerIPCHandlers = (mainWindow: BrowserWindow, ws: WebSocket) => {
  registerFileDialogHandlers();
  registerAPIHandlers();
  registerModelAPIHandlers();
  registerDownloadWS(mainWindow, ws);
};
