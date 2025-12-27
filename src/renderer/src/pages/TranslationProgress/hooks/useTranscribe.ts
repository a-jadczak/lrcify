const useTranscribe = () => {
  const transcribe = () => {
    const data = {};
    window.ws.connect(`ws://localhost:8000/ws/transcribe`);

    window.ws.send(JSON.stringify(data));
  };

  return {
    transcribe
  };
};

export default useTranscribe;
