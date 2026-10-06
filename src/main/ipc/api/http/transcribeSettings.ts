import { ipcMain } from 'electron';
import { api } from '../client';
import { IPC_CHANNELS } from '../../../../ipc/ipc';
import type Language from '../../../../types/Language';

export const registerAPIHandlers = (): void => {
  ipcMain.handle(IPC_CHANNELS.getLanguages, async (): Promise<Language[]> => {
    const res = await api.get<Language[]>('/transcription/supported-languages');
    return res.data;
  });

  ipcMain.handle(IPC_CHANNELS.getIsCudaAvailable, async (): Promise<boolean> => {
    const res = await api.get<boolean>('/cuda');
    return res.data;
  });
};
