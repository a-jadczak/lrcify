import type { RendererApi, RendererSocket } from '@/types/ipc';

declare global {
  interface Window {
    api: RendererApi;
    ws: RendererSocket;
  }
}
