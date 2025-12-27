import { ipcRenderer } from 'electron';
import Language from '../../types/Language';
import TranscriptionConfig from '../../types/TranscriptionConfig';

export const getLanguages = (): Promise<Language[]> => ipcRenderer.invoke('get-languages');
export const getTranscribeSettings = (): Promise<TranscriptionConfig> =>
  ipcRenderer.invoke('get-transcribe-settings');
export const getIsCudaAvailable = (): Promise<boolean> =>
  ipcRenderer.invoke('get-is-cuda-available');
