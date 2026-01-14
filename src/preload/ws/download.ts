import { ipcRenderer } from 'electron';

const ws = {
  connect: (url: string) => ipcRenderer.invoke('ws-connect', url),
  send: (msg: string) => ipcRenderer.invoke('ws-send', msg),

  onMessage: (cb: (data: string) => void) => {
    console.log(`PRELOAD!`);
    ipcRenderer.on('ws-message', (_, data) => {
      console.log(data);
      cb(data);
    });
    console.log(`PRELOAD! after`);
  },

  onOpen: (cb: () => void) => {
    ipcRenderer.on('ws-status', (_, status) => {
      if (status === 'open') cb();
    });
  },

  onStatus: (cb: (status: string) => void) =>
    ipcRenderer.on('ws-status', (_, status) => cb(status)),

  onError: (cb: (err: string) => void) => ipcRenderer.on('ws-error', (_, err) => cb(err))
};

export default ws;
