import { ipcRenderer, webUtils } from 'electron';
import AudioFile from '../../types/AudioFile';

interface OpenDialogPathResult {
  canceled: boolean;
  filePaths: string[];
}

interface OpenDialogResult {
  canceled: boolean;
  files: AudioFile[];
}

export const pickFiles = (): Promise<OpenDialogResult> =>
  ipcRenderer.invoke('fileDialog:pickFiles');
export const pickDirectory = (): Promise<OpenDialogPathResult> =>
  ipcRenderer.invoke('fileDialog:pickDirectory');
export const getPathForFile = (file: File): string => webUtils.getPathForFile(file);
