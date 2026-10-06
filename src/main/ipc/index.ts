import { registerFileDialogHandlers } from '@/main/ipc/api/os/fileDialog';
import { registerAPIHandlers } from '@/main/ipc/api/http/transcribeSettings';
import { registerModelAPIHandlers } from '@/main/ipc/api/http/modelSettings';
import { registerBackendSocketHandlers } from '@/main/ipc/api/ws/backend';

export const registerIPCHandlers = (): (() => void) => {
  registerFileDialogHandlers();
  registerAPIHandlers();
  registerModelAPIHandlers();
  return registerBackendSocketHandlers();
};
