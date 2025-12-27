import Device from './Device';

interface TranscriptionConfig {
  device: Device;
  model: string;
  languageISO: string;
  beamSize: number;
}

export default TranscriptionConfig;
