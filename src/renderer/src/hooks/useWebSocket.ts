export const useWebSocket = () => {
  const send = (message: any) => {
    try {
      window.ws.send(JSON.stringify(message));
    } catch (err) {
      console.error('Something went wrong', err);
    }
  };

  return { send };
};
