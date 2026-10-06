import { ipcRenderer } from 'electron';
import type Language from '@/types/Language';
import { IPC_CHANNELS } from '@/ipc/ipc';

export const getLanguages = (): Promise<Language[]> =>
  ipcRenderer.invoke(IPC_CHANNELS.getLanguages);

export const getIsCudaAvailable = (): Promise<boolean> =>
  ipcRenderer.invoke(IPC_CHANNELS.getIsCudaAvailable);
