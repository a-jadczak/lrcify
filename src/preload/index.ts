import { contextBridge } from 'electron';
import * as FilesAPI from './api/fileDialog';
import * as TranscribeSettingsAPI from './api/transcribeSettings';
import * as ModelAPI from './api/model';
import ws from './ws/backend';
import type { RendererApi } from '../types/ipc';

export const api: RendererApi = {
  ...FilesAPI,
  ...TranscribeSettingsAPI,
  ...ModelAPI
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api);
  contextBridge.exposeInMainWorld('ws', ws);
} else {
  window.api = api;
  window.ws = ws;
}
