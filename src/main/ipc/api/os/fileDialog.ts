import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';
import { IPC_CHANNELS } from '../../../../ipc/ipc';
import type { PickDirectoryResult, PickFilesResult } from '../../../../types/ipc';
import type AudioFile from '../../../../types/AudioFile';

export const registerFileDialogHandlers = (): void => {
  ipcMain.handle(IPC_CHANNELS.pickFiles, async (event): Promise<PickFilesResult> => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return { canceled: true, files: [] };

    const result = await dialog.showOpenDialog(window, {
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Audio Files', extensions: ['mp3', 'wav'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (result.canceled) return { canceled: true, files: [] };

    const files: AudioFile[] = result.filePaths.map((filePath) => ({
      id: 'file-' + uniqid(),
      name: path.basename(filePath),
      size: fs.statSync(filePath).size,
      type: path.extname(filePath).slice(1),
      path: filePath
    }));

    return { canceled: false, files };
  });

  ipcMain.handle(IPC_CHANNELS.pickDirectory, async (event): Promise<PickDirectoryResult> => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return { canceled: true, filePaths: [] };

    return dialog.showOpenDialog(window, {
      properties: ['openDirectory']
    });
  });
};
