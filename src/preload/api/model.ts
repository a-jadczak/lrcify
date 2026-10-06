import { ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../../ipc/ipc';
import type { ModelInfo } from '../../types/ipc';

export const getModels = (): Promise<ModelInfo[]> => ipcRenderer.invoke(IPC_CHANNELS.getModels);

export const getModelWeight = (modelName: string): Promise<number> =>
  ipcRenderer.invoke(IPC_CHANNELS.getModelWeight, modelName);

export const getIsModelInstalled = (modelName: string): Promise<boolean> =>
  ipcRenderer.invoke(IPC_CHANNELS.getIsModelInstalled, modelName);
