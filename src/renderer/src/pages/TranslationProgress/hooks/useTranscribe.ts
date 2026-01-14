import { FilesContext } from '@renderer/contexts/FilesContext';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';
import { useContext, useEffect } from 'react';
import AudioFile from 'src/types/AudioFile';
import OutputConfig from 'src/types/OutputConfig';
import TranscriptionConfig from 'src/types/TranscriptionConfig';

const useTranscribe = () => {
  const { outputConfig, transcriptionConfig } = useContext(FullTranscriptionConfigContext)!;
  const { files } = useContext(FilesContext)!;

  const transcribe = (
    files: AudioFile[],
    outputConfig: OutputConfig,
    transcribtionConfig: TranscriptionConfig
  ) => {
    const data = {
      files,
      outputConfig,
      transcribtionConfig
    };
    window.ws.connect('ws://localhost:8000/ws/transcribe');

    window.ws.onOpen(() => {
      window.ws.send(JSON.stringify(data));
    });

    window.ws.onMessage((msg) => {
      console.log('Received:', msg);
    });

    window.ws.onError((err) => {
      console.error('WS error:', err);
    });
  };

  useEffect(() => {
    // TODO: Remove '!' later
    transcribe(files, outputConfig!, transcriptionConfig!);

    console.log(' ...');
  }, []);

  return {
    transcribe
  };
};

export default useTranscribe;
