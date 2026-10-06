import { BrowserWindow, ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../../ipc/ipc';
import type { WebSocketCommand } from '../../../../types/ipc';
import {
  BACKEND_WS_URL,
  INITIAL_RECONNECT_DELAY_MS,
  MAX_RECONNECT_DELAY_MS
} from '../../config/backend';

export const registerBackendSocketHandlers = (): (() => void) => {
  let socket: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let reconnectDelay = INITIAL_RECONNECT_DELAY_MS;
  let stopped = false;

  const connect = (): void => {
    socket = new WebSocket(BACKEND_WS_URL);

    socket.addEventListener('open', () => {
      reconnectDelay = INITIAL_RECONNECT_DELAY_MS;
    });

    socket.addEventListener('message', (event) => {
      if (typeof event.data !== 'string') return;
      for (const window of BrowserWindow.getAllWindows()) {
        if (!window.isDestroyed() && !window.webContents.isDestroyed()) {
          window.webContents.send(IPC_CHANNELS.wsMessage, event.data);
        }
      }
    });

    socket.addEventListener('error', (error) => {
      console.error('Backend WebSocket error:', error);
    });

    socket.addEventListener('close', () => {
      socket = null;
      if (stopped) return;

      reconnectTimer = setTimeout(connect, reconnectDelay);
      reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY_MS);
    });
  };

  ipcMain.handle(IPC_CHANNELS.wsSend, (_event, command: WebSocketCommand): void => {
    if (!socket) {
      console.error('Backend WebSocket is not connected');
      return;
    }

    socket.send(JSON.stringify(command));
  });

  connect();

  return () => {
    stopped = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    socket?.close();
    socket = null;
    ipcMain.removeHandler(IPC_CHANNELS.wsSend);
  };
};
