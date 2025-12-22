import { ipcMain } from 'electron';
import { api } from '../client';

export const registerAPIHandlers = () => {
  ipcMain.handle('get-languages', async () => {
    const res = await api.get('/transcription/supported-languages');
    return res.data;
  });

  ipcMain.handle('get-is-cuda-available', async () => {
    const res = await api.get('/cuda');
    return Boolean(res.data);
  });

  // ipcMain.handle('get-transcribe-settings', async () => {
  //   const res = await api.get('/cuda');
  //   return res.data;
  // });
};
