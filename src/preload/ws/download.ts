import { ipcRenderer } from 'electron';

type Listener = (data: string) => void;
const listeners = new Set<Listener>();

ipcRenderer.on('ws-message', (_, data: string) => {
  listeners.forEach((cb) => cb(data));
});

const ws = {
  connect: (url: string) => ipcRenderer.invoke('ws-connect', url),
  send: (msg: string) => ipcRenderer.invoke('ws-send', msg),
  close: () => ipcRenderer.invoke('ws-close'),

  onMessage: (cb: Listener) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }
};

export default ws;
