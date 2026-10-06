import { ipcMain } from 'electron';
import { api } from '../client';
import { IPC_CHANNELS } from '../../../../ipc/ipc';
import type { ModelInfo } from '../../../../types/ipc';

export const registerModelAPIHandlers = (): void => {
  ipcMain.handle(IPC_CHANNELS.getModels, async (): Promise<ModelInfo[]> => {
    const res = await api.get<ModelInfo[]>('/models');
    return res.data;
  });

  ipcMain.handle(
    IPC_CHANNELS.getModelWeight,
    async (_event, modelName: string): Promise<number> => {
      const res = await api.get<number>('/models/' + encodeURIComponent(modelName) + '/weight');
      return res.data;
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.getIsModelInstalled,
    async (_event, modelName: string): Promise<boolean> => {
      const res = await api.get<boolean>(
        '/models/' + encodeURIComponent(modelName) + '/is-installed'
      );
      return res.data;
    }
  );
};
