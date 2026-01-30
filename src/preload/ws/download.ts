import { ipcRenderer } from 'electron';

const ws = {
  connect: (url: string) => ipcRenderer.invoke('ws-connect', url),
  send: (msg: string) => ipcRenderer.invoke('ws-send', msg),
  close: () => ipcRenderer.invoke('ws-close'),

  onMessage: (cb: (data: string) => void) => {
    ipcRenderer.on('ws-message', (_, data) => {
      console.log(data);
      cb(data);
    });
  }
};

export default ws;
