import { registerFileDialogHandlers } from './api/os/fileDialog';
import { registerAPIHandlers } from './api/http/transcribeSettings';
import { registerModelAPIHandlers } from './api/http/modelSettings';
import { registerBackendSocketHandlers } from './api/ws/backend';

export const registerIPCHandlers = (): (() => void) => {
  registerFileDialogHandlers();
  registerAPIHandlers();
  registerModelAPIHandlers();
  return registerBackendSocketHandlers();
};
