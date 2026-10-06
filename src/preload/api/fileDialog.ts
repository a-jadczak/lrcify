import { ipcRenderer, webUtils } from 'electron';
import { IPC_CHANNELS } from '@/ipc/ipc';
import type { PickDirectoryResult, PickFilesResult } from '@/types/ipc';

export const pickFiles = (): Promise<PickFilesResult> => ipcRenderer.invoke(IPC_CHANNELS.pickFiles);

export const pickDirectory = (): Promise<PickDirectoryResult> =>
  ipcRenderer.invoke(IPC_CHANNELS.pickDirectory);

export const getPathForFile = (file: File): string => webUtils.getPathForFile(file);
