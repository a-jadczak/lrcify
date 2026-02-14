import { FilesContext } from '@renderer/contexts/FilesContext';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';
import { WSContext } from '@renderer/contexts/WebSocketProvider';
import { useContext, useEffect, useState } from 'react';
import AudioFile from 'src/types/AudioFile';
import OutputConfig from 'src/types/OutputConfig';
import TranscriptionConfig from 'src/types/TranscriptionConfig';

interface TrackInfo {
  track: string;
  totalLength: number;
}

const useTranscribe = () => {
  const { send } = useContext(WSContext);

  const { outputConfig, transcriptionConfig } = useContext(FullTranscriptionConfigContext)!;
  const { files } = useContext(FilesContext)!;

  const [currentTrackInfo, setCurrentTrackInfo] = useState<TrackInfo>();
  const [elapsedTime, setElapsedTime] = useState<string>();
  const [lyrics, setLyrics] = useState<string[]>();

  const [tracks, setTracks] = useState<string[]>([]);
  const [tracksTranscribed, setTracksTranscribed] = useState<number>(0);

  const transcribe = (
    files: AudioFile[],
    outputConfig: OutputConfig,
    transcriptionConfig: TranscriptionConfig
  ) => {
    send({
      type: 'transcribe',
      files: files,
      outputConfig: outputConfig,
      transcriptionConfig: transcriptionConfig
    });

    const tracks = files.map((file) => `${file.name}.${file.type}`);
    console.log(tracks);
    setTracks(tracks);

    const off = window.ws.onMessage((data: string) => {
      const msg = JSON.parse(data);

      switch (msg.status) {
        case 'starting-translating':
          const { track, totalLength } = msg;
          setCurrentTrackInfo({ track, totalLength });
          setTracksTranscribed((prev) => prev + 1);
          break;
        case 'translating':
          const { lyrics, elapsedTime } = msg;
          setElapsedTime(elapsedTime);
          console.log('lyrics: ' + lyrics);
          setLyrics((prev) => [...(prev || []), lyrics]);
          break;
        case 'translated':
          setLyrics([]);
          break;
        case 'completed':
          off();
          break;
      }
    });

    return off;
  };

  useEffect(() => {
    // TODO: Remove '!' later
    transcribe(files, outputConfig!, transcriptionConfig!);

    console.log('...');
  }, []);

  return {
    currentTrackInfo,
    elapsedTime,
    lyrics,
    tracks,
    tracksTranscribed
  };
};

export default useTranscribe;
