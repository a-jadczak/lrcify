import type { WebSocketCommand } from 'src/types/ipc';

export const sendWebSocketMessage = async (command: WebSocketCommand): Promise<void> => {
  await window.ws.send(command);
};
