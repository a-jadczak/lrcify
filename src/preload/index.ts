import { contextBridge } from 'electron';
import * as FilesAPI from '@/preload/api/fileDialog';
import * as TranscribeSettingsAPI from '@/preload/api/transcribeSettings';
import * as ModelAPI from '@/preload/api/model';
import ws from '@/preload/ws/backend';
import type { RendererApi } from '@/types/ipc';

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
