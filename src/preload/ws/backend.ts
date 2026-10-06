import { ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '@/ipc/ipc';
import type { RendererSocket } from '@/types/ipc';

type Listener = (data: string) => void;
const listeners = new Set<Listener>();

ipcRenderer.on(IPC_CHANNELS.wsMessage, (_event, data: unknown) => {
  if (typeof data !== 'string') return;
  listeners.forEach((listener) => listener(data));
});

const ws: RendererSocket = {
  send: async (command): Promise<void> => {
    await ipcRenderer.invoke(IPC_CHANNELS.wsSend, command);
  },
  onMessage: (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export default ws;
