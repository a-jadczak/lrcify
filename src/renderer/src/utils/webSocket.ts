export const sendWebSocketMessage = (message: unknown): void => {
  try {
    window.ws.send(JSON.stringify(message));
  } catch (error) {
    console.error('Something went wrong', error);
  }
};
